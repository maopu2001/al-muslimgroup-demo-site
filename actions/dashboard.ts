"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

/**
 * Get dashboard summary statistics
 */
export const getDashboardStats = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (!user) throw new Error("User not found");

    // Get total counts
    const [
      totalUsers,
      totalItems,
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      recentTransactions,
      recentComplaints,
      totalInventoryValue,
      lowStockItems,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.item.count(),
      prisma.complaint.count(),
      prisma.complaint.count({ where: { status: "pending" } }),
      prisma.complaint.count({ where: { status: "in-progress" } }),
      prisma.complaint.count({ where: { status: "resolved" } }),
      prisma.inventoryTransaction.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          item: { select: { title: true } },
          user: { select: { name: true } },
        },
      }),
      user.type === "admin"
        ? prisma.complaint.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
              complaintBy: { select: { name: true } },
            },
          })
        : prisma.complaint.findMany({
            take: 5,
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
          }),
      prisma.item.aggregate({
        _sum: { count: true },
      }),
      prisma.item.findMany({
        where: { count: { lt: 10 } },
        take: 5,
        orderBy: { count: "asc" },
      }),
    ]);

    return {
      totalUsers,
      totalItems,
      totalComplaints,
      complaintsByStatus: {
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
      },
      recentTransactions,
      recentComplaints,
      totalInventoryValue: totalInventoryValue._sum.count || 0,
      lowStockItems,
      isAdmin: user.type === "admin",
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};
