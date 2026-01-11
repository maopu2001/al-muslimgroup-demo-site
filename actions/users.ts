"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    throw new Error(err.message || "Error fetching users");
  }
};

/**
 * Create a new user
 */
export const createUser = async (formData: FormData) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      throw new Error("Name, email and password are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new Error("User with this email already exists");

    await auth.api.signUpEmail({
      body: {
        name,
        type,
        email,
        password,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    revalidatePath("/dashboard/user-control");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error creating user");
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (formData: FormData, userId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    if (!name) throw new Error("Name is required");

    // Update user basic info
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        type,
      },
    });

    revalidatePath("/dashboard/user-control");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error updating user");
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (userId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    // Prevent users from deleting themselves
    if (session.user.id === userId)
      throw new Error("You cannot delete your own account");

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/dashboard/user-control");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error deleting user");
  }
};
