import CrudCreate from "@/common/components/CRUD/CrudCreate";

export default async function CreateProduct({
  params,
}: {
  params: { Category: string };
}) {
  return <CrudCreate itemCategory={params.Category}></CrudCreate>;
}
