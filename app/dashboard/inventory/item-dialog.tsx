"use client";
import { addItem, updateItem } from "@/actions/items";
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
import { Edit, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Item } from "./columns";
import { toast } from "sonner";
import { useState } from "react";

export const ItemDialog = ({
  type,
  itemId,
  item,
}: {
  type: "Edit" | "Add";
  itemId?: string;
  item?: Item;
}) => {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState(item?.slug || "");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = generateSlug(e.target.value);
    setSlug(newSlug);
  };

  const handleAdding = async (e: FormData) => {
    try {
      await addItem(e);
      setOpen(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (e: FormData, itemId: string) => {
    try {
      await updateItem(e, itemId);
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {(type === "Add" && (
          <Button>
            <HugeiconsIcon icon={Plus} />
            Add Item
          </Button>
        )) || (
          <Button variant="outline">
            <HugeiconsIcon icon={Edit} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {type} Item
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-2"
          action={(e) => (!itemId ? handleAdding(e) : handleUpdate(e, itemId))}
        >
          <Field>
            <FieldLabel htmlFor="item-title">Title</FieldLabel>
            <Input
              defaultValue={item?.title}
              name="title"
              id="item-title"
              type="text"
              placeholder="Item's Title"
              onChange={handleTitleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="item-slug">Slug</FieldLabel>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              name="slug"
              id="item-slug"
              type="text"
              placeholder="Item's Slug"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="item-description">Description</FieldLabel>
            <Input
              defaultValue={item?.description || undefined}
              name="description"
              id="item-description"
              type="text"
              placeholder="Item's Description"
            />
          </Field>
          {type === "Add" && (
            <Field>
              <FieldLabel htmlFor="item-quantity">
                Initial Quantity (Optional)
              </FieldLabel>
              <Input
                defaultValue="0"
                name="count"
                id="item-quantity"
                type="number"
                min="0"
                placeholder="Starting stock quantity"
              />
            </Field>
          )}

          <FormButton className="mt-4" title={`${type} Item`} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
