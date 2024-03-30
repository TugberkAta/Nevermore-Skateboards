import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="flex w-full h-60 lg:h-[34rem] relative">
        <Image
          fill
          className="object-cover object-bottom"
          src="/banner.jpg"
          alt="Woman resting with rollerblade"
        />
      </div>
    </>
  );
}
