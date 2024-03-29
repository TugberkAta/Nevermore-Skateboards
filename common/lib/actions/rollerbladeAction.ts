"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { capitalizeFirstLetter } from "@/common/utils/capitaliseFirstLetter";

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

const CreateRollerblade = FormSchema.omit({});

export async function createRollerblades(prevState: State, formData: FormData) {
  const validatedFields = CreateRollerblade.safeParse({
    title: formData.get("title"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    size: formData.get("size"),
    imgUrl: formData.get("imgUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { title, price, brand, size, imgUrl } = validatedFields.data;

  const amountInCents = price * 100;

  const sanitizedBrand = capitalizeFirstLetter(brand);

  try {
    await sql`
              INSERT INTO rollerblades ( title, price, brand, size, img_url)
              VALUES (${title}, ${amountInCents}, ${sanitizedBrand}, ${size}, ${imgUrl})
            `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Rollerblades.",
    };
  }

  revalidatePath("/catalog/Rollerblades");
  redirect("/catalog/Rollerblades");
}
