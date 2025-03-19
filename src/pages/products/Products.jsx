import React from "react";
import CardCom from "../../components/cart/CardCom";

export default function Products({ products, productLoading, productError }) {
  if (!products) return <p className="text-h1">Loading...</p>; // Handle loading case
  console.log("Products Data:", products);

  if (productLoading) return <p className="text-h1">Loading...</p>;
  if (productError) return <p className="text-h2">Failed to load product.</p>;

  // Check if the data and content are present before trying to map
  return (
    <main className="grid grid-cols-3 items-center justify-between h-screen pt-32">
      {products?.content?.map((e) => (
        <CardCom
          key={e?.uuid}
          thumbnail={e?.thumbnail}
          name={e?.name}
          brand={e?.brand?.name}
          price={e?.priceOut}
        />
      ))}
    </main>
  );
}