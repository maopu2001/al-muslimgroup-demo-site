"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const addItem = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const count = parseInt(formData.get("count") as string, 10);

  if (count < 0) throw new Error("Count cannot be negative");

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");

    await prisma.item.create({
      data: {
        title,
        slug,
        description,
        count,
        updatedBy: { connect: { id: session.user.id } },
      },
    });

    revalidatePath("/dashboard/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error adding item:", err.message);
  }
};

export const updateItem = async (formData: FormData, itemId: string) => {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const count = parseInt(formData.get("count") as string, 10);

  if (count < 0) throw new Error("Count cannot be negative");

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");

    await prisma.item.update({
      where: { id: itemId },
      data: {
        title,
        slug,
        description,
        count,
        updatedBy: { connect: { id: session.user.id } },
      },
    });

    revalidatePath("/dashboard/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error updating item:", err.message);
  }
};

export const getItemById = async (itemId: string) => {
  try {
    return await prisma.item.findUnique({
      where: { id: itemId },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        count: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching item by ID:", err.message);
    return null;
  }
};

export const getAllItems = async () => {
  try {
    return await prisma.item.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        count: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching items:", err.message);
    return [];
  }
};

export const increaseItemCount = async (itemId: string) => {
  try {
    await prisma.item.update({
      where: { id: itemId },
      data: {
        count: {
          increment: 1,
        },
      },
    });
    revalidatePath("/dashboard/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error increasing item count", err.message);
  }
};

export const decreaseItemCount = async (itemId: string) => {
  try {
    await prisma.item.update({
      where: { id: itemId, count: { gt: 0 } },
      data: {
        count: {
          decrement: 1,
        },
      },
    });

    revalidatePath("/dashboard/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error decreasing item count", err.message);
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    await prisma.item.delete({
      where: { id: itemId },
    });

    revalidatePath("/dashboard/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Error deleting item:", err.message);
  }
};
