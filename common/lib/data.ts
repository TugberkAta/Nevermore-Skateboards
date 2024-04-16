import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export type Item = {
  uuid: string;
  title: string;
  price: number;
  brand: string;
  img_url: string;
  img_url_arr: string[];
  size_array: string[];
};

export interface ItemsWithCategory extends Item {
  category: string;
}

export async function fetchSkateData() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM skates`;
    return {
      product: data.rows,
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
    return {
      product: data.rows,
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
    return {
      product: data.rows,
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
    return {
      product: data.rows,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch snowboard data.");
  }
}

export async function fetchLatestItems() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  // Unionize the tables and fetch the item that matches the uuid from the tables
  try {
    const data = await sql<ItemsWithCategory>`SELECT * FROM (
      SELECT *, 'Snowboards' AS category FROM snowboards
      UNION
      SELECT *, 'Skateboards' AS category FROM skates
      UNION
      SELECT *, 'Rollerblades' AS category FROM rollerblades
      UNION
      SELECT *, 'Shoes' AS category FROM shoes
    ) AS combined
    ORDER BY date_added DESC
    LIMIT 5
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest item data.");
  }
}

export async function fetchItemData(uuid: string) {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  // Unionize the tables and fetch the item that matches the uuid from the tables
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

type CountResult = {
  total_count: number;
};

const ITEMS_PER_PAGE = 4;
export async function fetchQueryItems(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const searchText = query.replace(/\s+/g, " & ").trim();

    // Query to fetch data with pagination
    const dataQuery = await sql<ItemsWithCategory>`
    SELECT * FROM (
      SELECT *, 'Snowboards' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM snowboards
      UNION
      SELECT *, 'Skateboards' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM skates
      UNION
      SELECT *, 'Rollerblades' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM rollerblades
      UNION
      SELECT *, 'Shoes' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM shoes
    ) AS combined
    WHERE
      document @@ to_tsquery('english', ${searchText})
    ORDER BY date_added DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    const totalRowCountQuery = await sql<CountResult>`
    SELECT COUNT(*) AS total_count FROM (
      SELECT * FROM (
        SELECT *, 'Snowboards' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM snowboards
        UNION
        SELECT *, 'Skateboards' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM skates
        UNION
        SELECT *, 'Rollerblades' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM rollerblades
        UNION
        SELECT *, 'Shoes' AS category, to_tsvector('english', coalesce(title, '') || ' ' || coalesce(brand, '')) as document FROM shoes
      ) AS combined
      WHERE
        document @@ to_tsquery('english', ${searchText})
    ) AS count_subquery`;

    const totalRowCount = totalRowCountQuery.rows[0].total_count;

    return { rows: dataQuery.rows, totalCount: totalRowCount };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch search items.");
  }
}
