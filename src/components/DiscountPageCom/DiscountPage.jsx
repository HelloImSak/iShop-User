import React from "react";
import FilterCom from "./FilterCom";
import CardDisCom from "../cart/CardDisCom";
import { useGetAllQuery } from "../../redux/features/product/productSlice";
import BannerDis from "./BannerDis";
export default function DiscountPage() {
  const { data: proDis, isLoading, isError } = useGetAllQuery();
  console.log("Data:", proDis);

  return (
    <>
      <main className="min-h-screen pt-8 md:pt-16">
        <BannerDis/>
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl">
            Best Price Products
          </h2>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filter */}
            <FilterCom />

<<<<<<< HEAD
              <h3 className="font-semibold  text-[20px] text-primary mt-5 mb-3">
                Product Brands
              </h3>
              <ul className="space-y-2 text-[16px] text-gray-600">
                {[
                  "Apple",
                  "Asus",
                  "Msi",
                  "Samsung",
                  "Acer",
                  "Lenovo",
                  "Asus",
                  "Microsoft",
                  "Sony",
                  "Vivo",
                  "Oppo",
                  "Beat",
                  "JBL",
                  "Sharper",
                  "TECKNET",
                ].map((brand) => (
                  <li key={brand}>
                    <input
                      type="checkbox"
                      id={brand}
                      className="mr-[10px] mt-2 w-[17px]"
                    />
                    <label htmlFor={brand}>{brand}</label>
                  </li>
=======
            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {proDis?.content?.map((e) => (
                  <CardDisCom
                    key={e?.uuid}
                    thumbnail={e?.thumbnail}
                    name={e?.name}
                    brand={e?.brand?.name}
                    priceOut={e?.priceOut}
                    dis={e?.discount}
                    disPrice={(
                      e.priceOut -
                      (e.priceOut * e.discount) / 100
                    ).toFixed(2)}
                  />
>>>>>>> 875fb0faff22803dd341ade2a0c8ea061420d342
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
