import { Dispatch, SetStateAction } from "react";
import { FaMinus } from "react-icons/fa6";

type RemoveItemButtonProps = {
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
  uuid: string;
  setTempCount: Dispatch<SetStateAction<number>>;
  tempCount: number;
};

export default function DecrementItemButton({
  shopCartArray,
  setShopCartArray,
  uuid,
  setTempCount,
  tempCount,
}: RemoveItemButtonProps) {
  const handleDecrementCount = () => {
    const itemIndex = shopCartArray.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === uuid;
    });

    // update the items count
    setShopCartArray((prevShopCart) =>
      prevShopCart.map((itemString, index) => {
        if (index === itemIndex) {
          const item = JSON.parse(itemString);
          if (item.count <= 1) {
            return itemString;
          }
          item.count -= 1;
          setTempCount(tempCount - 1);
          return JSON.stringify(item);
        }
        return itemString;
      })
    );
  };
  return (
    <button type="button" onClick={handleDecrementCount}>
      <FaMinus></FaMinus>
    </button>
  );
}
