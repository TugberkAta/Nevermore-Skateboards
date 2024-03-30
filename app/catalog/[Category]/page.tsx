import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";
import Credit from "@/common/components/footer/Credit";
import FilterSkeleton from "@/common/components/skeletons/filterSkeleton";
import ProductSkeleton from "@/common/components/skeletons/productSkeleton";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: { Category: string };
}) {
  return (
    <>
      <div className="mt-4 flex  min-h-[90vh] flex-col justify-between">
        <div className="flex">
          <Suspense fallback={<FilterSkeleton></FilterSkeleton>}>
            <FetchFilterOptions
              productName={params.Category}
            ></FetchFilterOptions>
          </Suspense>
          <Suspense fallback={<ProductSkeleton></ProductSkeleton>}>
            <FetchProductData productName={params.Category} />
          </Suspense>
        </div>
        <Credit></Credit>
      </div>
    </>
  );
}
