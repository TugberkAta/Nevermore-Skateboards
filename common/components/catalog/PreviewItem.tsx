import Image from "next/image";
import Link from "next/link";

type PreviewItemProps = {
  alt: string;
  objectPosition?: string;
  src: string;
  title: string;
  price: number;
  address: string;
};

export function PreviewItem({
  alt,
  objectPosition,
  src,
  title,
  price,
  address,
}: PreviewItemProps) {
  return (
    <Link
      href={address}
      className="flex flex-col items-center overflow-hidden "
    >
      <div className="col-span-1 grid-rows-1 w-full  relative overflow-hidden mb-1">
        <div className="group flex justify-center w-full h-full">
          <Image
            width={200}
            height={200}
            className={`object-fit w-auto h-full ${objectPosition} transition-transform duration-300 ease-in-out scale-90 group-hover:scale-100`}
            src={src}
            alt={alt}
          />
          <div className="w-full h-full bg-black opacity-5 transition-opacity top-0 absolute z-20"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-center text-sm">{title}</p>
        <p className="text-center ml-4 mr-4 text-xs">£{price / 100}</p>
      </div>
    </Link>
  );
}
