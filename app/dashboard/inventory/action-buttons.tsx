"use client";
import {
  decreaseItemCount,
  deleteItem,
  increaseItemCount,
} from "@/actions/items";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ItemDialog } from "./item-dialog";
import { Item } from "./columns";
import { toast } from "sonner";

export default function ActionButtons({
  itemId,
  item,
}: {
  itemId: string;
  item: Item;
}) {
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this item?")) {
        await deleteItem(itemId);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDecrement = async () => {
    try {
      await decreaseItemCount(itemId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleIncrement = async () => {
    try {
      await increaseItemCount(itemId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-x-2 flex items-center justify-around">
      <div>
        <Button variant="destructive" onClick={handleDecrement}>
          <HugeiconsIcon icon={Minus} />
        </Button>
        <Button onClick={handleIncrement}>
          <HugeiconsIcon icon={Plus} />
        </Button>
      </div>
      <div>
        <ItemDialog itemId={itemId} item={item} type="Edit" />
        <Button variant="destructive" onClick={handleDelete}>
          <HugeiconsIcon icon={Trash} />
        </Button>
      </div>
    </div>
  );
}
