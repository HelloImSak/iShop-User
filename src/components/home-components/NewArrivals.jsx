import React from 'react'
import { useGetAllQuery } from "../../redux/features/product/productSlice";
import CardCom from "../cart/CardCom"
  
  export default function NewArrivals() {
    
  if (isLoading) {
    return (
      <div className="flex justify-center animate-pulse text-6xl">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center animate-pulse text-6xl">
        {error.message}
      </div>
    );
  }
    return (
      <main className="flex justify-center ">
      <h1 className="text-4xl text-primary text-center font-OpenSanBold mb-10">Discount Products</h1>
      <section className="grid grid-cols-3">
        {products?.contents?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
        ))}
      </section>
    </main>
    );

  }
  
