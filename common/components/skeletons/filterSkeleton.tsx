import { FaArrowsUpDown } from "react-icons/fa6";

export default function FilterSkeleton() {
  return (
    <div className="flex h-5/6">
      <div className="flex flex-col gap-3 ml-4 w-fit p-4">
        <div>
          <p className="font-bold mb-3 text-3xl">FILTER</p>
        </div>
        <div className="text-xl font-bold">Sort By</div>
        <div className="w-40 h-8 animate-pulse relative">
          <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
        </div>
        <div className="text-xl font-bold">Size</div>
        <div className="w-40 h-8 animate-pulse relative">
          <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
        </div>
        <div className="text-xl font-bold">Price Range</div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-40 h-8 animate-pulse relative">
            <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
          </div>
          Min
          <FaArrowsUpDown />
          Max
          <div className="w-40 h-8 animate-pulse relative">
            <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
          </div>
        </div>
        <div className="text-xl font-bold">Brand</div>
        <div className="w-40 h-8 animate-pulse relative">
          <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
        </div>
      </div>
    </div>
  );
}
