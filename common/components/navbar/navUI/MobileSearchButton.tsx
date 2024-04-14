import { Dispatch, SetStateAction } from "react";
import { IoSearch } from "react-icons/io5";

type MobileSearchButtonProps = {
  setActiveSearchBar: Dispatch<SetStateAction<boolean>>;
};

export default function MobileSearchButton({
  setActiveSearchBar,
}: MobileSearchButtonProps) {
  return (
    <button onClick={() => setActiveSearchBar(true)}>
      <IoSearch></IoSearch>
    </button>
  );
}
