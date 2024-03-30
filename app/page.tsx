import Credit from "@/common/components/footer/Credit";
import Banner from "@/common/components/homepage/Banner";
import Previews from "@/common/components/homepage/Previews";
import Navigation from "@/common/components/navbar/Navigation";

export default function Home() {
  return (
    <>
      <div className="w-screen">
        <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
        <Banner></Banner>
        <div className="lg:ml-16 lg:mr-16 mr-3 ml-3 mt-6">
          <Previews></Previews>
        </div>
        <Credit></Credit>
      </div>
    </>
  );
}
