"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/**
 * Adjust stock with full transaction history
 * @param itemId - The ID of the item
 * @param quantity - Positive for adding, negative for removing
 * @param actionType - RESTOCK, DISTRIBUTION, or ADJUSTMENT
 * @param sourceOrDest - Who provided it (for RESTOCK) or who received it (for DISTRIBUTION)
 * @param notes - Optional additional notes
 */
export const adjustStock = async (
  itemId: string,
  quantity: number,
  actionType: "RESTOCK" | "DISTRIBUTION" | "ADJUSTMENT",
  sourceOrDest?: string,
  notes?: string
) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");

    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Get current item
      const item = await tx.item.findUnique({
        where: { id: itemId },
      });

      if (!item) throw new Error("Item not found");

      const newCount = item.count + quantity;
      if (newCount < 0) throw new Error("Stock cannot be negative");

      // Update item count
      await tx.item.update({
        where: { id: itemId },
        data: {
          count: newCount,
          updatedBy: { connect: { id: session.user.id } },
        },
      });

      // Create transaction record
      await tx.inventoryTransaction.create({
        data: {
          itemId,
          userId: session.user.id,
          actionType,
          quantityChanged: quantity,
          snapshotCount: newCount,
          sourceOrDest,
          notes,
        },
      });
    });

    revalidatePath("/dashboard/inventory");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error adjusting stock");
  }
};

/**
 * Get transaction history for an item
 */
export const getItemTransactions = async (itemId: string) => {
  try {
    return await prisma.inventoryTransaction.findMany({
      where: { itemId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching transactions:", err.message);
    return [];
  }
};

export const addItem = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const count = parseInt(formData.get("count") as string, 10) || 0;

  if (count < 0) throw new Error("Count cannot be negative");

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");

    // Use transaction to create item and initial transaction record
    await prisma.$transaction(async (tx) => {
      const newItem = await tx.item.create({
        data: {
          title,
          slug,
          description,
          count,
          updatedBy: { connect: { id: session.user.id } },
        },
      });

      // Create initial transaction record if count > 0
      if (count > 0) {
        await tx.inventoryTransaction.create({
          data: {
            itemId: newItem.id,
            userId: session.user.id,
            actionType: "INITIAL_CREATE",
            quantityChanged: count,
            snapshotCount: count,
            notes: "Initial item creation",
          },
        });
      }
    });

    revalidatePath("/dashboard/inventory");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error adding item");
  }
};

export const updateItem = async (formData: FormData, itemId: string) => {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

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
        updatedBy: { connect: { id: session.user.id } },
      },
    });

    revalidatePath("/dashboard/inventory");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error updating item");
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
  return adjustStock(itemId, 1, "ADJUSTMENT", undefined, "Quick increment");
};

export const decreaseItemCount = async (itemId: string) => {
  return adjustStock(itemId, -1, "ADJUSTMENT", undefined, "Quick decrement");
};

export const deleteItem = async (itemId: string) => {
  try {
    // Cascading delete will automatically remove associated transactions
    await prisma.item.delete({
      where: { id: itemId },
    });

    revalidatePath("/dashboard/inventory");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || "Error deleting item");
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return [];
  }
};
