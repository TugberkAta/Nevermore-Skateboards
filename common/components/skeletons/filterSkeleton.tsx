import { FaArrowsUpDown } from "react-icons/fa6";

export default function FilterSkeleton() {
  return (
    <div className="flex h-5/6">
      <div className="flex flex-col gap-4 ml-4 w-fit p-4">
        <div>
          <p className="font-bold text-3xl mb-8">FILTER</p>
        </div>
        <div>
          <div className="w-40" />
        </div>
      </div>
    </div>
  );
}
