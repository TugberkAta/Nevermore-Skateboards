import Credit from "@/common/components/footer/Credit";
import Banner from "@/common/components/homepage/Banner";
import { Carousel } from "@/common/components/homepage/Carousel";
import Previews from "@/common/components/homepage/Previews";
import Navigation from "@/common/components/navbar/navUI/Navigation";
import { fetchLatestItems, fetchQueryItems } from "@/common/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nevermore Skateboards - Premium Skateboarding Gear and Lifestyle",
  keywords:
    "Nevermore Skateboards, premium skateboarding gear, skateboard lifestyle, high-quality skateboards, skateboarding community, skate apparel, skate accessories",
  description:
    "Welcome to Nevermore Skateboards, where skateboarding is not just a sport, but a lifestyle. Immerse yourself in our world of high-quality skateboards, gear, and apparel designed for enthusiasts who live and breathe skateboarding. Join our vibrant community and elevate your skateboarding experience.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string; pageCount: number };
}) {
  const latestItems = await fetchLatestItems();
  const queryItems = await fetchQueryItems(
    searchParams.query || "",
    Number(searchParams.pageCount) || 1,
  );
  return (
    <>
      <Navigation
        stripeApiKey={process.env.STRIPE_API_KEY}
        queryItems={queryItems.rows}
        queryTotalCount={queryItems.totalCount}
      ></Navigation>
      <div className="flex flex-col gap-4 lg:gap-16">
        <Banner></Banner>
        <Carousel latestItems={latestItems}></Carousel>
        <div className="ml-3 mr-3 lg:ml-16 lg:mr-16">
          <Previews></Previews>
        </div>
        <Credit></Credit>
      </div>
    </>
  );
}
