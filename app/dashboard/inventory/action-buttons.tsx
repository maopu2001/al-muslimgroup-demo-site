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
import { StockDialog } from "./stock-dialog";
import { TransactionHistory } from "./transaction-history";
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
        toast.success("Item deleted successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDecrement = async () => {
    try {
      await decreaseItemCount(itemId);
      toast.success("Stock decreased by 1");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleIncrement = async () => {
    try {
      await increaseItemCount(itemId);
      toast.success("Stock increased by 1");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-x-1 flex items-center justify-center flex-wrap gap-1">
      <div className="flex gap-1">
        <StockDialog type="ADD" itemId={itemId} itemTitle={item.title} />
        <StockDialog type="DISTRIBUTE" itemId={itemId} itemTitle={item.title} />
      </div>
      {/* <div className="flex gap-1">
        <Button variant="outline" size="sm" onClick={handleDecrement}>
          <HugeiconsIcon icon={Minus} />
        </Button>
        <Button size="sm" onClick={handleIncrement}>
          <HugeiconsIcon icon={Plus} />
        </Button>
      </div> */}
      <div className="flex gap-1">
        <TransactionHistory itemId={itemId} itemTitle={item.title} />
        <ItemDialog itemId={itemId} item={item} type="Edit" />
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <HugeiconsIcon icon={Trash} />
        </Button>
      </div>
    </div>
  );
}
