"use client";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="h-full w-screen bg-gray-700">{children}</section>;
}
