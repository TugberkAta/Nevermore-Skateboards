import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";

export default async function ProductPage({
  params,
}: {
  params: { category: string };
}) {
  console.log(params.category);

  return (
    <>
      <FetchFilterOptions></FetchFilterOptions>
      <FetchProductData productName={params.category} />
    </>
  );
}
