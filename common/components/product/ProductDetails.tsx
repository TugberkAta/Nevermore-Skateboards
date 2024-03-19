import Image from "next/image";
import { Item } from "../../lib/data";
import { ProductImage } from "./ProductImage";
import { montserrat, montserratThin } from "@/common/styles/fonts";
import { AddToCart } from "./AddToCart";

export interface DetailsProps {
  itemData: Item;
}

export default function ProductDetails({ itemData }: DetailsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-20 ml-40 mr-40 mt-20">
        <ProductImage
          alt={itemData.title || ""}
          src={itemData.img_url || ""}
        ></ProductImage>
        <div>
          <ProductInformation itemData={itemData} />
          <AddToCart itemData={itemData}></AddToCart>
        </div>
      </div>
    </>
  );
}

export function ProductInformation({ itemData }: DetailsProps) {
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
      <div className={`${montserrat.className} text-sm  mb-2`}>
        <p>Size: {itemData.size}</p>
      </div>
    </div>
  );
}
