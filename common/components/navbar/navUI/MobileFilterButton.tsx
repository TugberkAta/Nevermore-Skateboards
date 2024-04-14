import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";

export default function MobileFilterButton({
  pathCategory,
}: {
  pathCategory: string;
}) {
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("filterMobile"));
  }, [activeFilter]);

  return (
    <>
      {pathCategory === "catalog" && (
        <button
          role="button"
          aria-label="filter-panel-button"
          onClick={() => setActiveFilter(!activeFilter)}
        >
          <FaFilter className="size-5"></FaFilter>
        </button>
      )}
    </>
  );
}
