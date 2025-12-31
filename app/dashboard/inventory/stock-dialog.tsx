"use client";
import { adjustStock, getAllUsers } from "@/actions/items";
import FormButton from "@/components/form-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export const StockDialog = ({
  type,
  itemId,
  itemTitle,
}: {
  type: "ADD" | "DISTRIBUTE";
  itemId: string;
  itemTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const [partyType, setPartyType] = useState<"internal" | "external">(
    "external"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadUsers();
    }
  }, [open]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data as User[]);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const quantity = parseInt(formData.get("quantity") as string, 10);
      const notes = formData.get("notes") as string;

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error("Please enter a valid positive quantity");
      }

      let party: string;
      if (partyType === "internal") {
        const selectedUser = users.find((u) => u.id === selectedUserId);
        if (!selectedUser || !selectedUserId) {
          throw new Error("Please select a user");
        }
        party = selectedUser.name;
      } else {
        party = formData.get("externalParty") as string;
        if (!party || party.trim() === "") {
          throw new Error(
            `Please enter the ${type === "ADD" ? "provider" : "receiver"} name`
          );
        }
      }

      // For DISTRIBUTE, quantity should be negative
      const adjustedQuantity = type === "DISTRIBUTE" ? -quantity : quantity;
      const actionType = type === "DISTRIBUTE" ? "DISTRIBUTION" : "RESTOCK";

      await adjustStock(itemId, adjustedQuantity, actionType, party, notes);

      toast.success(
        `Successfully ${
          type === "ADD" ? "added" : "distributed"
        } ${quantity} units`
      );
      setOpen(false);
      setPartyType("external"); // Reset to default
      setSelectedUserId(""); // Reset selected user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          variant={type === "ADD" ? "default" : "outline"}
          size="sm"
          onClick={() => setOpen(true)}
        >
          <HugeiconsIcon icon={type === "ADD" ? Plus : Minus} />
          {type === "ADD" ? "Add Stock" : "Distribute"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {type === "ADD" ? "Add Stock" : "Distribute Stock"}: {itemTitle}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" action={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
            <Input
              name="quantity"
              id="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              required
            />
          </Field>

          <div className="space-y-3">
            <FieldLabel>
              {type === "ADD" ? "Provider" : "Receiver"} Type
            </FieldLabel>
            <RadioGroup
              value={partyType}
              onValueChange={(value) =>
                setPartyType(value as "internal" | "external")
              }
              className="flex gap-4 py-2"
            >
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal" className="cursor-pointer">
                  Internal User
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external" className="cursor-pointer">
                  External Party
                </Label>
              </div>
            </RadioGroup>
          </div>

          {partyType === "internal" ? (
            <Field>
              <FieldLabel htmlFor="internalParty">
                Select {type === "ADD" ? "Provider" : "Receiver"}
              </FieldLabel>
              <Combobox
                options={users.map((user) => ({
                  value: user.id,
                  label: `${user.name} (${user.email})`,
                }))}
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                placeholder={loading ? "Loading users..." : "Select a user..."}
                searchPlaceholder="Search by name or email..."
                emptyMessage="No users found."
                disabled={loading}
              />
              {selectedUserId && (
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {users.find((u) => u.id === selectedUserId)?.name}
                </p>
              )}
            </Field>
          ) : (
            <Field>
              <FieldLabel htmlFor="externalParty">
                {type === "ADD" ? "Provider Name" : "Receiver Name"}
              </FieldLabel>
              <Input
                name="externalParty"
                id="externalParty"
                type="text"
                placeholder={
                  type === "ADD"
                    ? "e.g., Vendor X, Supplier ABC"
                    : "e.g., Student John Doe, Department XYZ"
                }
                required
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="notes">Notes (Optional)</FieldLabel>
            <Input
              name="notes"
              id="notes"
              type="text"
              placeholder="Additional notes..."
            />
          </Field>

          <FormButton
            className="mt-4 w-full"
            title={type === "ADD" ? "Add Stock" : "Distribute Stock"}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
