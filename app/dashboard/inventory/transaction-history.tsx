"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useEffect } from "react";
import { getItemTransactions } from "@/actions/items";

type Transaction = {
  id: string;
  actionType: string;
  quantityChanged: number;
  snapshotCount: number;
  sourceOrDest: string | null;
  notes: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export const TransactionHistory = ({
  itemId,
  itemTitle,
}: {
  itemId: string;
  itemTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getItemTransactions(itemId);
      setTransactions(data as Transaction[]);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const getActionBadgeColor = (actionType: string) => {
    switch (actionType) {
      case "RESTOCK":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "DISTRIBUTION":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "ADJUSTMENT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "INITIAL_CREATE":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <HugeiconsIcon icon={History} />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Transaction History: {itemTitle}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4 px-2">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionBadgeColor(
                          transaction.actionType
                        )}`}
                      >
                        {transaction.actionType}
                      </span>
                      <span
                        className={`font-semibold ${
                          transaction.quantityChanged > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.quantityChanged > 0 ? "+" : ""}
                        {transaction.quantityChanged}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By: {transaction.user.name}
                    </p>
                    {transaction.sourceOrDest && (
                      <p className="text-sm">
                        <span className="font-medium">
                          {transaction.actionType === "DISTRIBUTION"
                            ? "Receiver"
                            : "Provider"}
                          :
                        </span>{" "}
                        {transaction.sourceOrDest}
                      </p>
                    )}
                    {transaction.notes && (
                      <p className="text-sm text-muted-foreground italic">
                        {transaction.notes}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm space-y-1">
                    <p className="text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </p>
                    <p className="font-medium">
                      Stock: {transaction.snapshotCount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
