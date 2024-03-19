import Image from "next/image";

type ProductImageProps = {
  alt: string;
  src: string;
};

export function ProductImage({ alt, src }: ProductImageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="col-span-1 grid-rows-1 w-full relative ">
        <div className="group flex justify-center items-center w-full h-full ">
          <Image
            width={700}
            height={700}
            className={`w-fit h-auto transition-transform duration-300 ease-in-out scale-90 group-hover:scale-100`}
            src={src}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
}
