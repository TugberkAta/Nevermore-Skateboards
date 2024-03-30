import { montserrat } from "@/common/styles/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Previews() {
  return (
    <>
      <div className="grid h-[60rem] w-full grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-4 lg:grid-rows-6">
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-2">
          <PreviewObject
            title={"Roller Blades"}
            objectPosition={"object-bottom"}
            src={"/rollerblades.jpg"}
            address={"/catalog/Rollerblades"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-4">
          <PreviewObject
            title={"Skates"}
            objectPosition={"object-bottom"}
            src={"/skates.jpg"}
            address={"/catalog/Skateboards"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-2">
          <PreviewObject
            title={"Shoes"}
            objectPosition={"object-bottom"}
            src={"/vans.jpg"}
            address={"/catalog/Shoes"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-4 lg:row-span-2">
          <PreviewObject
            title={"Snowboards"}
            objectPosition={""}
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
      <div className="relative h-full w-full">
        <Image
          loading="lazy"
          fill
          className={`object-cover ${objectPosition} transition-transform duration-300 ease-in-out group-hover:scale-110`}
          src={src}
          alt={title}
        />
      </div>
      <div className="absolute z-10 h-full w-full bg-black opacity-15 transition-opacity hover:opacity-30"></div>
      <h2
        className={`${montserrat.className} absolute bottom-7 z-10 flex w-full justify-center text-3xl font-semibold text-white  duration-300 ease-in-out group-hover:scale-110 `}
      >
        {title}
      </h2>
    </Link>
  );
}
