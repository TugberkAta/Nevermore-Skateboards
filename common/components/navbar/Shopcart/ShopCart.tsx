"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PreviewCartItem } from "./PreviewCartItem";
import { motion } from "framer-motion";
import Stripe from "stripe";

type ShoppingItemProps = {
  uuid: string;
  title: string;
  price: number;
  brand: string;
  size: string;
  img_url: string;
  count: number;
};

interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: [string];
    };
    unit_amount: number;
  };
  quantity: number;
}

type shopCartProps = {
  shopCartArray: string[] | null;
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
  stripeApiKey: string | undefined;
};

export default function ShopCart({
  shopCartArray,
  setShopCartArray,
  stripeApiKey,
}: shopCartProps) {
  const [activateShopCart, setActivateShopCart] = useState<boolean>(false);

  function handleClick() {
    setActivateShopCart(!activateShopCart);
  }

  async function handleProcess() {
    console.log(stripeApiKey);

    if (!stripeApiKey) {
      throw new Error(
        "STRIPE_API_KEY is not defined in the environment variables"
      );
    }
    const stripe = new Stripe(stripeApiKey);

    let line_items: LineItem[] = [];
    shopCartArray?.forEach((item) => {
      try {
        const ShoppingItem = JSON.parse(item);
        line_items.push({
          price_data: {
            currency: "GBP",
            product_data: {
              name: ShoppingItem.title,
              images: [ShoppingItem.img_url],
            },
            unit_amount: ShoppingItem.price,
          },
          quantity: ShoppingItem.count,
        });
      } catch (error) {
        console.error("Error parsing item:", item, error);
      }
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: "https://nevermore-skateboards.vercel.app",
        cancel_url: "https://nevermore-skateboards.vercel.app",
      });
      if (typeof window !== "undefined" && typeof session.url === "string") {
        window.location.href = session.url;
      } else null;
    } catch (error) {
      console.error("Error creating Stripe Checkout Session:", error);
    }
  }

  return (
    <div className="flex">
      <button onClick={handleClick}>
        <MdOutlineShoppingCart className="size-5" />
      </button>
      {activateShopCart && (
        <>
          <motion.div
            className="absolute z-40 w-5/12 min-w-[30rem] h-full pr-10 bg-white top-0 right-0"
            animate={{ translateX: 40, opacity: 1 }}
            initial={{ translateX: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="pt-10 pl-10 pr-10 h-full overflow-scroll">
              <div className="flex justify-between">
                <h1 className={`font-bold text-xl`}>
                  Cart ( {0 + (shopCartArray?.length || 0)} )
                </h1>
                <button onClick={handleClick}>
                  <RxCross2 className="size-6" />
                </button>
              </div>
              <motion.div
                className="h-[90%]  flex flex-col justify-between items-center"
                layout
              >
                <div className="grid grid-row-4 gap-4 w-full mt-10 mb-10">
                  {shopCartArray?.map((item) => {
                    const ShoppingItem: ShoppingItemProps = JSON.parse(item);
                    return (
                      <PreviewCartItem
                        key={ShoppingItem.title}
                        src={ShoppingItem.img_url || ""}
                        alt={ShoppingItem.title || ""}
                        title={ShoppingItem.title || ""}
                        price={ShoppingItem.price || NaN}
                        size={ShoppingItem.size || ""}
                        address={`/product/${ShoppingItem.uuid}`}
                        brand={ShoppingItem.brand || ""}
                        count={ShoppingItem.count || NaN}
                        uuid={ShoppingItem.uuid || ""}
                        shopCartArray={shopCartArray}
                        setShopCartArray={setShopCartArray}
                      />
                    );
                  })}
                </div>
                <button
                  onClick={handleProcess}
                  className=" bg-green-500 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold py-2 px-4 rounded-full "
                >
                  Proceed
                </button>
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute z-30 w-full h-full bg-black opacity-40 top-0 right-0"></div>
        </>
      )}
    </div>
  );
}
