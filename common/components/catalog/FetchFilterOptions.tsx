import { createOptions } from "@/common/utils/productFilter";
import FilterDataForm from "./FilterDataForm";

export default async function FetchFilterData() {
  const filterOptions = await createOptions();
  return (
    <>{filterOptions && <FilterDataForm filterOptions={filterOptions} />}</>
  );
}
