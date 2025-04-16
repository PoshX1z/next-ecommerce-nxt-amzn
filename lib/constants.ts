/* Constants file containing fixed variable that use across the project. */
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "PoshAmazon";
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Shopping website for everyone";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Website for shopping made by Next.ts + mongodb + tailwindcss";
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9);
export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
);
export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`;

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: "PayPal",
    commission: 0,
    isDefault: true,
  },
  {
    name: "Stripe",
    commission: 0,
    isDefault: true,
  },
  {
    name: "Cash On Delivery",
    commission: 0,
    isDefault: true,
  },
];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const AVAILABLE_DELIVERY_DATES = [
  {
    name: "Tomorrow",
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: "Next 3 Days",
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: "Next 5 Days",
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
];

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "xdante1357@gmail.com";
export const SENDER_NAME = process.env.SENDER_NAME || APP_NAME;
