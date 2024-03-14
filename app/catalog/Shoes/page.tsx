import { fetchShoeData } from "@/common/lib/data";

export default async function Home() {
  const skateData = await fetchShoeData();
  return (
    <>
      <div className="w-screen"></div>
    </>
  );
}
