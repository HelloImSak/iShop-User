// import React, { useState } from "react";
// import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
// import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

// export default function FilterCom() {
//   const [price, setPrice] = useState(4950);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const { data: brandData, isLoading, isError } = useGetAllBrandQuery();

//   const proList = ["Phone", "Laptop", "Desktop", "Keyboard", "Mouse", "Speaker", "Headphone"];

//   if (isLoading) return <aside className="w-1/4 rounded-lg">Loading...</aside>;
//   if (isError) return <aside className="w-1/4 rounded-lg">Error loading brands</aside>;

//   return (
//     <div className="relative">
//       {/* Filter Button (For Small Screens) */}
//       <button
//         onClick={() => setIsFilterOpen(!isFilterOpen)}
//         className="lg:hidden flex items-center bg-primary text-white py-2 px-4 rounded-md text-lg font-semibold"
//       >
//         <HiOutlineFilter className="text-xl mr-2" />
//         <span>Filter</span>
//         {isFilterOpen ? <HiChevronUp className="ml-2 text-xl" /> : <HiChevronDown className="ml-2 text-xl" />}
//       </button>

//       Filter Dropdown (Floating on Small Screens) & Sidebar (Large Screens)
//       <aside
//         className={`absolute top-12 left-0 w-[300px] bg-white shadow-lg rounded-lg p-5 z-50 transition-all duration-300 ${
//           isFilterOpen ? "block" : "hidden"
//         } lg:block lg:relative lg:top-0 lg:w-1/6 lg:max-w-[300px]`}
//       >
//         <h3 className="font-semibold text-[20px] text-primary mb-3">Product Categories</h3>
//         <ul className="space-y-2 text-[16px] text-gray-600">
//           {proList.map((category) => (
//             <li key={category} className="flex items-center">
//               <input type="checkbox" id={category} className="mr-2 h-4 w-4 checked:bg-blue-500" />
//               <label htmlFor={category}>{category}</label>
//             </li>
//           ))}
//         </ul>

//         <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">Product Brands</h3>
//         <ul className="space-y-2 text-[16px] text-gray-600">
//           {brandData?.content?.map((brand) => (
//             <li key={brand.uuid} className="flex items-center">
//               <input type="checkbox" id={brand.uuid} className="mr-2 h-4 w-4 checked:bg-blue-500" />
//               <label htmlFor={brand.uuid}>{brand.name}</label>
//             </li>
//           ))}
//         </ul>

//         <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">Choose Price</h3>
//         <input
//           type="range"
//           min="20"
//           max="4950"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="w-[250px] h-2 bg-secondary rounded-full appearance-none"
//         />
//         <div className="flex justify-between text-[16px] font-bold mt-2">
//           <span>$20</span>
//           <span>${price}</span>
//         </div>
//       </aside>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FilterCom() {
  const [price, setPrice] = useState(4950);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: brandData, isLoading, isError } = useGetAllBrandQuery();

  const proList = ["Phone", "Laptop", "Desktop", "Keyboard", "Mouse", "Speaker", "Headphone"];

  if (isLoading) return <aside className="w-1/4 rounded-lg">Loading...</aside>;
  if (isError) return <aside className="w-1/4 rounded-lg">Error loading brands</aside>;

  return (
    <div className="relative">
      {/* Filter Button (For Small Screens) */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center bg-primary text-white py-2 px-4 rounded-md text-lg font-semibold"
      >
        <HiOutlineFilter className="text-xl mr-2" />
        <span>Filter</span>
        {isFilterOpen ? <HiChevronUp className="ml-2 text-xl" /> : <HiChevronDown className="ml-2 text-xl" />}
      </button>

      {/* Filter Dropdown (Visible on small screens only) */}
      <aside
        className={`absolute top-12 left-0 w-[300px] bg-white shadow-lg rounded-lg p-5 z-50 transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        } lg:block lg:relative lg:top-0 lg:w-1/6 lg:max-w-[300px]`}
      >
        <h3 className="font-semibold text-[20px] text-primary mb-3">Product Categories</h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {proList.map((category) => (
            <li key={category} className="flex items-center">
              <input type="checkbox" id={category} className="mr-2 h-4 w-4 checked:bg-blue-500" />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">Product Brands</h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {brandData?.content?.map((brand) => (
            <li key={brand.uuid} className="flex items-center">
              <input type="checkbox" id={brand.uuid} className="mr-2 h-4 w-4 checked:bg-blue-500" />
              <label htmlFor={brand.uuid}>{brand.name}</label>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">Choose Price</h3>
        <input
          type="range"
          min="20"
          max="4950"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-[250px] h-2 bg-secondary rounded-full appearance-none"
        />
        <div className="flex justify-between text-[16px] font-bold mt-2">
          <span>$20</span>
          <span>${price}</span>
        </div>
      </aside>
    </div>
  );
}
