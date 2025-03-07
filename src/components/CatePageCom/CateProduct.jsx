import React from 'react'
import CardCom from '../cart/CardCom'
import { useGetAllQuery } from '../../redux/features/product/productSlice';

export default function CateProduct(  ) {
 const { data: proCate , isLoading, isError } = useGetAllQuery();
  console.log("data", proCate);
  return (
    <div className="container mx-auto pt-[32px] ">
    <h1 className="flex justify-center text-h1 font-semibold mb-4">Top Category</h1>
    {/* section1 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
    {proCate?.content?.map((e) => (
      <CardCom
          key={e?.uuid}
          thumbnail={e?.thumbnail}
          name={e?.name}
          brand={e?.brand?.name}
          price={e?.priceOut}
        />
      ))}
    
    </div>
   
    <h1 className="flex justify-center text-h1 font-semibold mb-4">Category Products</h1>
    {/* section2 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
    {proCate?.content?.map((e) => (
      <CardCom
          key={e?.uuid}
          thumbnail={e?.thumbnail}
          name={e?.name}
          brand={e?.brand?.name}
          price={e?.priceOut}
        />
      ))}
    
    </div>  
    <h1 className="flex justify-center text-h1 font-semibold mb-4">New Arrivals</h1>
    {/* section3 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
    {proCate?.content?.map((e) => (
      <CardCom
          key={e?.uuid}
          thumbnail={e?.thumbnail}
          name={e?.name}
          brand={e?.brand?.name}
          price={e?.priceOut}
        />
      ))}
    
    </div>  
    <h1 className="flex justify-center text-h1 font-semibold mb-4">Popular Product</h1>
    {/* section4 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
    {proCate?.content?.map((e) => (
      <CardCom
          key={e?.uuid}
          thumbnail={e?.thumbnail}
          name={e?.name}
          brand={e?.brand?.name}
          price={e?.priceOut}
        />
      ))}
    
    </div>  
  </div>
  )
}
