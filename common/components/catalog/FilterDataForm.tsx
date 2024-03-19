"use client";

import Select from "react-select";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function FilterDataForm({
  filterOptions,
}: {
  filterOptions: Options;
}) {
  const pathname = usePathname();
  const pathEnd = pathname.split("/catalog/")[1];
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [sortParams, setSortParams] = useState({
    sortGeneral: "",
    sortSize: "",
    sortPriceLow: "",
    sortPriceHigh: "",
    sortBrand: "",
  });

  // Function to update the sortParams state
  const handleSortChange = (name: any, value: string | number | undefined) => {
    setSortParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortParams.sortBrand) {
      params.set("sortBrand", sortParams.sortBrand);
    } else params.delete("sortBrand");
    if (sortParams.sortGeneral) {
      params.set("sortGeneral", sortParams.sortGeneral);
    } else params.delete("sortGeneral");
    if (sortParams.sortPriceHigh) {
      params.set("sortPriceHigh", sortParams.sortPriceHigh);
    } else params.delete("sortPriceHigh");
    if (sortParams.sortPriceLow) {
      params.set("sortPriceLow", sortParams.sortPriceLow);
    } else params.delete("sortPriceLow");
    if (sortParams.sortSize) {
      params.set("sortSize", sortParams.sortSize);
    } else params.delete("sortSize");
    replace(`${pathname}?${params.toString()}`);
  }, [sortParams]);

  // Change filter size options depending on the url's path
  let filterSizeOptions;
  switch (pathEnd) {
    case "Skateboards":
      filterSizeOptions = filterOptions.SkateSizeOptions;
      break;
    case "Rollerblades":
      filterSizeOptions = filterOptions.RollerbladeSizeOptions;
      break;
    case "Snowboards":
      filterSizeOptions = filterOptions.SnowboardSizeOptions;
      break;
    case "Shoes":
      filterSizeOptions = filterOptions.ShoeSizeOptions;
      break;
    default:
      return;
  }

  // Change filter brand options depending on the url's path
  let filterBrandOptions;
  switch (pathEnd) {
    case "Skateboards":
      filterBrandOptions = filterOptions.SkateBrandOptions;
      break;
    case "Rollerblades":
      filterBrandOptions = filterOptions.RollerbladeBrandOptions;
      break;
    case "Snowboards":
      filterBrandOptions = filterOptions.SnowboardBrandOptions;
      break;
    case "Shoes":
      filterBrandOptions = filterOptions.ShoeBrandOptions;
      break;
    default:
      return;
  }

  return (
    <div className="flex h-5/6">
      <div className="flex flex-col gap-4 ml-4 w-fit p-4">
        <div>
          <p className="font-bold text-3xl mb-8">FILTER</p>
          <label htmlFor="sortGeneral" className="text-xl font-bold">
            Sort By
          </label>
          <Select
            id="sortGeneral"
            instanceId="sortBrand"
            name="sortGeneral"
            className="w-40"
            onChange={(e) => handleSortChange("sortGeneral", e?.value || "")}
            options={filterOptions.GeneralOptions}
          />
        </div>
        {pathEnd && (
          <div>
            <label htmlFor="sortSize" className="text-xl font-bold">
              Size
            </label>
            <Select
              id="sortSize"
              instanceId="sortSize"
              name="sortSize"
              className="w-40"
              onChange={(e) => handleSortChange("sortSize", e?.value || "")}
              options={filterSizeOptions}
            />
          </div>
        )}
        <div>
          <label htmlFor="sortPriceLow" className="text-xl font-bold">
            Price Range
          </label>
          <div className="flex flex-col items-center gap-1">
            <Select
              id="sortPriceLow"
              instanceId="sortPriceLow"
              name="sortPriceLow"
              className="w-40"
              onChange={(e) => handleSortChange("sortPriceLow", e?.value || "")}
              options={filterOptions.PriceRangeOptions}
            />
            Min
            <FaArrowsUpDown />
            Max
            <Select
              id="sortPriceHigh"
              instanceId="sortPriceHigh"
              name="sortPriceHigh"
              className="w-40"
              onChange={(e) =>
                handleSortChange("sortPriceHigh", e?.value || "")
              }
              options={filterOptions.PriceRangeOptions}
            />
          </div>
        </div>
        {pathEnd && (
          <div>
            <label htmlFor="sortBrand" className="text-xl font-bold">
              Brand
            </label>
            <Select
              id="sortBrand"
              instanceId="sortBrand"
              name="sortBrand"
              className="w-40"
              onChange={(e) => handleSortChange("sortBrand", e?.value || "")}
              options={filterBrandOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
