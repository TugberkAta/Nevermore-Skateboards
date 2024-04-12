"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Input } from "@nextui-org/react";
import { Providers } from "@/common/components/providers";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";
import { ItemsWithCategory } from "@/common/lib/data";
import PreviewSearchItems from "./PreviewSearchItems";
import { motion } from "framer-motion";

type SearchProps = {
  queryItems: ItemsWithCategory[];
};

export default function Search({ queryItems }: SearchProps) {
  const [focused, setFocused] = useState(false);

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocused(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState({
    query: "",
  });

  // Function to update the queryParams state
  const handleQueryChange = useDebouncedCallback(
    (name: any, value: string | number | undefined) => {
      setQueryParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
    },
    300,
  );

  // Cleanup for the parameter
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (queryParams.query) {
      params.set("query", queryParams.query);
    } else params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, [queryParams]);

  return (
    <div className="relative" onFocus={() => setFocused(true)} ref={wrapperRef}>
      <Providers>
        <Input
          id="query"
          className="w-[22rem]"
          placeholder="Type to search..."
          defaultValue={searchParams.get("query")?.toString()}
          startContent={<IoSearch className="size-5 fill-gray-500"></IoSearch>}
          onChange={(e) => handleQueryChange("query", e?.target.value || "")}
        ></Input>
      </Providers>
      {queryItems && focused && (
        <motion.div
          className="flex h-[90%] flex-col items-center justify-between"
          layout
        >
          <div className="absolute top-11 z-30 flex w-full flex-col items-center gap-4 overflow-scroll rounded-lg bg-white py-7">
            {queryItems?.map((item) => {
              return (
                <PreviewSearchItems
                  alt={item.title || ""}
                  src={item.img_url}
                  title={item.title || ""}
                  price={item.price || NaN}
                  address={`/product/${item.category}/${item.uuid}`}
                  brand={item.brand}
                  uuid={item.uuid}
                ></PreviewSearchItems>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
