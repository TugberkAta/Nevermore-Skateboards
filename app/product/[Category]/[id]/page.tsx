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
import Breadcrumbs from "@/common/components/breadcrumbs/Breadcrumbs";

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
          <div className="min-h-[75vh] w-screen">
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
