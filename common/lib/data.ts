import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

type Item = {
  uuid?: number;
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
    const data = await sql<Item>`SELECT * FROM skates`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skate data.");
  }
}

export async function fetchRollerbladeData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM rollerblades`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rollerblade data.");
  }
}

export async function fetchShoeData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM shoes`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch shoe data.");
  }
}

export async function fetchSnowboardData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM snowboards`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch snowboard data.");
  }
}
