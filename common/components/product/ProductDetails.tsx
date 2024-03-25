import { Item } from "../../lib/data";
import { ProductImage } from "./ProductImage";
import { montserrat, montserratThin } from "@/common/styles/fonts";
import { AddToCart } from "./AddToCart";
import { QueryResultRow } from "@vercel/postgres";

export interface DetailsProps {
  itemData: Item;
  sizeData: QueryResultRow[] | undefined;
}

export default function ProductDetails({ itemData, sizeData }: DetailsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-20 ml-40 mr-40 mt-20">
        <ProductImage
          alt={itemData.title || ""}
          src={itemData.img_url || ""}
        ></ProductImage>
        <div>
          <ProductInformation itemData={itemData} sizeData={sizeData} />
          <AddToCart itemData={itemData}></AddToCart>
        </div>
      </div>
    </>
  );
}

export function ProductInformation({ itemData, sizeData }: DetailsProps) {
  return (
    <div>
      <div className="border-b pb-4 mb-4">
        <h3 className={`${montserratThin.className} text-sm  mb-2`}>
          {itemData.brand}
        </h3>
        <h1 className={`${montserrat.className} text-lg  `}>
          {itemData.title}
        </h1>
        <div className={`${montserratThin.className} text-gray-500`}>
          £{(itemData.price || 0) / 100} STR
        </div>
      </div>
      <div
        className={`${montserrat.className} text-sm grid grid-flow-col justify-center w-full gap-3 mb-2`}
      >
        {sizeData?.map((type) => {
          return (
            <div key={type.size}>
              <button
                className={`border relative w-12 h-8 text-center ${
                  type.size === itemData.size
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                {type.size === itemData.size ? (
                  <p>{type.size}</p>
                ) : (
                  <>
                    <p className="text-gray-400 cursor-not-allowed">
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
  );
}
