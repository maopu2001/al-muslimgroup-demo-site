"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "./action-buttons";

export type User = {
  id: string;
  name: string;
  email: string;
  type: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "admin" ? "default" : "secondary"}>
          {type.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return new Date(date).toLocaleDateString("IN");
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return new Date(date).toLocaleDateString("IN");
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "id",
    cell: ({ row }) => {
      const userId = row.getValue("id") as string;
      return <ActionButtons userId={userId} user={row.original} />;
    },
  },
];
