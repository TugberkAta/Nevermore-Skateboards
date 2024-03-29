"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Providers } from "@/app/providers";
import { motion } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";

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
          id={"sortGeneral"}
          filterOption={filterOptions.GeneralOptions}
          label={"Sort"}
          handleSortChange={handleSortChange}
        ></SelectFilter>
        <SelectFilter
          id={"sortSize"}
          filterOption={filterOptions.ProductSizeOptions}
          label={"Size"}
          handleSortChange={handleSortChange}
        ></SelectFilter>
        <SelectFilter
          id={"sortPriceLow"}
          filterOption={filterOptions.PriceRangeOptions}
          label={"Min price"}
          handleSortChange={handleSortChange}
        ></SelectFilter>
        <SelectFilter
          id={"sortPriceHigh"}
          filterOption={filterOptions.PriceRangeOptions}
          label={"Max price"}
          handleSortChange={handleSortChange}
        ></SelectFilter>
        <SelectFilter
          id={"sortBrand"}
          filterOption={filterOptions.ProductBrandOptions}
          label={"Brand"}
          handleSortChange={handleSortChange}
        ></SelectFilter>
      </FilterViewWrapper>
    </>
  );
}

type SelectFilterProps = {
  id: string;
  filterOption: Option[];
  label: string;
  handleSortChange: (name: any, value: string | number | undefined) => void;
};

export function SelectFilter({
  id,
  label,
  filterOption,
  handleSortChange,
}: SelectFilterProps) {
  return (
    <Providers>
      <label htmlFor={id}>{label}</label>
      <Select
        aria-label={label}
        defaultSelectedKeys={[""]}
        id={id}
        placeholder="Default"
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
      <div className=" h-5/6 -mr-10 w-60 justify-center hidden lg:flex">
        <div className=" gap-4 w-9/12 items-center ">
          <p className="font-bold text-3xl mb-8">FILTER</p>
          <div className="flex w-full flex-col flex-wrap  md:flex-nowrap mb-6 md:mb-0 gap-4">
            {children}
          </div>
        </div>
      </div>
      {/* View for the smaller screen devices */}
      {activeFilter && (
        <div>
          <motion.div
            className="absolute z-40 bg-white top-0 pt-20 h-screen w-60 justify-center flex lg:hidden"
            animate={{ translateX: 0, opacity: 1 }}
            initial={{ translateX: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setActiveFilter(!activeFilter)}>
              <div className="top-7 left-5 absolute">
                <FaArrowLeftLong></FaArrowLeftLong>
              </div>
            </button>
            <div className=" gap-4 w-9/12 items-center ">
              <p className="font-bold text-3xl mb-8">FILTER</p>
              <div className="flex w-full flex-col flex-wrap  md:flex-nowrap mb-6 md:mb-0 gap-4">
                {children}
              </div>
            </div>
          </motion.div>
          <div className="absolute z-30 w-full h-full bg-black opacity-40 top-0 right-0"></div>
        </div>
      )}
    </>
  );
}
