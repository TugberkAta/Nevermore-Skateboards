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
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type SearchProps = {
  queryItems: ItemsWithCategory[];
  activeSearchBar: boolean;
  setActiveSearchBar: Dispatch<SetStateAction<boolean>>;
  queryTotalCount: number;
};

export default function Search({
  queryItems,
  setActiveSearchBar,
  activeSearchBar,
  queryTotalCount,
}: SearchProps) {
  const [focused, setFocused] = useState(false);

  // Hook that alerts clicks outside of the passed ref
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      // Alert if clicked on outside of element
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
    pageCount: "1",
  });

  // Resets the pageCount to 1 when query changes
  useEffect(() => {
    handleQueryChange("pageCount", "1");
  }, [queryParams.query]);

  function incrementPageCount() {
    if (queryTotalCount / 4 >= Number(queryParams.pageCount))
      handleQueryChange(
        "pageCount",
        String(Number(queryParams.pageCount) + 1) || "1",
      );
  }

  function decrementPageCount() {
    if (Number(queryParams.pageCount) > 1) {
      handleQueryChange(
        "pageCount",
        String(Number(queryParams.pageCount) - 1) || "1",
      );
    }
  }

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
    if (queryParams.pageCount) {
      params.set("pageCount", queryParams.pageCount);
    } else params.delete("pageCount");
    replace(`${pathname}?${params.toString()}`);
  }, [queryParams]);

  // To disable scrolling when the search-bar is focused and opened on mobile
  useEffect(() => {
    if (activeSearchBar) {
      const queryInput = document.getElementById("query") as HTMLInputElement;
      queryInput?.focus({ preventScroll: true });
    }
    if (focused) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
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
                className={`absolute top-11 z-30 flex w-full flex-col items-center gap-4 overflow-scroll rounded-lg bg-white scrollbar-hide [&>div:first-child]:pt-4 [&>div:last-child]:pb-4`}
              >
                {queryItems.length != 0 && (
                  <div className="flex w-11/12 items-center justify-between text-center text-sm">
                    <p>{queryTotalCount} match found</p>
                    <div className="flex items-center justify-end">
                      <button onClick={decrementPageCount}>
                        <GrFormPrevious
                          className={`size-5 ${Number(queryParams.pageCount) === 1 ? "stroke-gray-500" : ""}`}
                        />
                      </button>
                      <p className="w-6">{queryParams.pageCount}</p>
                      <button onClick={incrementPageCount}>
                        <GrFormNext
                          className={`size-5 ${queryTotalCount / 4 <= Number(queryParams.pageCount) ? "stroke-gray-400" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                )}
                {queryItems.map((item) => {
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
