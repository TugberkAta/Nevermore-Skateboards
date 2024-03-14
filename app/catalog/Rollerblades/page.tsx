import { fetchRollerbladeData } from "@/common/lib/data";

export default async function Home() {
  const skateData = await fetchRollerbladeData();
  return (
    <>
      <div className="w-screen"></div>
    </>
  );
}
