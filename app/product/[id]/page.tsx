import ProductDetails from "@/common/components/product/ProductDetails";
import { fetchItemData } from "@/common/lib/data";
import { Item } from "../../../common/lib/data";

export default async function Home({ params }: { params: { id: string } }) {
  let itemData: Item;
  try {
    const itemDataArray = await fetchItemData(params.id);
    itemData = itemDataArray[0];
  } catch (error) {
    console.error("Failed to fetch item data:", error);
    return;
  }

  return (
    <>
      {itemData && (
        <div className="w-screen">
          <ProductDetails itemData={itemData}></ProductDetails>
        </div>
      )}
    </>
  );
}
