// import React from "react";

// export default function Banner() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0E1F48] p-8">
//       {/* Icon */}
//       <div className="flex flex-col items-center justify-center text-6xl text-yellow-400 mb-6"></div>

//       {/* Heading */}
//       <h1 className="text-4xl font-OpenSanBold text-white mb-4">
//         Find Your Perfect Laptop
//       </h1>

//       {/* Description */}
//       <h2 className="text-2xl font-OpenSanBold text-[#EF7D34] mb-8 text-center">
//         -Shop Now With Ease
//       </h2>

//       <p className="text-[#EF7D34] text-lg font-OpenSanBold">Go to Shop  </p>
//     </div>

//   );
// }

// import React from "react";
// import LogoApple from "../../assets/apple-logo.png"; // Ensure the path is correct

// export default function Banner() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1B3A] p-8">
//       {/* Banner Section */}
//       <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0E1F48] p-8 rounded-lg shadow-lg">
//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-white mb-4">
//           Find Your Perfect Laptop
//         </h1>

//         {/* Description */}
//         <h2 className="text-2xl font-semibold text-[#EF7D34] mb-8 text-center">
//           - Shop Now With Ease -
//         </h2>

//         {/* Shop Button */}
//         <a
//           href="#"
//           className="text-[#EF7D34] text-lg font-semibold hover:underline flex items-center gap-1"
//         >
//           Go to Shop →
//         </a>
//       </div>

//       {/* Apple Logo Section */}
//       <div className="mt-8 flex flex-col items-center">
//         <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center">
//           <img
//             src={LogoApple} // Ensure this is correct
//             alt="Apple Logo"
//             className="w-16 h-16"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function Banner() {
  return (
    <div className="w-[1747px] max-w-full h-[480px] sm:h-[400px] md:h-[450px] lg:h-[480px] bg-[#0E1F48] p-4 sm:p-6 md:p-10 rounded-lg shadow-lg mx-auto flex flex-col items-center">
  {/* Content Here */}
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        Find Your Perfect Laptop
      </h1>

      {/* Description */}
      <h2 className="text-2xl font-bold text-[#EF7D34] mb-8 text-center">
        - Shop Now with Ease
      </h2>

      {/* Product Section */}
      <div className="flex flex-wrap justify-end gap-4">
        {[
          { img: "/path-to-your-image/laptop.png", label: "Laptop" },
          { img: "/path-to-your-image/all-items.png", label: "All Item" },
          { img: "/path-to-your-image/laptop.png", label: "Laptop" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg text-center w-48"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-24 h-24 mx-auto mb-4"
            />
            <p className="text-white text-lg font-semibold">{item.label}</p>
            <button className="mt-3 px-4 py-2 border-2 border-[#EF7D34] text-[#EF7D34] rounded hover:bg-[#EF7D34] hover:text-white transition">
              Shop Now
            </button>
          </div>
        ))}
      </div>

      {/* Apple Logo & Shop Link */}
      <div className="mt-8 flex justify-between items-center w-full max-w-md">
        <div className="w-32 h-32 bg-gray-500 rounded-full flex items-center justify-center">
          <img
            src="/path-to-your-logo/apple-logo.png"
            alt="Apple Logo"
            className="w-20 h-20"
          />
        </div>
        <p className="text-[#EF7D34] text-lg font-bold cursor-pointer hover:underline">
          Go to Shop →
        </p>
      </div>
    </div>
  );
}
