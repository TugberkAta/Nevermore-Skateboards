import { Item } from "../../lib/data";
import { ProductImage } from "./ProductImage";
import { HiOutlineTruck } from "react-icons/hi2";
import { PiPackageLight } from "react-icons/pi";
import ProductInformation from "./ProductInformation";

export interface DetailsProps {
  itemData: Item;
  sizeData: string[];
}

export default function ProductDetails({ itemData, sizeData }: DetailsProps) {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="mt-10 flex w-11/12 flex-col justify-center gap-20 pb-40 md:flex-row lg:pb-0">
          <div className="min-h-80 w-full md:w-1/2 min-[2100px]:h-[70rem]">
            <ProductImage
              alt={itemData.title || ""}
              img_url_arr={itemData.img_url_arr || ""}
            ></ProductImage>
          </div>
          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="w-11/12 md:w-10/12">
              <ProductInformation itemData={itemData} sizeData={sizeData} />
              <div className="mt-8 flex flex-col gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-6">
                  <HiOutlineTruck className="size-6 stroke-gray-500" />
                  <p>Free Expedited Shipping</p>
                </div>
                <div className="flex items-center gap-6 ">
                  <PiPackageLight className="size-6 fill-gray-500" />
                  <p>60 Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
