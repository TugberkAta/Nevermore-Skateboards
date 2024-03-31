"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PreviewCartItem } from "./PreviewCartItem";
import { motion } from "framer-motion";
import Stripe from "stripe";
import { NoSSR } from "@/common/utils/noSSR";

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

  // To disable scrolling when the panel is opened
  useEffect(() => {
    if (activateShopCart) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activateShopCart]);

  async function handleProcess() {
    if (!stripeApiKey) {
      throw new Error(
        "STRIPE_API_KEY is not defined in the environment variables",
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
        localStorage.removeItem("shopCart");
        window.location.href = session.url;
      } else null;
    } catch (error) {
      console.error("Error creating Stripe Checkout Session:", error);
    }
  }

  return (
    <div className="flex">
      <button className="relative" onClick={handleClick}>
        <MdOutlineShoppingCart className="size-5" />
        <NoSSR>
          <h1
            className={`absolute bottom-3 left-3 size-5 rounded-full bg-black text-center text-sm font-bold text-white`}
          >
            {0 + (shopCartArray?.length || 0)}
          </h1>
        </NoSSR>
      </button>
      {activateShopCart && (
        <>
          <motion.div
            className="absolute right-0 top-0 z-40 flex h-full w-full justify-center bg-white lg:w-5/12"
            animate={{ translateX: 0, opacity: 1 }}
            initial={{ translateX: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="mt-10 w-10/12 overflow-scroll">
              <div className="flex justify-between">
                <h1 className={`text-xl font-bold`}>
                  Cart ( {0 + (shopCartArray?.length || 0)} )
                </h1>
                <button onClick={handleClick}>
                  <RxCross2 className="size-6" />
                </button>
              </div>
              <motion.div
                className="flex h-[90%] flex-col items-center justify-between"
                layout
              >
                <div className="mb-10 mt-10 flex w-full flex-col gap-4">
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
                {shopCartArray?.length ?? 0 >= 1 ? (
                  <button
                    onClick={handleProcess}
                    className=" rounded-full bg-green-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-green-600 "
                  >
                    Proceed
                  </button>
                ) : (
                  <></>
                )}
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute right-0 top-0 z-30 h-full w-full bg-black opacity-40"></div>
        </>
      )}
    </div>
  );
}
