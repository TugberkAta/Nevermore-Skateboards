import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";
import FilterSkeleton from "@/common/components/skeletons/filterSkeleton";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: { Category: string };
}) {
  return (
    <>
      <Suspense fallback={<FilterSkeleton></FilterSkeleton>}>
        <FetchFilterOptions productName={params.Category}></FetchFilterOptions>
      </Suspense>
      <Suspense fallback={<div></div>}>
        <FetchProductData productName={params.Category} />
      </Suspense>
    </>
  );
}
