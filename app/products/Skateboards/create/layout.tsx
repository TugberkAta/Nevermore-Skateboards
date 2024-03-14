"use client";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen">
      <div>{children}</div>
    </section>
  );
}
