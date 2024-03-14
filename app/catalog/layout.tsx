"use client";
import Select from "react-select";
import { FaArrowsUpDown } from "react-icons/fa6";
import Options from "@/common/utils/productFilter";
import { usePathname } from "next/navigation";
import Navigation from "@/common/components/catalog/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathEnd = pathname.split("/products/")[1];
  return (
    <section className="w-screen">
      <Navigation></Navigation>
      <div>{children}</div>
      <div className="flex flex-col gap-4 ml-4 w-fit p-4">
        <div>
          <p className="font-bold text-3xl mb-8">FILTER</p>
          <label htmlFor="sortGeneral" className="text-xl font-bold">
            Sort By
          </label>
          <Select
            id="sortGeneral"
            className="w-40"
            options={Options.GeneralOptions}
          />
        </div>
        {pathEnd === "Skateboards" && (
          <div>
            <label htmlFor="sortSize" className="text-xl font-bold">
              Size
            </label>
            <Select
              id="sortSize"
              className="w-40 "
              options={Options.SkateSizeOptions}
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
              className="w-40 "
              options={Options.PriceRangeOptions}
            />
            Min
            <FaArrowsUpDown />
            Max
            <Select
              id="sortPriceHigh "
              className="w-40 "
              options={Options.PriceRangeOptions}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sortBrand" className="text-xl font-bold">
            Brand
          </label>
          <Select
            id="sortBrand"
            className="w-40"
            options={Options.GeneralOptions}
          />
        </div>
      </div>
    </section>
  );
}
