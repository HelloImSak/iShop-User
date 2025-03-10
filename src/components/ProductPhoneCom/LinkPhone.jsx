import React from 'react'
import BannerPhone from './BannerPhone';
import FilterCom from '../DiscountPageCom/FilterCom';



export default function LinkPhone() {
    const [price, setPrice] = useState(4950);
    const { data: brandData, isLoading, isError } = useGetAllBrandQuery();
  return (
   <main>
    <BannerPhone/>
    <FilterCom/>
       <div className="container mx-auto pt-[32px] px-[100px]">
           <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">Top Category</h1>
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
       </div>
   </main>
   
  )
}
