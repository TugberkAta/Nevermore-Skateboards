"use client";
import { useParams } from "next/navigation";
import Select from "react-select";
import { FaArrowsUpDown } from "react-icons/fa6";

const options = [
  { value: "default", label: "Default" },
  { value: "highToLow", label: "High To Low" },
  { value: "lowToHigh", label: "Low To High" },
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id: string }>();

  return (
    <section className="w-screen">
      <div className="flex flex-col gap-4 ml-4 w-fit p-4">
        <div>
          <p className="font-bold text-3xl mb-8">FILTER</p>
          <label htmlFor="sortGeneral" className="text-xl font-bold">
            Sort By
          </label>
          <Select id="sortGeneral" className="w-40" options={options} />
        </div>
        {params?.id === "Skateboards" && (
          <div>
            <label htmlFor="sortSize" className="text-xl font-bold">
              Size
            </label>
            <Select id="sortSize" className="w-40 " options={options} />
          </div>
        )}
        <div>
          <label htmlFor="sortPriceLow" className="text-xl font-bold">
            Price Range
          </label>
          <div className="flex flex-col items-center gap-1">
            <Select id="sortPriceHigh " className="w-40 " options={options} />
            <FaArrowsUpDown />
            <Select id="sortPriceHigh " className="w-40 " options={options} />
          </div>
        </div>
        <div>
          <label htmlFor="sortBrand" className="text-xl font-bold">
            Brand
          </label>
          <Select id="sortBrand" className="w-40 " options={options} />
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}
