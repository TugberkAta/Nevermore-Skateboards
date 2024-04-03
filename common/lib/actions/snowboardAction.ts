"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Please enter a title",
    })
    .min(1, { message: "This field is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "This field is required" })
    .gt(0, { message: "Please enter an amount greater than $0." }),
  brand: z
    .string({
      invalid_type_error: "Please enter a brand",
    })
    .min(1, { message: "This field is required" }),
  sizes: z.array(z.string().min(1)).nonempty(),
  imgUrl: z.array(z.string().min(1)).nonempty(),
  honeyPot: z.null(),
});

export type State = {
  errors?: {
    title?: string[];
    price?: string[];
    brand?: string[];
    sizes?: string[];
    imgUrl?: string[];
    honeyPot?: string[];
  };
  message?: string | null;
};

const CreateSnowboards = FormSchema.omit({});

export async function createSnowboards(prevState: State, formData: FormData) {
  // Filter out the empty string values
  const filteredFormData = new FormData();
  formData.forEach((value, key) => {
    if (value !== "") {
      filteredFormData.append(key, value);
    }
  });

  // Get the form data after validation
  const validatedFields = CreateSnowboards.safeParse({
    title: filteredFormData.get("title"),
    price: filteredFormData.get("price"),
    brand: filteredFormData.get("brand"),
    honeyPot: filteredFormData.get("honeyPot"),
    sizes: filteredFormData.getAll("size"),
    imgUrl: filteredFormData.getAll("imgUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { title, price, brand, sizes, imgUrl } = validatedFields.data;

  const amountInCents = price * 100;

  const sizeArrayString = `{${sizes.join(",")}}`;

  const imageUrlArrayString = `{${imgUrl.join(",")}}`;

  try {
    await sql`
              INSERT INTO snowboards ( title, price, brand, size_array, img_url, img_url_arr)
              VALUES (${title}, ${amountInCents}, ${brand}, ${sizeArrayString}, ${imgUrl[0]}, ${imageUrlArrayString})
            `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Snowboard.",
    };
  }

  revalidatePath("/catalog/Snowboards");
  redirect("/catalog/Snowboards");
}
