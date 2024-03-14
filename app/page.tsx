import Banner from "@/common/components/homepage/Banner";
import Previews from "@/common/components/homepage/Previews";
import Navigation from "@/common/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation></Navigation>
      <div className="w-screen">
        <Banner></Banner>
        <div className=" ml-16 mr-16 mt-6 mb-6">
          <Previews></Previews>
        </div>
      </div>
    </>
  );
}
