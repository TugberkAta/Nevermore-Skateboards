import { PreviewItem } from "@/common/components/catalog/PreviewItem";
import { createOptions } from "@/common/utils/productFilter";
import FilterData from "./FilterData";

export default async function FetchFilterData() {
  const filterOptions = await createOptions();
  return <>{filterOptions && <FilterData filterOptions={filterOptions} />}</>;
}
