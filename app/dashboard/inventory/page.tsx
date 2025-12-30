import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getAllItems } from "@/actions/items";
import { ItemDialog } from "./item-dialog";
import { Input } from "@/components/ui/input";

export default async function Page() {
  const data = await getAllItems();

  return (
    <div className="mx-auto py-10 space-y-2">
      {(data.length < 1 && (
        <div className="text-center w-full h-full">No items found.</div>
      )) || <DataTable columns={columns} data={data} />}
    </div>
  );
}
