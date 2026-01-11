import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllUsers } from "@/actions/users";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getAllUsers();

  return (
    <div className="mx-auto py-10 space-y-2 px-5">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
