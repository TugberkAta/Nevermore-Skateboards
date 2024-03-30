import Credit from "@/common/components/footer/Credit";
import Navigation from "@/common/components/navbar/Navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="w-screen h-full">
        <Navigation stripeApiKey={process.env.STRIPE_API_KEY}></Navigation>
        <div>{children}</div>
      </section>
    </>
  );
}
