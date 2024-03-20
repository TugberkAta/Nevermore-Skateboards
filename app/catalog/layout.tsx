import Navigation from "@/common/components/navbar/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen  h-screen">
      <Navigation></Navigation>
      <div className="flex h-5/6">{children}</div>
    </section>
  );
}
