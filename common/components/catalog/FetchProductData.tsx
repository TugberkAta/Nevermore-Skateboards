"use server";

import { PreviewItem } from "@/common/components/catalog/PreviewItem";
import {
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "@/common/lib/data";

type FetchProductDataProps = {
  productName: string;
};

export default async function FetchProductData({
  productName,
}: FetchProductDataProps) {
  let productData;
  switch (productName) {
    case "Skateboards":
      productData = await fetchSkateData();
      break;
    case "Rollerblades":
      productData = await fetchRollerbladeData();
      break;
    case "Snowboards":
      productData = await fetchSnowboardData();
      break;
    case "Shoes":
      productData = await fetchShoeData();
      break;
    default:
      () => Promise.reject("Invalid item category");
  }

  return (
    <>
      {productData && (
        <div className="ml-20 w-full mr-20 h-full grid grid-cols-4 mt-10 grid-rows-2 gap-8">
          {productData?.map((product) => {
            return (
              <PreviewItem
                key={product.title}
                src={product.img_url || ""}
                alt={product.title || ""}
                title={product.title || ""}
                price={product.price || NaN}
                address={""}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
