import { fetchSkateData } from "@/common/lib/data";

export default async function Home() {
  const skateData = await fetchSkateData();
  return (
    <>
      <div className="w-screen"></div>
    </>
  );
}
