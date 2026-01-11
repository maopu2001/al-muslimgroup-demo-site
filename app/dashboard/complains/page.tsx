import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getAllComplaints } from "@/actions/complaints";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getAllComplaints();

  return (
    <div className="mx-auto py-10 space-y-2 px-5">
      <h1 className="text-2xl font-bold mb-4">Manage Complaints</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
