import {
  fetchItemData,
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "@/common/lib/data";
import { Item } from "../../../../common/lib/data";
import ProductDetails from "@/common/components/product/ProductDetails";
import Credit from "@/common/components/footer/Credit";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string; Category: string };
}) {
  let itemData: Item;
  try {
    const itemDataArray = await fetchItemData(params.id);
    itemData = itemDataArray[0];
  } catch (error) {
    console.error("Failed to fetch item data:", error);
    return;
  }

  let CategoryData;
  switch (params.Category) {
    case "Skateboards":
      CategoryData = await fetchSkateData();
      break;
    case "Rollerblades":
      CategoryData = await fetchRollerbladeData();
      break;
    case "Snowboards":
      CategoryData = await fetchSnowboardData();
      break;
    case "Shoes":
      CategoryData = await fetchShoeData();
      break;
    default:
      () => Promise.reject("Invalid item Category");
  }

  return (
    <>
      {itemData && (
        <>
          <Breadcrumbs
            category={params.Category}
            itemTitle={itemData.title}
            id={params.id}
          ></Breadcrumbs>
          <div className="w-screen min-h-[75vh]">
            <ProductDetails
              itemData={itemData}
              sizeData={CategoryData?.sizeData}
            ></ProductDetails>
          </div>
          <Credit></Credit>
        </>
      )}
    </>
  );
}

type BreadCrumbsProps = {
  category: string;
  itemTitle?: string;
  id?: string;
};

export function Breadcrumbs({ category, itemTitle, id }: BreadCrumbsProps) {
  console.log(itemTitle);
  return (
    <>
      <div className="flex gap-1 italic text-sm transition-all text-gray-500 ml-20 mt-4">
        <Link className="hover:text-black" href={`/catalog/${category}`}>
          {category}
        </Link>
        <p>/</p>
        <Link className="hover:text-black" href={`/product/${category}/${id}`}>
          {itemTitle}
        </Link>
      </div>
    </>
  );
}
