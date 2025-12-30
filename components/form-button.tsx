"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export default function FormButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className={`w-full ${className}`}>
      {(pending && <Spinner />) || title}
    </Button>
  );
}
