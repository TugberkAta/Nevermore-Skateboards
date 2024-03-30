import Image from "next/image";

type ProductImageProps = {
  alt: string;
  src: string;
};

export function ProductImage({ alt, src }: ProductImageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative col-span-1 w-full grid-rows-1 ">
        <div className="group flex h-full w-full items-center justify-center ">
          <Image
            width={700}
            height={700}
            className={`h-auto w-fit scale-90 transition-transform duration-300 ease-in-out group-hover:scale-100`}
            src={src}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
}
