import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

type IncrementItemButtonProps = {
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
  uuid: string;
  setTempCount: Dispatch<SetStateAction<number>>;
  tempCount: number;
};

export default function IncrementItemButton({
  shopCartArray,
  setShopCartArray,
  uuid,
  setTempCount,
  tempCount,
}: IncrementItemButtonProps) {
  const handleIncrementCount = () => {
    const itemIndex = shopCartArray.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === uuid;
    });

    // update the items count
    setShopCartArray((prevShopCart) =>
      prevShopCart.map((itemString, index) => {
        if (index === itemIndex) {
          const item = JSON.parse(itemString);
          item.count += 1;
          setTempCount(tempCount + 1);
          return JSON.stringify(item);
        }
        return itemString;
      })
    );
  };
  return (
    <button type="button" onClick={handleIncrementCount}>
      <FaPlus></FaPlus>
    </button>
  );
}
