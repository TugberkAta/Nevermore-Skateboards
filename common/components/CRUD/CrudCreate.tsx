"use client";

import { createRollerblades } from "@/common/lib/actions/rollerbladeAction";
import { createShoes } from "@/common/lib/actions/shoesAction";
import { createSkate } from "@/common/lib/actions/skateActions";
import { createSnowboards } from "@/common/lib/actions/snowboardAction";
import { useFormState } from "react-dom";

type CrudCreateProps = {
  itemCategory: string;
};

export default function CrudCreate({ itemCategory }: CrudCreateProps) {
  const initialState = {
    errors: {
      title: undefined,
      itemCategory: undefined,
      price: undefined,
      brand: undefined,
      size: undefined,
      imgUrl: undefined,
    },
    message: "",
  };
  let create;

  switch (itemCategory) {
    case "Skates":
      create = createSkate;
      break;
    case "Rollerblades":
      create = createRollerblades;
      break;
    case "Snowboards":
      create = createSnowboards;
      break;
    case "Shoes":
      create = createShoes;
      break;
    default:
      create = () => Promise.reject("Invalid item category");
  }

  const [state, formAction] = useFormState(create, initialState);
  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="flex w-fit flex-col items-center justify-center gap-6 shadow-md px-24 py-6 rounded-md border-t-4 rounded-t-none border-black  bg-slate-100 mt-16 mb-16">
          <p className="text-xl font-bold"> {itemCategory} Creation</p>
          <form
            className="flex flex-col items-center gap-4"
            action={formAction}
          >
            <DefaultInput
              name={"title"}
              type={"input"}
              placeholder={"Enter Title"}
              label="Title Of Item"
            ></DefaultInput>
            <DefaultInput
              name={"price"}
              type={"input"}
              placeholder={"Enter $ Amount"}
              label="USD Amount"
            ></DefaultInput>
            <DefaultInput
              name={"brand"}
              type={"input"}
              placeholder={"Enter Brand Name"}
              label="Brand Name"
            ></DefaultInput>
            <DefaultInput
              name={"size"}
              type={"input"}
              placeholder={"Enter Size"}
              label="Size"
            ></DefaultInput>
            <DefaultInput
              name={"imgUrl"}
              type={"input"}
              placeholder={"Enter Image Url"}
              label="Image Url"
            ></DefaultInput>
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

type DefaultInputProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
};

function DefaultInput({ name, type, placeholder, label }: DefaultInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
  );
}
