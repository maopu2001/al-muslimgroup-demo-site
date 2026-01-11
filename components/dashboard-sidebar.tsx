/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { SignOut, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fileToBase64 } from "@/lib/fileToBase64";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const adminLinkItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/user-control", label: "User Control" },
  { href: "/dashboard/inventory", label: "Inventory" },
  { href: "/dashboard/complains", label: "Complains" },
  { href: "/dashboard/create-complain", label: "Create Complain" },
];

const userLinkItems = [
  { href: "/dashboard/create-complain", label: "Create Complain" },
];

export default function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: { onSuccess: () => router.push("/signin") },
    });
  };

  useEffect(() => {
    setFile(session?.user?.image || null);
  }, [session?.user?.image]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) return;
    const selectedFile = e.target.files?.[0];
    try {
      const base64 = await fileToBase64(selectedFile);
      const result = await authClient.updateUser({
        image: base64 as string,
      });
      console.log(result);
      if (result.error)
        throw new Error(result.error.message || "Failed to update image");
      else toast.success("Profile image updated successfully");
      setFile(base64 as string);
    } catch (err: any) {
      toast.error(err.message || "Failed to update image");
    }
  };

  return (
    <nav className="fixed bg-accent-foreground border-r w-80 h-full pt-14 px-2 pb-12">
      {/* Profile Top Section */}
      <div className="flex flex-col justify-center items-center h-35 border rounded-lg">
        {(isPending && <Spinner className="size-10" />) || (
          <>
            <div className="mx-auto flex items-center justify-center relative size-15 rounded-full overflow-hidden group">
              {(file === null && (
                <div className="relative size-15">
                  <HugeiconsIcon
                    className="absolute inset-0 size-full p-2 border-2 border-primary rounded-full text-primary"
                    icon={UserIcon}
                  />
                </div>
              )) || (
                <Image
                  className="size-15 shrink-0 grow-0 object-cover bg-black"
                  src={file as string}
                  alt="Uploaded Image"
                  width={50}
                  height={50}
                />
              )}
              <div className="absolute z-10 top-2/3 left-0 right-0 flex h-1/2 justify-center translate-y-full group-hover:translate-y-0 transition-all bg-background/50">
                <span className="text-xs text-center">Select</span>
                <Input
                  className="select-none opacity-0 absolute inset-0 w-full h-full"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <span className="text-muted-foreground text-sm mt-1 capitalize">
              {(session?.user as any)?.type}
            </span>
            <div className="flex gap-2 w-full  items-center justify-around border-muted-foreground px-2">
              <div className="font-semibold">Hi, {session?.user?.name}!</div>
              <Button
                onClick={handleSignOut}
                className="size-8 p-1.5 rounded-full"
              >
                <HugeiconsIcon className="size-full" icon={SignOut} />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Option */}
      <div className="flex flex-col gap-2 mt-2">
        {(session?.user as any)?.type === "user"
          ? userLinkItems.map((item) => (
              <Link
                className="border rounded-lg p-2 font-semibold hover:bg-primary/30"
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))
          : adminLinkItems.map((item) => (
              <Link
                className="border rounded-lg p-2 font-semibold hover:bg-primary/30"
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
      </div>
    </nav>
  );
}
