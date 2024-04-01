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
import CategorySizeData from "./categorySizeData";

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

  let sizeData;
  switch (productName) {
    case "Skateboards":
      sizeData = CategorySizeData.Skateboards;
      break;
    case "Rollerblades":
      sizeData = CategorySizeData.Rollerblade;
      break;
    case "Snowboards":
      sizeData = CategorySizeData.Snowboards;
      break;
    case "Shoes":
      sizeData = CategorySizeData.Shoes;
      break;
    default:
      return;
  }

  const Options: Options = {
    GeneralOptions: [
      { value: "", label: "Default" },
      { value: "highToLow", label: "High To Low" },
      { value: "lowToHigh", label: "Low To High" },
    ],
    ProductSizeOptions: [
      { value: "", label: "Default" },
      ...sizeData.map((e) => {
        return { value: e, label: e };
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
