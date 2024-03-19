import { montserrat } from "@/common/styles/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Previews() {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-6 w-full h-[60rem] gap-4">
        <div className="col-span-2 row-span-2 border relative overflow-hidden">
          <PreviewObject
            title={"Roller Blades"}
            objectPosition={"object-bottom"}
            src={"/rollerblades.jpg"}
            address={"/catalog/Rollerblades"}
          />
        </div>
        <div className="col-span-2 row-span-4 border relative overflow-hidden">
          <PreviewObject
            title={"Skates"}
            objectPosition={"object-bottom"}
            src={"/skates.jpg"}
            address={"/catalog/Skateboards"}
          />
        </div>
        <div className="col-span-2 row-span-2 border relative overflow-hidden">
          <PreviewObject
            title={"Shoes"}
            objectPosition={"object-bottom"}
            src={"/vans.jpg"}
            address={"/catalog/Shoes"}
          />
        </div>
        <div className="col-span-4 row-span-2 border relative overflow-hidden">
          <PreviewObject
            title={"Snowboards"}
            src={"/snowboard.jpg"}
            address={"/catalog/Snowboards"}
          />
        </div>
      </div>
    </>
  );
}

type PreviewObjectProps = {
  title: string;
  objectPosition?: string;
  src: string;
  address: string;
};

export function PreviewObject({
  title,
  objectPosition,
  src,
  address,
}: PreviewObjectProps) {
  return (
    <Link href={address} className="group ">
      <Image
        fill
        className={`object-cover ${objectPosition} transition-transform duration-300 ease-in-out group-hover:scale-110`}
        src={src}
        alt={title}
      />
      <div className="w-full h-full bg-black opacity-15 hover:opacity-30 transition-opacity absolute z-10"></div>
      <h2
        className={`${montserrat.className} flex w-full justify-center text-3xl font-semibold text-white absolute bottom-7 z-10  group-hover:scale-110 ease-in-out duration-300 `}
      >
        {title}
      </h2>
    </Link>
  );
}
