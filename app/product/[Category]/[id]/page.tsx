import { fetchItemData, fetchQueryItems } from "@/common/lib/data";
import { Item } from "../../../../common/lib/data";
import ProductDetails from "@/common/components/product/ProductDetails";
import Credit from "@/common/components/footer/Credit";
import Breadcrumbs from "@/common/components/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { CategorySizeData } from "@/common/utils/categorySpecificData";
import Navigation from "@/common/components/navbar/navUI/Navigation";

export const metadata: Metadata = {
  title:
    "Product Description - High-Quality Skateboarding Gear | Nevermore Skateboards",
  keywords:
    "Product Description, Skateboarding, High-Quality Skateboard, Nevermore Gear, Skate Accessories, Buy Skateboard, Skateboard Shop, Skate Lifestyle",
  description:
    "Discover the Product at Nevermore Skateboards, crafted for durability and performance. Elevate your skateboarding experience with our top-tier gear. Add to your cart now and join the Nevermore lifestyle.",
};

export default async function ProductPage({
  searchParams,
  params,
}: {
  params: { id: string; Category: string };
  searchParams: { query: string; pageCount: number };
}) {
  const queryItems = await fetchQueryItems(
    searchParams.query || "",
    Number(searchParams.pageCount) || 1,
  );

  let itemData: Item;
  try {
    const itemDataArray = await fetchItemData(params.id);
    itemData = itemDataArray[0];
  } catch (error) {
    console.error("Failed to fetch item data:", error);
    return;
  }

  // // Catching category data might be useful in the future to show recommended products
  // let CategoryData;
  // switch (params.Category) {
  //   case "Skateboards":
  //     CategoryData = await fetchSkateData();
  //     break;
  //   case "Rollerblades":
  //     CategoryData = await fetchRollerbladeData();
  //     break;
  //   case "Snowboards":
  //     CategoryData = await fetchSnowboardData();
  //     break;
  //   case "Shoes":
  //     CategoryData = await fetchShoeData();
  //     break;
  //   default:
  //     () => Promise.reject("Invalid item Category");
  // }

  let sizeData;
  switch (params.Category) {
    case "Skateboards":
      sizeData = CategorySizeData.Skateboards;
      break;
    case "Rollerblades":
      sizeData = CategorySizeData.Rollerblade;
      break;
    case "Snowboards":
      sizeData = CategorySizeData.Snowboards;
      break;
    case "Shoes":
      sizeData = CategorySizeData.Shoes;
      break;
    default:
      return;
  }

  return (
    <>
      <Navigation
        stripeApiKey={process.env.STRIPE_API_KEY}
        queryItems={queryItems.rows}
        queryTotalCount={queryItems.totalCount}
      ></Navigation>
      {itemData && (
        <>
          <div className="flex h-[93vh] flex-col justify-between">
            <div className="flex flex-col gap-4">
              <Breadcrumbs
                category={params.Category}
                itemTitle={itemData.title}
                id={params.id}
              ></Breadcrumbs>
              <ProductDetails
                itemData={itemData}
                sizeData={sizeData}
              ></ProductDetails>
            </div>
            <Credit></Credit>
          </div>
        </>
      )}
    </>
  );
}
