/* A hook that used to manage the browsing history of the user. */
import { create } from "zustand"; // Function to create a zustand store.
import { persist } from "zustand/middleware"; // This is a middleware that allows you to store the state in local storage or other storages.

type BrowsingHistory = {
  products: { id: string; category: string }[];
};
const initialState: BrowsingHistory = {
  products: [],
};

// Create zustand store for browsing history.
export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(() => initialState, {
    name: "browsingHistoryStore",
  })
);

export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore();
  return {
    products,
    // Add product to browsing history.
    addItem: (product: { id: string; category: string }) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) products.splice(index, 1); // Remove duplicate if it exists.
      products.unshift(product); // Add id of product to the start.

      if (products.length > 10) products.pop(); // Remove excess items if length exceeds 10.

      browsingHistoryStore.setState({
        products,
      });
    },
    // Clear product from browsing history.
    clear: () => {
      browsingHistoryStore.setState({
        products: [],
      });
    },
  };
}
