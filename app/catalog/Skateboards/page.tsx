import FetchFilterOptions from "@/common/components/catalog/FetchFilterOptions";
import FetchProductData from "@/common/components/catalog/FetchProductData";

export default function Home() {
  return (
    <>
      <FetchFilterOptions></FetchFilterOptions>
      <FetchProductData productName={"Skateboards"} />
    </>
  );
}
