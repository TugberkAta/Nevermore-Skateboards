import { Item } from "../../lib/data";
import { ProductImage } from "./ProductImage";
import { montserrat, montserratThin, openSans } from "@/common/styles/fonts";
import { AddToCart } from "./AddToCart";
import { QueryResultRow } from "@vercel/postgres";
import { HiOutlineTruck } from "react-icons/hi2";
import { PiPackageLight } from "react-icons/pi";

export interface DetailsProps {
  itemData: Item;
  sizeData: QueryResultRow[] | undefined;
}

export default function ProductDetails({ itemData, sizeData }: DetailsProps) {
  return (
    <>
      <div className="w-scree mt-10 flex flex-col gap-10 pb-40 md:flex-row lg:gap-20 lg:pb-0">
        <div className="min-h-80 w-full md:w-1/2">
          <ProductImage
            alt={itemData.title || ""}
            img_url_arr={itemData.img_url_arr || ""}
          ></ProductImage>
        </div>
        <div className="flex w-full justify-center md:w-1/2">
          <div className="w-10/12">
            <ProductInformation itemData={itemData} sizeData={sizeData} />
            <AddToCart itemData={itemData}></AddToCart>
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
    </>
  );
}

export function ProductInformation({ itemData, sizeData }: DetailsProps) {
  return (
    <div>
      <div className="mb-4 pb-4">
        <h3 className={`${montserratThin.className} text-sm`}>
          {itemData.brand}
        </h3>
        <h1 className={`${montserrat.className} text-2xl`}>{itemData.title}</h1>
        <div className={`${montserratThin.className} mb-3 mt-3 text-gray-500`}>
          £{(itemData.price || 0) / 100} STR
        </div>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illum
          aspernatur reprehenderit cumque at neque deserunt, eveniet sapiente
          consequuntur nam rerum recusandae magni tenetur eius, ad quis deleniti
          natus harum!
        </p>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-10/12 flex-col items-center justify-center">
          <p className={` ${openSans.className} mb-3 text-xs font-bold`}>
            SIZE
          </p>
          <div
            className={`${montserrat.className} mb-2 flex w-full flex-wrap justify-center gap-3 text-sm`}
          >
            {sizeData?.map((type) => {
              return (
                <div key={type.size}>
                  <button
                    className={`relative h-8 w-12 rounded-3xl border text-center ${
                      type.size === itemData.size
                        ? "border-black bg-black text-white"
                        : ""
                    }`}
                  >
                    {type.size === itemData.size ? (
                      <p>{type.size}</p>
                    ) : (
                      <>
                        <p className="cursor-not-allowed text-gray-500">
                          {type.size}
                        </p>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
