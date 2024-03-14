"use client";

import { createSkate } from "@/common/lib/actions";
import { useFormState } from "react-dom";

export default function Home() {
  const initialState = { message: "", errors: {} };
  const [state, formAction] = useFormState(createSkate, initialState);
  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="flex w-6/12 flex-col items-center justify-center gap-6 shadow-md px-24 py-6 rounded-md border-t-4 rounded-t-none border-black  bg-slate-100 mt-16 mb-16">
          SKATE CREATION
          <form className="flex flex-col gap-4" action={formAction}>
            <input type="input" id="title" name="title" placeholder="Title" />
            <input type="input" id="price" name="price" placeholder="Price" />
            <input type="input" id="brand" name="brand" placeholder="Brand" />
            <input type="input" id="size" name="size" placeholder="Size" />
            <input
              type="input"
              id="imgUrl"
              name="imgUrl"
              placeholder="Image url"
            />
            <button className="size-6 bg-black" type="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
}
