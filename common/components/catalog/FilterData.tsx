"use client";

import { PreviewItem } from "@/common/components/catalog/PreviewItem";
import { Item } from "@/common/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
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

type FilterDataProp = {
  productData: Item[];
  productName: string;
};

export default function FilterData({
  productData,
  productName,
}: FilterDataProp) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filteredProductData, setFilteredProductData] = useState<Item[]>([]);

  useEffect(() => {
    const sortBrand = searchParams.get("sortBrand");
    const sortSize = searchParams.get("sortSize");
    const sortGeneral = searchParams.get("sortGeneral");
    const sortSizeHigh = searchParams.get("sortPriceHigh");
    const sortSizeLow = searchParams.get("sortPriceLow");

    let filteredProductData = productData
      .filter((product) => !sortBrand || sortBrand === product.brand)
      .filter((product) => !sortSize || sortSize === product.size)
      .filter(
        (product) =>
          !sortSizeHigh || parseInt(sortSizeHigh) > product.price / 100
      )
      .filter(
        (product) => !sortSizeLow || parseInt(sortSizeLow) < product.price / 100
      );

    if (sortGeneral === "lowToHigh") {
      filteredProductData = filteredProductData.sort(
        (a, b) => a.price - b.price
      );
    }
    if (sortGeneral === "highToLow") {
      filteredProductData = filteredProductData.sort(
        (a, b) => b.price - a.price
      );
    }

    setFilteredProductData(filteredProductData);
  }, [pathname, searchParams]);

  return (
    <>
      {productData && (
        <motion.div className="w-full" layout>
          <div className="pt-10 pr-10 pl-10 h-full grid grid-cols-2 md:grid-cols-2 justify-center lg:grid-cols-3  2xl:grid-cols-5 gap-x-8">
            <AnimatePresence>
              {filteredProductData.map((product: Item) => {
                return (
                  <PreviewItem
                    key={product.title}
                    src={product.img_url || ""}
                    alt={product.title || ""}
                    title={product.title || ""}
                    price={product.price || NaN}
                    address={`/product/${productName}/${product.uuid}`}
                    brand={product.brand}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </>
  );
}
