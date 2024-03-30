import { FaArrowsUpDown } from "react-icons/fa6";

export default function FilterSkeleton() {
  return (
    <div className="hidden h-5/6 w-60 lg:block">
      <div className=" items-center gap-4 pl-10 pr-10 ">
        <p className="mb-8 text-3xl font-bold">FILTER</p>
        <div className="mb-6 flex w-full flex-col  flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
