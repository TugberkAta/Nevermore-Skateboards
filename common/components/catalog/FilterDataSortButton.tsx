"use client";

import { Select, SelectItem } from "@nextui-org/select";
import {
  useSearchParams,
  usePathname,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { Providers } from "@/common/components/providers";
import { FaSort } from "react-icons/fa";
import { montserratMedium } from "@/common/styles/fonts";

interface Option {
  value: string | number | null;
  label: string;
}

export interface Options {
  GeneralOptions: Option[];
}

export default function FilterDataForm({
  filterOptions,
}: {
  filterOptions: Options;
}) {
  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [sortParams, setSortParams] = useState({
    sortGeneral: searchParams.get("sortGeneral") || "",
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
    if (sortParams.sortGeneral) {
      params.set("sortGeneral", sortParams.sortGeneral);
    } else params.delete("sortGeneral");
    replace(`${pathname}?${params.toString()}`);
  }, [sortParams]);

  return (
    <>
      <div className="w-60">
        <SelectFilter
          id={"sortGeneral"}
          filterOption={filterOptions.GeneralOptions}
          label={"Sort"}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
        ></SelectFilter>
      </div>
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
      <div className={`${montserratMedium.className} flex items-center gap-2`}>
        <FaSort className="size-5"></FaSort>
        <Select
          aria-label={label}
          defaultSelectedKeys={[searchParams.get(id) || ""]}
          id={id}
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
