"use server";
import { auth, signIn, signOut } from "@/auth";
import { IUserName, IUserSignIn, IUserSignUp } from "@/types";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../db";
import User from "../db/models/user.model";
import bcrypt from "bcryptjs";
import { formatError } from "../utils";
import { UserSignUpSchema } from "../validator";

// Sign in with credentials function.
export const signInWithCredentials = async (user: IUserSignIn) => {
  return await signIn("credentials", { ...user, redirect: false });
};
// Sign out function.
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false });
  redirect(redirectTo.redirect);
};

// Register
export const registerUser = async (userSignUp: IUserSignUp) => {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    });

    await connectToDatabase();
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
};

export const SignInWithGoogle = async () => {
  await signIn("google");
};

// Update user name
export const updateUserName = async (user: IUserName) => {
  try {
    await connectToDatabase();
    const session = await auth();
    const currentUser = await User.findById(session?.user?.id);
    if (!currentUser) throw new Error("User not found");
    currentUser.name = user.name;
    const updatedUser = await currentUser.save();
    return {
      success: true,
      message: "User updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
