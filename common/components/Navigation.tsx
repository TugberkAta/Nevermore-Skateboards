import Image from "next/image";
import { inika } from "../styles/fonts";

export default function Navigation() {
  return (
    <div className={`ml-10 mr-10 w-full h-14 flex items-center`}>
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
  );
}
