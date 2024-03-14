import { fetchSkateData } from "@/common/lib/data";
import Navigation from "@/common/components/Navigation";

export default async function Home() {
  const skateData = await fetchSkateData();
  return (
    <>
      <Navigation></Navigation>
      <div className="w-screen"></div>
    </>
  );
}
