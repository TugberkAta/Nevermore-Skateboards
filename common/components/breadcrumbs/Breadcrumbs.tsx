import Link from "next/link";

type BreadCrumbsProps = {
  category: string;
  itemTitle?: string;
  id?: string;
};

export default function Breadcrumbs({
  category,
  itemTitle,
  id,
}: BreadCrumbsProps) {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-10/12 gap-1 text-sm italic text-gray-500 transition-all">
          <Link className="hover:text-black" href={`/catalog/${category}`}>
            {category}
          </Link>
          <p>/</p>
          <Link
            className="hover:text-black"
            href={`/product/${category}/${id}`}
          >
            {itemTitle}
          </Link>
        </div>
      </div>
    </>
  );
}
