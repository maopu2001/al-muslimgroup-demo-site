"use client";
import { createUser, updateUser } from "@/actions/users";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "./columns";
import { toast } from "sonner";
import { useState } from "react";
import { email } from "better-auth";

export const UserDialog = ({
  type,
  userId,
  user,
}: {
  type: "Edit" | "Add";
  userId?: string;
  user?: User;
}) => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(user?.type || "user");

  const handleAdding = async (e: FormData) => {
    try {
      e.set("type", userType);
      await createUser(e);
      setOpen(false);
      toast.success("User created successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (e: FormData, userId: string) => {
    try {
      e.set("type", userType);
      await updateUser(e, userId);
      setOpen(false);
      toast.success("User updated successfully");
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
            Add User
          </Button>
        )) || (
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={Edit} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {type} User
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-2"
          action={(e) => (!userId ? handleAdding(e) : handleUpdate(e, userId))}
        >
          <Field>
            <FieldLabel htmlFor="user-name">Name</FieldLabel>
            <Input
              defaultValue={user?.name}
              name="name"
              id="user-name"
              type="text"
              placeholder="User's Name"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="user-email">Email</FieldLabel>
            <Input
              disabled={type === "Edit"}
              defaultValue={user?.email}
              name="email"
              id="user-email"
              type="email"
              placeholder="user@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="user-type">User Type</FieldLabel>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger id="user-type" className="text-xs">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {type === "Add" && (
            <Field>
              <FieldLabel htmlFor="user-password">Password</FieldLabel>
              <Input
                name="password"
                id="user-password"
                type="password"
                placeholder="Password"
                required
                minLength={8}
              />
            </Field>
          )}

          <FormButton className="mt-4" title={`${type} User`} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
