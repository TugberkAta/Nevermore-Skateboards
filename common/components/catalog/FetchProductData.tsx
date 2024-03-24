import {
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "@/common/lib/data";
import FilterData from "./FilterData";

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
        <FilterData
          productData={productData.product}
          productName={productName}
        ></FilterData>
      )}
    </>
  );
}
