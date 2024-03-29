import Navigation from "@/common/components/navbar/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen  h-screen">
      <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
      <div className="flex mt-4">{children}</div>
    </section>
  );
}
