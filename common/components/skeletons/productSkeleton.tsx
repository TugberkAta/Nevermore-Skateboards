import { motion } from "framer-motion";

export default function ProductSkeleton() {
  let arrayOfSkeletonBox = [];
  for (let index = 0; index < 8; index++) {
    arrayOfSkeletonBox.push(
      <div
        key={index}
        className="flex animate-pulse flex-col items-center overflow-hidden "
      >
        <div className="col-span-1 grid-rows-1 w-full relative overflow-hidden mb-1">
          <div className="group flex justify-center w-full h-full">
            <div className="w-[350px] h-[250px]" />
            <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
          </div>
        </div>
        <div className="flex flex-col relative w-full">
          <p className="text-center text-sm font-semibold h-4"> </p>
          <p className="text-center text-sm h-4"></p>
          <p className="text-center text-xs h-4"></p>
          <div className="w-full h-full bg-black opacity-10 transition-opacity top-0 absolute z-20"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="ml-10 pt-10 mr-10 h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-auto gap-x-8 gap-y-4">
      {arrayOfSkeletonBox}
    </div>
  );
}
