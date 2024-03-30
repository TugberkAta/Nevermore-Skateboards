import { motion } from "framer-motion";

export default function ProductSkeleton() {
  let arrayOfSkeletonBox = [];
  for (let index = 0; index < 8; index++) {
    arrayOfSkeletonBox.push(
      <div
        key={index}
        className="flex animate-pulse flex-col items-center overflow-hidden "
      >
        <div className="relative col-span-1 mb-1 w-full grid-rows-1 overflow-hidden">
          <div className="group flex h-full w-full justify-center">
            <div className="h-[250px] w-[350px]" />
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
    <div className="ml-10 mr-10 grid h-full auto-rows-auto grid-cols-2 gap-x-8 gap-y-4 pt-10 md:grid-cols-3 lg:grid-cols-3">
      {arrayOfSkeletonBox}
    </div>
  );
}
