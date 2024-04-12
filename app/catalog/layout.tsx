import Credit from "@/common/components/footer/Credit";
import Navigation from "@/common/components/navbar/navUI/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="h-full w-screen">
        <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
        <div>{children}</div>
      </section>
    </>
  );
}
