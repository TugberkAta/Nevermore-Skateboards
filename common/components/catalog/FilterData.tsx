"use client";

import Select from "react-select";
import { FaArrowsUpDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface Options {
  GeneralOptions: Option[];
  ShoeSizeOptions: Option[];
  RollerbladeSizeOptions: Option[];
  SkateSizeOptions: Option[];
  SnowboardSizeOptions: Option[];
  PriceRangeOptions: Option[];
}

export default function FilterData({
  filterOptions,
}: {
  filterOptions: Options;
}) {
  const pathname = usePathname();
  const pathEnd = pathname.split("/catalog/")[1];

  const [sortParams, setSortParams] = useState({
    sortGeneral: null,
    sortSize: null,
    sortPriceLow: null,
    sortPriceHigh: null,
    sortBrand: null,
  });

  // Function to update the sortParams state
  const handleSortChange = (name: any, value: string | number | undefined) => {
    setSortParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

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
            onChange={(e) => handleSortChange("sortGeneral", e?.value)}
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
              onChange={(e) => handleSortChange("sortSize", e?.value)}
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
              onChange={(e) => handleSortChange("sortPriceLow", e?.value)}
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
              onChange={(e) => handleSortChange("sortPriceHigh", e?.value)}
              options={filterOptions.PriceRangeOptions}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sortBrand" className="text-xl font-bold">
            Brand
          </label>
          <Select
            id="sortBrand"
            instanceId="sortBrand"
            name="sortBrand"
            className="w-40"
            onChange={(e) => handleSortChange("sortBrand", e?.value)}
            options={filterOptions.GeneralOptions}
          />
        </div>
      </div>
    </div>
  );
}
