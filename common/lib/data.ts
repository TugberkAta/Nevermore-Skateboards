import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export type Item = {
  uuid: string;
  title: string;
  price: number;
  brand: string;
  size: string;
  img_url: string;
};

export async function fetchSkateData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM skates`;

    const sizeData = await sql`SELECT DISTINCT size FROM skates ORDER BY size`;

    const brandData =
      await sql`SELECT DISTINCT brand FROM skates ORDER BY brand`;

    return {
      product: data.rows,
      sizeData: sizeData.rows,
      brandData: brandData.rows,
    };
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

    const sizeData =
      await sql`SELECT DISTINCT size FROM rollerblades ORDER BY size`;

    const brandData =
      await sql`SELECT DISTINCT brand FROM rollerblades ORDER BY brand`;

    return {
      product: data.rows,
      sizeData: sizeData.rows,
      brandData: brandData.rows,
    };
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

    const sizeData = await sql`SELECT DISTINCT size FROM shoes ORDER BY size`;

    const brandData =
      await sql`SELECT DISTINCT brand FROM shoes ORDER BY brand`;

    return {
      product: data.rows,
      sizeData: sizeData.rows,
      brandData: brandData.rows,
    };
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

    const sizeData =
      await sql`SELECT DISTINCT size FROM snowboards ORDER BY size`;

    const brandData =
      await sql`SELECT DISTINCT brand FROM snowboards ORDER BY brand`;

    return {
      product: data.rows,
      sizeData: sizeData.rows,
      brandData: brandData.rows,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch snowboard data.");
  }
}

export async function fetchItemData(uuid: string) {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM snowboards WHERE uuid = ${uuid}
    UNION
    SELECT * FROM skates WHERE uuid = ${uuid}
    UNION
    SELECT * FROM rollerblades WHERE uuid = ${uuid}
    UNION
    SELECT * FROM shoes WHERE uuid = ${uuid}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item data.");
  }
}
