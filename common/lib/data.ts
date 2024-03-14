import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

type Skate = {
  id: number;
  title?: string;
  price?: number;
  brand?: string;
  size?: number;
  img_url?: string;
};

export async function fetchSkateData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Skate>`SELECT * FROM skates`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skate data.");
  }
}
