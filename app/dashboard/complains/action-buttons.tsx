"use client";
import { deleteComplaint, updateComplaintStatus } from "@/actions/complaints";
import { Button } from "@/components/ui/button";
import { Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Complaint } from "./columns";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ActionButtons({
  complaintId,
  complaint,
}: {
  complaintId: string;
  complaint: Complaint;
}) {
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this complaint?")) {
        await deleteComplaint(complaintId);
        toast.success("Complaint deleted successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateComplaintStatus(complaintId, newStatus);
      toast.success("Complaint status updated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-x-1 flex items-center justify-center flex-wrap gap-1">
      <Select value={complaint.status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-35 text-xs">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <HugeiconsIcon icon={Trash} />
      </Button>
    </div>
  );
}
