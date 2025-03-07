
import React from 'react'
import CardDisCom from '../cart/CardDisCom';
import { useGetAllQuery } from '../../redux/features/product/productSlice';

  
  export default function DiscountProduct() {
      const { data: proDis, isLoading, isError } = useGetAllQuery();
      console.log("Data:", proDis);
    return (
      <>
        <h1 className="text-4xl text-primary text-center font-OpenSanBold mb-10">Discount Products</h1>
        <div className="w-full lg:w-3/4">
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-28 gap-5">
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
                        ))}
                      </div>
                    </div>
    
      </>
    );

  }