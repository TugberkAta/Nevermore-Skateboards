import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";
import Credit from "@/common/components/footer/Credit";
import Navigation from "@/common/components/navbar/navUI/Navigation";
import FilterSkeleton from "@/common/components/skeletons/filterSkeleton";
import ProductSkeleton from "@/common/components/skeletons/productSkeleton";
import { fetchQueryItems } from "@/common/lib/data";
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
  searchParams: { query: string };
}) {
  const queryItems = await fetchQueryItems(searchParams.query || "");
  return (
    <>
      <Navigation
        stripeApiKey={process.env.STRIPE_API_KEY}
        queryItems={queryItems}
      ></Navigation>
      <div className="flex w-full justify-center">
        <div className=" mt-16 flex min-h-[90vh] w-11/12 flex-col justify-between">
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
        </div>
      </div>
      <Credit></Credit>
    </>
  );
}
