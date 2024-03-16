"use client";

import Navigation from "@/common/components/catalog/Navigation";
import FilterData from "@/common/components/catalog/FilterData";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen  h-screen">
      <Navigation></Navigation>
      <div className="flex h-5/6">
        <FilterData />
        {children}
      </div>
    </section>
  );
}
