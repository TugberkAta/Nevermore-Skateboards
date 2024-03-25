import { createOptions } from "@/common/utils/productFilter";
import FilterDataForm from "./FilterDataForm";

type FetchFilterDataProps = {
  productName: string;
};

export default async function FetchFilterData({
  productName,
}: FetchFilterDataProps) {
  const filterOptions = await createOptions(productName);
  return (
    <>{filterOptions && <FilterDataForm filterOptions={filterOptions} />}</>
  );
}
