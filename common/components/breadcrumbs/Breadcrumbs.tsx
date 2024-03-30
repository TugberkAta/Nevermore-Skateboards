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
      <div className="ml-20 mt-4 flex gap-1 text-sm italic text-gray-500 transition-all">
        <Link className="hover:text-black" href={`/catalog/${category}`}>
          {category}
        </Link>
        <p>/</p>
        <Link className="hover:text-black" href={`/product/${category}/${id}`}>
          {itemTitle}
        </Link>
      </div>
    </>
  );
}
