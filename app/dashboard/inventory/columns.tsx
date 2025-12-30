"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "./action-buttons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  count: number;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "count",
    header: "Quantity",
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "id",
    cell: ({ row }) => {
      const itemId = row.getValue("id") as string;
      return <ActionButtons itemId={itemId} item={row.original} />;
    },
  },
];
