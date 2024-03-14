import { fetchSnowboardData } from "@/common/lib/data";

export default async function Home() {
  const skateData = await fetchSnowboardData();
  return (
    <>
      <div className="w-screen"></div>
    </>
  );
}
