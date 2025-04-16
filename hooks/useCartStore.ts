/* A hook that manage the state of shopping cart */
import { create } from "zustand"; // Function to create a zustand store.
import { persist } from "zustand/middleware"; // This is a middleware that allows you to store the state in local storage or other storages.

import { Cart, OrderItem, ShippingAddress } from "@/types";
import { calcDeliveryDateAndPrice } from "@/lib/actions/order.actions";

// Initial state and value of the cart.
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
};

// Defines type for zustand store.
interface CartState {
  cart: Cart;
  addItem: (item: OrderItem, quantity: number) => Promise<string>;

  updateItem: (item: OrderItem, quantity: number) => Promise<void>;
  removeItem: (item: OrderItem) => void;

  clearCart: () => void;
  setShippingAddress: (shippingAddress: ShippingAddress) => Promise<void>;
  setPaymentMethod: (paymentMethod: string) => void;
  setDeliveryDateIndex: (index: number) => Promise<void>;
}

// Create a zustand store and store the cart state in local storage, (set: used to update the state of the store, get: used to get the state of the store).
const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      // Function to add an item to the cart.
      addItem: async (item: OrderItem, quantity: number) => {
        const { items, shippingAddress } = get().cart;
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        );

        // Check if the item is in stock.
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error("Not enough items in stock");
          }
        } else {
          if (item.countInStock < item.quantity) {
            throw new Error("Not enough items in stock");
          }
        }
        // Increases the quantity of an existing item in cart.
        const updatedCartItems = existItem
          ? items.map((x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x
            )
          : [...items, { ...item, quantity }];

        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        });

        // Returns the client id of the added/updated item.
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        return updatedCartItems.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )?.clientId!;
      },

      // Function to update the quantity of an item in the cart.
      updateItem: async (item: OrderItem, quantity: number) => {
        const { items, shippingAddress } = get().cart;
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        );
        if (!exist) return;
        const updatedCartItems = items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity: quantity }
            : x
        );

        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        });
      },

      // Function to remove an item from the cart.
      removeItem: async (item: OrderItem) => {
        const { items, shippingAddress } = get().cart;
        const updatedCartItems = items.filter(
          (x) =>
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size
        );

        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        });
      },

      // Function to set the shipping address in the cart.
      init: () => set({ cart: initialState }), // Reset cart state to the initial state.
      setShippingAddress: async (shippingAddress: ShippingAddress) => {
        const { items } = get().cart;

        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
            })),
          },
        });
      },

      // Function to set the selected payment method in the cart.
      setPaymentMethod: (paymentMethod: string) => {
        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            paymentMethod,
          },
        });
      },

      // Function to set the delivery date index in the cart.
      setDeliveryDateIndex: async (index: number) => {
        const { items, shippingAddress } = get().cart;

        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
              deliveryDateIndex: index,
            })),
          },
        });
      },

      // Function to clear the cart.
      clearCart: () => {
        // Updates the cart state.
        set({
          cart: {
            ...get().cart,
            items: [],
          },
        });
      },
    }),
    // A key that is used to store zustand store in local storage.
    {
      name: "cart-store",
    }
  )
);
export default useCartStore;
