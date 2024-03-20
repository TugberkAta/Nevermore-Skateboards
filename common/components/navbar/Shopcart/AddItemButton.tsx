import { FaPlus } from "react-icons/fa6";

type AddItemButtonProps = {
  handleAddCount: () => void;
};

export default function AddItemButton({ handleAddCount }: AddItemButtonProps) {
  return (
    <button type="button" onClick={handleAddCount}>
      <FaPlus></FaPlus>
    </button>
  );
}
