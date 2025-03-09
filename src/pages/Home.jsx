import React from "react";
import HomeBanner from "../components/home-components/HomeBanner";
import AssuranceSection from "../components/home-components/AssuranceSection";
import PopularCategories from "../components/home-components/PopularCategories";
import NewArrivals from "../components/home-components/NewArrivals";
import BestSelling from "../components/home-components/BestSelling";
import DiscountProduct from "../components/home-components/DiscountProduct";

export default function Home() {
  return (
    <main className="pt-40 space-y-10">
      <section>
        <HomeBanner />
      </section>
      <section>
        <AssuranceSection />
      </section>
      <section>
        <PopularCategories />
      </section>
      <section>
        <NewArrivals />
      </section>
      <BestSelling/>
      <section>
        <DiscountProduct/>
      </section>
    </main>
  );
}
