import Credit from "@/common/components/footer/Credit";
import Banner from "@/common/components/homepage/Banner";
import Previews from "@/common/components/homepage/Previews";
import Navigation from "@/common/components/navbar/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nevermore Skateboards - Premium Skateboarding Gear and Lifestyle",
  keywords:
    "Nevermore Skateboards, premium skateboarding gear, skateboard lifestyle, high-quality skateboards, skateboarding community, skate apparel, skate accessories",
  description:
    "Welcome to Nevermore Skateboards, where skateboarding is not just a sport, but a lifestyle. Immerse yourself in our world of high-quality skateboards, gear, and apparel designed for enthusiasts who live and breathe skateboarding. Join our vibrant community and elevate your skateboarding experience.",
};

export default function Home() {
  return (
    <>
      <div className="w-screen">
        <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
        <Banner></Banner>
        <div className="ml-3 mr-3 mt-6 lg:ml-16 lg:mr-16">
          <Previews></Previews>
        </div>
        <Credit></Credit>
      </div>
    </>
  );
}
