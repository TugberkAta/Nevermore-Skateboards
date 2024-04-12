"use client";

import { Providers } from "@/common/components/providers";
import { createRollerblades } from "@/common/lib/actions/rollerbladeAction";
import { createShoes } from "@/common/lib/actions/shoesAction";
import { createSkate } from "@/common/lib/actions/skateActions";
import { createSnowboards } from "@/common/lib/actions/snowboardAction";
import {
  CategoryBrandData,
  CategorySizeData,
} from "@/common/utils/categorySpecificData";
import { Select, SelectItem } from "@nextui-org/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
    case "Skateboards":
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

  let sizeData;
  switch (itemCategory) {
    case "Skateboards":
      sizeData = CategorySizeData.Skateboards;
      break;
    case "Rollerblades":
      sizeData = CategorySizeData.Rollerblade;
      break;
    case "Snowboards":
      sizeData = CategorySizeData.Snowboards;
      break;
    case "Shoes":
      sizeData = CategorySizeData.Shoes;
      break;
    default:
      return;
  }

  let brandData;
  switch (itemCategory) {
    case "Skateboards":
      brandData = CategoryBrandData.Skateboards;
      break;
    case "Rollerblades":
      brandData = CategoryBrandData.Rollerblade;
      break;
    case "Snowboards":
      brandData = CategoryBrandData.Snowboards;
      break;
    case "Shoes":
      brandData = CategoryBrandData.Shoes;
      break;
    default:
      return;
  }

  const [state, formAction] = useFormState(create, initialState);

  const [sizeValues, setSizeValues] = useState(new Set([]));

  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="mb-16 mt-16 flex w-fit flex-col items-center justify-center gap-6 rounded-md rounded-t-none border-t-4 border-black bg-slate-100  px-24 py-6 shadow-md">
          <p className="text-xl font-bold">Creating {itemCategory}</p>
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
            <SelectInput
              name={"brand"}
              data={brandData}
              placeholder={"Pick A Brand"}
              label={"Brand"}
            ></SelectInput>
            <SelectMultipleInput
              name={"size"}
              data={sizeData}
              placeholder={"Pick Available Sizes"}
              label={"Size"}
              setValue={setSizeValues}
              values={sizeValues}
            ></SelectMultipleInput>
            <DefaultInput
              name={"imgUrl"}
              type={"input"}
              placeholder={"Enter Main Image Url"}
              label="Main Image Url"
            ></DefaultInput>
            <DefaultInput
              name={"imgUrl"}
              type={"input"}
              placeholder={"Enter Image #2"}
              label="Image Url #2"
            ></DefaultInput>
            <DefaultInput
              name={"imgUrl"}
              type={"input"}
              placeholder={"Enter Image #3"}
              label="Image Url #3"
            ></DefaultInput>
            <div className="absolute -z-10 flex flex-col opacity-0">
              <label htmlFor={"honeyPot"}>{}</label>
              <input type="input" id={"honeyPot"} name={"honeyPot"} />
            </div>
            <button
              className="rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-800"
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

type SelectMultipleInputProps = {
  name: string;
  data: string[];
  placeholder: string;
  label: string;
  setValue: Dispatch<SetStateAction<Set<never>>>;
  values: Set<never>;
};

function SelectMultipleInput({
  name,
  placeholder,
  label,
  data,
  setValue,
  values,
}: SelectMultipleInputProps) {
  const handleSelectionChange = (e: any) => {
    setValue(new Set(e.target.value.split(",")));
  };
  return (
    <Providers>
      <label htmlFor={name}>{label}</label>
      <Select
        aria-label={label}
        id={name}
        name={name}
        selectionMode="multiple"
        placeholder={placeholder}
        variant="bordered"
        className="w-60"
        isRequired
        selectedKeys={values}
        onChange={handleSelectionChange}
      >
        {data.map((option) => (
          <SelectItem className="bg-gray-50" key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
    </Providers>
  );
}

type SelectInputProps = {
  name: string;
  data: string[];
  placeholder: string;
  label: string;
};

function SelectInput({ name, placeholder, label, data }: SelectInputProps) {
  return (
    <Providers>
      <label htmlFor={name}>{label}</label>
      <Select
        aria-label={label}
        id={name}
        name={name}
        variant="bordered"
        placeholder={placeholder}
        className="w-60"
        isRequired
      >
        {data.map((option) => (
          <SelectItem className="bg-gray-50" key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
    </Providers>
  );
}
