"use client";

import { createComplaint, getUserComplaints } from "@/actions/complaints";
import FormButton from "@/components/form-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { History } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Complaint = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Page() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const loadComplaints = async () => {
    setIsLoading(true);
    try {
      const data = await getUserComplaints();
      setComplaints(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sheetOpen) {
      loadComplaints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetOpen]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createComplaint(formData);
      toast.success("Complaint submitted successfully");
      // Reset form
      const form = document.querySelector("form") as HTMLFormElement;
      form?.reset();
      // Reload complaints if sheet is open
      if (sheetOpen) {
        await loadComplaints();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
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
    <div className="mx-auto py-10 space-y-6 max-w-4xl px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Create Complaint</h1>
          <p className="text-muted-foreground">
            Submit a complaint and track its status
          </p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <HugeiconsIcon icon={History} />
              View History
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Your Complaint History</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4 px-2">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : complaints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  You haven&apos;t submitted any complaints yet.
                </div>
              ) : (
                complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-lg">
                          {complaint.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {complaint.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          complaint.status === "resolved"
                            ? "default"
                            : complaint.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                        className="ml-2"
                      >
                        {complaint.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                      <span>Submitted: {formatDate(complaint.createdAt)}</span>
                      <span>Updated: {formatDate(complaint.updatedAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Complaint Form */}
      <Card className="h-80">
        <CardHeader>
          <CardTitle>Submit New Complaint</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={handleSubmit}>
            <Field>
              <FieldLabel htmlFor="complaint-title">Title</FieldLabel>
              <Input
                name="title"
                id="complaint-title"
                type="text"
                placeholder="Brief description of your complaint"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="complaint-description">
                Description
              </FieldLabel>
              <Textarea
                className="h-30"
                name="description"
                id="complaint-description"
                placeholder="Provide detailed information about your complaint"
                required
              />
            </Field>
            <FormButton title="Submit Complaint" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
