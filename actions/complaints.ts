"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/**
 * Get all complaints (admin only)
 */
export const getAllComplaints = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");
    if (user.type !== "admin")
      throw new Error("Unauthorized: Admin access required");

    return await prisma.complaint.findMany({
      include: {
        complaintBy: {
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
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

/**
 * Get complaints for the logged-in user
 */
export const getUserComplaints = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const complaints = await prisma.complaint.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath("/dashboard/create-complain");
    return complaints;
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    throw error;
  }
};

/**
 * Create a new complaint
 */
export const createComplaint = async (formData: FormData) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    await prisma.complaint.create({
      data: {
        title,
        description,
        userId: session.user.id,
        status: "pending",
      },
    });

    revalidatePath("/dashboard/create-complain");
  } catch (error) {
    console.error("Error creating complaint:", error);
    throw error;
  }
};

/**
 * Update complaint status (admin only)
 */
export const updateComplaintStatus = async (
  complaintId: string,
  status: string
) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");
    if (user.type !== "admin")
      throw new Error("Unauthorized: Admin access required");

    await prisma.complaint.update({
      where: { id: complaintId },
      data: { status },
    });

    revalidatePath("/dashboard/complains");
  } catch (error) {
    console.error("Error updating complaint status:", error);
    throw error;
  }
};

/**
 * Delete a complaint (admin only)
 */
export const deleteComplaint = async (complaintId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");
    if (user.type !== "admin")
      throw new Error("Unauthorized: Admin access required");

    await prisma.complaint.delete({
      where: { id: complaintId },
    });

    revalidatePath("/dashboard/complains");
  } catch (error) {
    console.error("Error deleting complaint:", error);
    throw error;
  }
};
