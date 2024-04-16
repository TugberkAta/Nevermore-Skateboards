"use server";

import { CategoryBrandData, CategorySizeData } from "./categorySpecificData";

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

export async function createOptions(productName: string) {
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

  let brandData;
  switch (productName) {
    case "Skateboards":
      brandData = CategoryBrandData.Skateboards;
      break;
    case "Rollerblades":
      brandData = CategoryBrandData.Rollerblade;
      break;
    case "Snowboards":
      brandData = CategoryBrandData.Snowboards;
      break;
    case "Shoes":
      brandData = CategoryBrandData.Shoes;
      break;
    default:
      return;
  }

  const Options: Options = {
    GeneralOptions: [
      { value: "", label: "Default Sorting" },
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
      ...brandData.map((e) => {
        return { value: e, label: e };
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
