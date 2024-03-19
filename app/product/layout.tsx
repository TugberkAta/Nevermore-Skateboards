import Navigation from "@/common/components/navbar/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen">
      <Navigation></Navigation>
      {children}
    </section>
  );
}
