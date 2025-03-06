import {
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
} from "@/lib/validator";
import { z } from "zod";

//Real usage of product type checking
export type IProductInput = z.infer<typeof ProductInputSchema>;
//All data types for different data provided here.
export type Data = {
  products: IProductInput[];
  headerMenus: {
    name: string;
    href: string;
  }[];
  carousels: {
    image: string;
    url: string;
    title: string;
    buttonCaption: string;
    isPublished: boolean;
  }[];
};
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
