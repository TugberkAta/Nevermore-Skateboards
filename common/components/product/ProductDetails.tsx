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
      <div className="flex w-screen flex-col md:flex-row gap-20  mt-20">
        <div className="w-full md:w-1/2">
          <ProductImage
            alt={itemData.title || ""}
            src={itemData.img_url || ""}
          ></ProductImage>
        </div>
        <div className="w-full md:w-1/2  flex justify-center">
          <div className="w-10/12">
            <ProductInformation itemData={itemData} sizeData={sizeData} />
            <AddToCart itemData={itemData}></AddToCart>
            <div className="flex flex-col gap-4 text-sm text-gray-500 mt-8">
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
      <div className="pb-4 mb-4">
        <h3 className={`${montserratThin.className} text-sm`}>
          {itemData.brand}
        </h3>
        <h1 className={`${montserrat.className} text-2xl`}>{itemData.title}</h1>
        <div className={`${montserratThin.className} text-gray-500 mt-3 mb-3`}>
          £{(itemData.price || 0) / 100} STR
        </div>
        <p className="text-gray-700 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illum
          aspernatur reprehenderit cumque at neque deserunt, eveniet sapiente
          consequuntur nam rerum recusandae magni tenetur eius, ad quis deleniti
          natus harum!
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-center w-10/12 flex-col">
          <p className={` ${openSans.className} text-xs font-bold mb-3`}>
            SIZE
          </p>
          <div
            className={`${montserrat.className} text-sm flex flex-wrap justify-center w-full gap-3 mb-2`}
          >
            {sizeData?.map((type) => {
              return (
                <div key={type.size}>
                  <button
                    className={`border relative w-12 h-8 rounded-3xl text-center ${
                      type.size === itemData.size
                        ? "border-black bg-black text-white"
                        : ""
                    }`}
                  >
                    {type.size === itemData.size ? (
                      <p>{type.size}</p>
                    ) : (
                      <>
                        <p className="text-gray-500 cursor-not-allowed">
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
