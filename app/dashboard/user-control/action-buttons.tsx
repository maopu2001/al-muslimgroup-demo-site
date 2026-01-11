"use client";
import { deleteUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserDialog } from "./user-dialog";
import { User } from "./columns";
import { toast } from "sonner";

export default function ActionButtons({
  userId,
  user,
}: {
  userId: string;
  user: User;
}) {
  const handleDelete = async () => {
    try {
      if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
        await deleteUser(userId);
        toast.success("User deleted successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-x-1 flex items-center justify-center flex-wrap gap-1">
      <UserDialog userId={userId} user={user} type="Edit" />
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <HugeiconsIcon icon={Trash} />
      </Button>
    </div>
  );
}
