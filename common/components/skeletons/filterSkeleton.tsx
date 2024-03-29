import { FaArrowsUpDown } from "react-icons/fa6";

export default function FilterSkeleton() {
  return (
    <div className="h-5/6 w-60 hidden lg:block">
      <div className=" gap-4 pr-10 pl-10 items-center ">
        <p className="font-bold text-3xl mb-8">FILTER</p>
        <div className="flex w-full flex-col flex-wrap  md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="h-8 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
            <div className="relative">
              <div className="h-12 w-48"></div>
              <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
