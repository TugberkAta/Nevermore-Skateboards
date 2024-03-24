import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";

export default async function ProductPage({
  params,
}: {
  params: { Category: string };
}) {
  return (
    <>
      <FetchFilterOptions></FetchFilterOptions>
      <FetchProductData productName={params.Category} />
    </>
  );
}
