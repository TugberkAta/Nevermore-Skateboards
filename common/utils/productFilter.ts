"use server";

interface Option {
  value: string | number | null;
  label: string;
}

export interface Options {
  GeneralOptions: Option[];
  ProductSizeOptions: Option[];
  ProductBrandOptions: Option[];
  PriceRangeOptions: Option[];
}

type createOptionsProps = {
  productName: string;
};

import {
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "../lib/data";

export async function createOptions(productName: string) {
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
      productData = await fetchSkateData();
      break;
  }

  const Options: Options = {
    GeneralOptions: [
      { value: "", label: "Default" },
      { value: "highToLow", label: "High To Low" },
      { value: "lowToHigh", label: "Low To High" },
    ],
    ProductSizeOptions: [
      { value: "", label: "Default" },
      ...productData.sizeData.map((e) => {
        return { value: e.size, label: e.size };
      }),
    ],
    ProductBrandOptions: [
      { value: "", label: "Default" },
      ...productData.brandData.map((e) => {
        return { value: e.brand, label: e.brand };
      }),
    ],
    PriceRangeOptions: [
      { value: "", label: "Default" },
      { value: 20, label: "20" },
      { value: 50, label: "50" },
      { value: 100, label: "100" },
      { value: 200, label: "200" },
      { value: 500, label: "500" },
    ],
  };

  return Options;
}
