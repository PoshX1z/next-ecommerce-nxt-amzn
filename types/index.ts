import {
  CartSchema,
  OrderInputSchema,
  OrderItemSchema,
  ProductInputSchema,
  ReviewInputSchema,
  ShippingAddressSchema,
  UserInputSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from "@/lib/validator";
import { z } from "zod";

//Real usage of product type checking
export type IProductInput = z.infer<typeof ProductInputSchema>;
//All data types for different data provided here.
export type Data = {
  users: IUserInput[];
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
  reviews: {
    title: string;
    rating: number;
    comment: string;
  }[];
};
export type IOrderInput = z.infer<typeof OrderInputSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
// User
export type IUserInput = z.infer<typeof UserInputSchema>;
export type IUserSignIn = z.infer<typeof UserSignInSchema>;
export type IUserSignUp = z.infer<typeof UserSignUpSchema>;

export type IReviewInput = z.infer<typeof ReviewInputSchema>;
export type IReviewDetails = IReviewInput & {
  _id: string;
  createdAt: string;
  user: {
    name: string;
  };
};
