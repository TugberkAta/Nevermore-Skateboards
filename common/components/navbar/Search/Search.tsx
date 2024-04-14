"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { Input } from "@nextui-org/react";
import { Providers } from "@/common/components/providers";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";
import { ItemsWithCategory } from "@/common/lib/data";
import PreviewSearchItems from "./PreviewSearchItems";
import { motion } from "framer-motion";

type SearchProps = {
  queryItems: ItemsWithCategory[];
  activeSearchBar: boolean;
  setActiveSearchBar: Dispatch<SetStateAction<boolean>>;
};

export default function Search({
  queryItems,
  setActiveSearchBar,
  activeSearchBar,
}: SearchProps) {
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
          setActiveSearchBar(false);
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

  // To disable scrolling when the search-bar is focused and opened on mobile
  useEffect(() => {
    if (activeSearchBar) {
      document.getElementById("query")?.focus();
    }
    if (focused) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [focused, activeSearchBar]);

  return (
    <>
      <div
        className={`${focused ? "absolute left-0 top-0 z-30 flex h-screen w-screen bg-black opacity-30" : "hidden"}`}
      ></div>
      <div
        className={`${activeSearchBar ? "absolute left-0 top-20 z-40 flex w-full justify-center" : "hidden"} ${focused ? "z-40" : ""} lg:block`}
      >
        <div
          className="relative"
          onFocus={() => setFocused(true)}
          ref={wrapperRef}
        >
          <Providers>
            <Input
              id="query"
              className="w-[80vw] lg:w-[22rem]"
              placeholder="Type to search..."
              defaultValue={searchParams.get("query")?.toString()}
              startContent={
                <IoSearch className="size-5 fill-gray-500"></IoSearch>
              }
              onChange={(e) =>
                handleQueryChange("query", e?.target.value || "")
              }
            ></Input>
          </Providers>
          {queryItems && focused && (
            <motion.div
              className="flex h-[90%] flex-col items-center justify-between"
              layout
            >
              <div
                className={`absolute top-11 z-30 flex w-full flex-col items-center gap-4 overflow-scroll rounded-lg bg-white [&>div:first-child]:pt-4 [&>div:last-child]:pb-4`}
              >
                {queryItems?.map((item) => {
                  return (
                    <PreviewSearchItems
                      key={item.title + " search result"}
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
      </div>
    </>
  );
}
