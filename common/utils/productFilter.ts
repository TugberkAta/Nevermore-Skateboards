"use server";

interface Option {
  value: string | number | null;
  label: string;
}

export interface Options {
  GeneralOptions: Option[];
  ShoeSizeOptions: Option[];
  RollerbladeSizeOptions: Option[];
  SkateSizeOptions: Option[];
  SnowboardSizeOptions: Option[];
  ShoeBrandOptions: Option[];
  RollerbladeBrandOptions: Option[];
  SkateBrandOptions: Option[];
  SnowboardBrandOptions: Option[];
  PriceRangeOptions: Option[];
}

import {
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "../lib/data";

export async function createOptions() {
  const skateData = await fetchSkateData();
  const rollerbladeData = await fetchRollerbladeData();
  const snowboardData = await fetchSnowboardData();
  const shoesData = await fetchShoeData();

  const Options: Options = {
    GeneralOptions: [
      { value: "", label: "Default" },
      { value: "highToLow", label: "High To Low" },
      { value: "lowToHigh", label: "Low To High" },
    ],
    ShoeSizeOptions: [
      { value: "", label: "Default" },
      ...shoesData.sizeData.map((e) => {
        return { value: e.size, label: e.size };
      }),
    ],
    RollerbladeSizeOptions: [
      { value: "", label: "Default" },
      ...rollerbladeData.sizeData.map((e) => {
        return { value: e.size, label: e.size };
      }),
    ],
    SkateSizeOptions: [
      { value: "", label: "Default" },
      ...skateData.sizeData.map((e) => {
        return { value: e.size, label: e.size };
      }),
    ],
    SnowboardSizeOptions: [
      { value: "", label: "Default" },
      ...snowboardData.sizeData.map((e) => {
        return { value: e.size, label: e.size };
      }),
    ],
    ShoeBrandOptions: [
      { value: "", label: "Default" },
      ...shoesData.brandData.map((e) => {
        return { value: e.brand, label: e.brand };
      }),
    ],
    RollerbladeBrandOptions: [
      { value: "", label: "Default" },
      ...rollerbladeData.brandData.map((e) => {
        return { value: e.brand, label: e.brand };
      }),
    ],
    SkateBrandOptions: [
      { value: "", label: "Default" },
      ...skateData.brandData.map((e) => {
        return { value: e.brand, label: e.brand };
      }),
    ],
    SnowboardBrandOptions: [
      { value: "", label: "Default" },
      ...snowboardData.brandData.map((e) => {
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
