import Image from "next/image";
import { inika } from "../styles/fonts";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Navigation() {
  return (
    <nav className={`w-screen h-14 flex items-center`}>
      <div className="ml-8 mr-8 flex items-center justify-between w-screen">
        <div className="flex items-center">
          <div className="flex gap-4 h-full items-center ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${inika.className}`}>Nevermore</p>
          </div>
          <div className="ml-20 font-semibold gap-5 text-sm flex text-black">
            <a href="">Skateboards</a>
            <a href="">Roller Blades</a>
            <a href="">Snowboards</a>
            <a href="">Shoes</a>
          </div>
        </div>
        <div className="fill-black flex gap-4">
          <a href="">
            <IoMdSearch className="size-5"></IoMdSearch>
          </a>
          <a href="">
            <MdOutlineShoppingCart className="size-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
