import Navigation from "@/common/components/navbar/navUI/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen">
      <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
      {children}
    </section>
  );
}
