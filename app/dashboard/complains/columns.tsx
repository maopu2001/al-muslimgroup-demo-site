"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ActionButtons from "./action-buttons";

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  complaintBy: {
    id: string;
    name: string;
    email: string;
  };
};

export const columns: ColumnDef<Complaint>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-md truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "complaintBy",
    header: "Submitted By",
    cell: ({ row }) => {
      const user = row.getValue("complaintBy") as Complaint["complaintBy"];
      return <div>{user.name}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "resolved"
              ? "default"
              : status === "in-progress"
              ? "secondary"
              : "outline"
          }
        >
          {status.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{new Date(date).toLocaleDateString()}</div>;
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "id",
    cell: ({ row }) => {
      const complaintId = row.getValue("id") as string;
      return (
        <ActionButtons complaintId={complaintId} complaint={row.original} />
      );
    },
  },
];
