import FetchProductData from "@/common/components/catalog/FetchProductData";
import FilterDataForm from "@/common/components/catalog/FilterDataForm";
import FilterDataSortButton from "@/common/components/catalog/FilterDataSortButton";
import Credit from "@/common/components/footer/Credit";
import Navigation from "@/common/components/navbar/navUI/Navigation";
import ProductSkeleton from "@/common/components/skeletons/productSkeleton";
import { fetchQueryItems } from "@/common/lib/data";
import { createOptions } from "@/common/utils/productFilter";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Catalog - Skateboards, Rollerblades, Snowboards, Shoes | Nevermore Skateboards",
  keywords:
    "skateboards, rollerblades, snowboards, skate shoes, extreme sports gear, skateboarding equipment, outdoor sports, Nevermore Skateboards",
  description:
    "Dive into the world of extreme sports with Nevermore Skateboards. Explore our premium catalog of skateboards, rollerblades, snowboards, and specially designed skate shoes. Gear up for your next adventure with top-quality equipment tailored for enthusiasts and professionals alike.",
};

export default async function ProductPage({
  searchParams,
  params,
}: {
  params: { Category: string };
  searchParams: { query: string; pageCount: number };
}) {
  const queryItems = await fetchQueryItems(
    searchParams.query || "",
    Number(searchParams.pageCount) || 1,
  );
  const filterOptions = await createOptions(params.Category);
  return (
    <>
      <Navigation
        stripeApiKey={process.env.STRIPE_API_KEY}
        queryItems={queryItems.rows}
        queryTotalCount={queryItems.totalCount}
      ></Navigation>
      <div className="mt-4 flex min-h-[90vh] w-full flex-col items-center">
        <div className="w-11/12">
          <div className="flex h-16 w-full justify-end">
            {filterOptions && (
              <FilterDataSortButton filterOptions={filterOptions} />
            )}
          </div>
          <div className="flex gap-8">
            {filterOptions && <FilterDataForm filterOptions={filterOptions} />}
            <Suspense fallback={<ProductSkeleton></ProductSkeleton>}>
              <FetchProductData productName={params.Category} />
            </Suspense>
          </div>
        </div>
      </div>
      <Credit></Credit>
    </>
  );
}
