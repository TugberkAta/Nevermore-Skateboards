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
  size: z
    .string({
      invalid_type_error: "Please enter a title",
    })
    .min(1, { message: "This field is required" }),
  imgUrl: z
    .string({
      invalid_type_error: "Please enter an url",
    })
    .min(1, { message: "This field is required" }),
});

export type State = {
  errors?: {
    title?: string[];
    price?: string[];
    brand?: string[];
    size?: string[];
    imgUrl?: string[];
  };
  message?: string | null;
};

const CreateSkate = FormSchema.omit({});

export async function createSkate(prevState: State, formData: FormData) {
  const validatedFields = CreateSkate.safeParse({
    title: formData.get("title"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    size: formData.get("size"),
    imgUrl: formData.get("imgUrl"),
  });

  console.log(formData);

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { title, price, brand, size, imgUrl } = validatedFields.data;

  const amountInCents = price * 100;
  try {
    await sql`
              INSERT INTO skates ( title, price, brand, size, img_url)
              VALUES (${title}, ${amountInCents}, ${brand}, ${size}, ${imgUrl})
            `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Skateboard.",
    };
  }

  revalidatePath("/catalog/Skateboards");
  redirect("/catalog/Skateboards");
}
