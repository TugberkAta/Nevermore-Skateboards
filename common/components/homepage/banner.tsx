import { inknut } from "@/common/styles/fonts";
import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="flex w-full h-[38rem] relative">
        <Image
          fill
          className="object-cover"
          src="/banner.jpg"
          alt="Woman resting with rollerblade"
        />
        <p
          className={`${inknut.className} z-10 text-white text-lg bottom-10 left-10 absolute `}
        >
          Skate till ravens come
        </p>
      </div>
    </>
  );
}
