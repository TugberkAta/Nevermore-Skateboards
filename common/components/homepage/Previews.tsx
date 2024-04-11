import { montserrat, montserratMedium } from "@/common/styles/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Previews() {
  return (
    <>
      <div className="grid h-[60rem] w-full grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-4 lg:grid-rows-6">
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-2">
          <PreviewObject
            title={"Roller Blades"}
            subtitle={"Carve Your Path: Explore Our Curated Skate Collection"}
            objectPosition={"object-bottom"}
            src={"/rollerblades.jpg"}
            address={"/catalog/Rollerblades"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-4">
          <PreviewObject
            title={"Skates"}
            subtitle="Cruise in Comfort: Find Your Flow with Supportive Rollerblades"
            objectPosition={"object-bottom"}
            src={"/skates.jpg"}
            address={"/catalog/Skateboards"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-2 lg:row-span-2">
          <PreviewObject
            title={"Shoes"}
            subtitle="Comfort Meets Style: Find the Perfect Pair for Every Step"
            objectPosition={"object-bottom"}
            src={"/vans.jpg"}
            address={"/catalog/Shoes"}
          />
        </div>
        <div className="relative overflow-hidden border lg:col-span-4 lg:row-span-2">
          <PreviewObject
            title={"Snowboards"}
            subtitle="Shred the Slopes: Experience the Thrill of Winter"
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
  subtitle: string;
};

export function PreviewObject({
  title,
  objectPosition,
  src,
  address,
  subtitle,
}: PreviewObjectProps) {
  return (
    <Link href={address} className="group ">
      <div className="relative h-full w-full">
        <Image
          loading="lazy"
          fill
          className={`object-cover ${objectPosition}  duration-500 ease-in-out group-hover:scale-110`}
          src={src}
          alt={title + " banner"}
        />
      </div>
      <div className="absolute top-0 z-10 h-full w-full bg-black opacity-25 transition-opacity"></div>
      <div
        className={`flex flex-col items-center text-center ${montserratMedium.className} absolute top-0 z-10 flex h-full w-full justify-center font-semibold text-white  duration-500 ease-in-out group-hover:scale-110 `}
      >
        <h2 className="text-3xl">{title}</h2>
        <h3 className="w-11/12 text-xs">{subtitle}</h3>
      </div>
    </Link>
  );
}
