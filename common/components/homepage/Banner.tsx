import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="relative flex h-60 w-full lg:h-[34rem]">
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
