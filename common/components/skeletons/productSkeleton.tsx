import { motion } from "framer-motion";

export default function ProductSkeleton() {
  let arrayOfSkeletonBox = [];
  for (let index = 0; index < 8; index++) {
    arrayOfSkeletonBox.push(
      <div
        key={index}
        className="flex animate-pulse flex-col overflow-hidden rounded-md "
      >
        <div className="relative col-span-1 mb-1 w-full grid-rows-1 overflow-hidden">
          <div className="group flex h-full w-full justify-center">
            <div className="h-[16.5rem] w-[24.5rem]" />
            <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <p className="h-4 text-center text-sm font-semibold"> </p>
          <p className="h-4 text-center text-sm"></p>
          <p className="h-4 text-center text-xs"></p>
          <div className="absolute top-0 z-20 h-full w-full bg-black opacity-10 transition-opacity"></div>
        </div>
      </div>,
    );
  }
  return (
    <div className=" grid h-full grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-5">
      {arrayOfSkeletonBox}
    </div>
  );
}
