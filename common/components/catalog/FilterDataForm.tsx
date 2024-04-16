"use client";

import { Select, SelectItem } from "@nextui-org/select";
import {
  useSearchParams,
  usePathname,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Providers } from "@/common/components/providers";
import { motion } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  montserrat,
  montserratMedium,
  montserratThin,
} from "@/common/styles/fonts";

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

export default function FilterDataForm({
  filterOptions,
}: {
  filterOptions: Options;
}) {
  const pathname = usePathname();

  const [activeFilter, setActiveFilter] = useState(false);

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [sortParams, setSortParams] = useState({
    sortSize: searchParams.get("sortSize") || "",
    sortPriceLow: searchParams.get("sortPriceLow") || "",
    sortPriceHigh: searchParams.get("sortPriceHigh") || "",
    sortBrand: searchParams.get("sortBrand") || "",
  });

  // Function to update the sortParams state
  const handleSortChange = (name: any, value: string | number | undefined) => {
    setSortParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Cleanup for the parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortParams.sortBrand) {
      params.set("sortBrand", sortParams.sortBrand);
    } else params.delete("sortBrand");
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const toggleFilter = () => setActiveFilter((prev) => !prev);
      window.addEventListener("filterMobile", toggleFilter);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("filterMobile", toggleFilter);
      };
    }
  }, []);

  // Make the page unscrollable when filter is active on mobile devices
  useEffect(() => {
    if (activeFilter) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activeFilter]);

  return (
    <>
      <FilterViewWrapper
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      >
        <SelectFilter
          id={"sortSize"}
          filterOption={filterOptions.ProductSizeOptions}
          label={"Size"}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
        ></SelectFilter>
        <SelectFilter
          id={"sortPriceLow"}
          filterOption={filterOptions.PriceRangeOptions}
          label={"Min price"}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
        ></SelectFilter>
        <SelectFilter
          id={"sortPriceHigh"}
          filterOption={filterOptions.PriceRangeOptions}
          label={"Max price"}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
        ></SelectFilter>
        <SelectFilter
          id={"sortBrand"}
          filterOption={filterOptions.ProductBrandOptions}
          label={"Brand"}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
        ></SelectFilter>
      </FilterViewWrapper>
    </>
  );
}

type SelectFilterProps = {
  id: string;
  filterOption: Option[];
  searchParams: ReadonlyURLSearchParams;
  label: string;
  handleSortChange: (name: any, value: string | number | undefined) => void;
};

export function SelectFilter({
  id,
  label,
  searchParams,
  filterOption,
  handleSortChange,
}: SelectFilterProps) {
  return (
    <Providers>
      <div className={`${montserratMedium.className}`}>
        <label htmlFor={id}>{label}</label>
        <Select
          aria-label={label}
          defaultSelectedKeys={[searchParams.get(id) || ""]}
          variant="underlined"
          id={id}
          placeholder={"Default"}
          className="max-w-xs"
          onChange={(e) => handleSortChange(id, e?.target.value || "")}
        >
          {filterOption.map((option) => (
            <SelectItem
              className="bg-gray-50"
              key={option.value || ""}
              value={option.value || ""}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </Providers>
  );
}

type FilterViewWrapperProps = {
  setActiveFilter: Dispatch<SetStateAction<boolean>>;
  activeFilter: boolean;
  children: React.ReactNode;
};

export function FilterViewWrapper({
  children,
  setActiveFilter,
  activeFilter,
}: FilterViewWrapperProps) {
  return (
    <>
      {/* View for the bigger screen devices */}
      <div className=" hidden h-5/6 w-60 justify-center lg:flex">
        <div className=" w-9/12 items-center gap-4 ">
          <p className={`mb-4 text-3xl ${montserrat.className}`}>FILTER</p>
          <div className="mb-6 flex w-full flex-col  flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            {children}
          </div>
        </div>
      </div>
      {/* View for the smaller screen devices */}
      {activeFilter && (
        <div>
          <motion.div
            className="absolute left-0 top-0 z-40 flex h-screen w-60 justify-center bg-white pt-20 lg:hidden"
            animate={{ translateX: 0, opacity: 1 }}
            initial={{ translateX: -80, opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setActiveFilter(!activeFilter)}>
              <div className="absolute left-5 top-7">
                <FaArrowLeftLong></FaArrowLeftLong>
              </div>
            </button>
            <div className=" w-9/12 items-center gap-4 ">
              <p className={`mb-8 text-3xl ${montserrat.className}`}>FILTER</p>
              <div className="mb-6 flex w-full flex-col  flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                {children}
              </div>
            </div>
          </motion.div>
          <div className="absolute right-0 top-0 z-30 h-full w-full bg-black opacity-40"></div>
        </div>
      )}
    </>
  );
}
