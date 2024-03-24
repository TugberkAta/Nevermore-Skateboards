import {
  fetchItemData,
  fetchRollerbladeData,
  fetchShoeData,
  fetchSkateData,
  fetchSnowboardData,
} from "@/common/lib/data";
import { Item } from "../../../../common/lib/data";
import ProductDetails from "@/common/components/product/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { id: string; type: string };
}) {
  let itemData: Item;
  try {
    const itemDataArray = await fetchItemData(params.id);
    itemData = itemDataArray[0];
  } catch (error) {
    console.error("Failed to fetch item data:", error);
    return;
  }

  let typeData;
  switch (params.type) {
    case "Skateboards":
      typeData = await fetchSkateData();
      break;
    case "Rollerblades":
      typeData = await fetchRollerbladeData();
      break;
    case "Snowboards":
      typeData = await fetchSnowboardData();
      break;
    case "Shoes":
      typeData = await fetchShoeData();
      break;
    default:
      () => Promise.reject("Invalid item type");
  }

  console.log(typeData?.sizeData[0].size);

  return (
    <>
      {itemData && (
        <div className="w-screen">
          <ProductDetails
            itemData={itemData}
            sizeData={typeData?.sizeData}
          ></ProductDetails>
        </div>
      )}
    </>
  );
}
