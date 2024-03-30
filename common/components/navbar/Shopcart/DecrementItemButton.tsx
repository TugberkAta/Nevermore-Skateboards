import { Dispatch, SetStateAction } from "react";
import { FaMinus } from "react-icons/fa6";

type RemoveItemButtonProps = {
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
  uuid: string;
};

export default function DecrementItemButton({
  shopCartArray,
  setShopCartArray,
  uuid,
}: RemoveItemButtonProps) {
  const handleDecrementCount = () => {
    const itemIndex = shopCartArray.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === uuid;
    });

    // update the items count
    const updatedArray = shopCartArray.map((itemString, index) => {
      if (index === itemIndex) {
        const item = JSON.parse(itemString);
        if (item.count <= 1) {
          return itemString;
        }
        item.count -= 1;
        return JSON.stringify(item);
      }
      return itemString;
    });

    setShopCartArray(updatedArray);

    localStorage.setItem("shopCart", JSON.stringify(updatedArray));
  };
  return (
    <button type="button" onClick={handleDecrementCount}>
      <FaMinus></FaMinus>
    </button>
  );
}
