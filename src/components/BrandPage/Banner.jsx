import React from "react";
import Allphone from "../../assets/Apple/AllApple.png";
import Headphone from "../../assets/Apple/Headphone.png";
import LogoApple from "../../assets/Apple/Logo-Apple.png";
import MacBook from "../../assets/Apple/Macbook.png";

const SectionTitle = ({ children }) => (
  <h1 className="mb-2 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
    {children}
  </h1>
);

const SectionSubtitle = ({ children }) => (
  <h2 className="mb-4 text-xs sm:text-base md:text-lg lg:text-xl font-bold text-[#EF7D34] text-center">
    {children}
  </h2>
);

const ShopCard = ({ image, altText, title }) => {
  return (
    <div className="flex flex-col items-center bg-[#1E2A44] p-2 sm:p-3 md:p-4 lg:p-5 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 w-[90px] sm:w-[110px] md:w-[130px] lg:w-[200px]">
      <img
        src={image}
        alt={altText}
        className="h-[50px] sm:h-[60px] md:h-[70px] lg:h-[100px] w-auto mb-2 object-contain"
      />
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white mb-2 text-center">
        {title}
      </h3>
      <button className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 bg-transparent border border-orange-400 text-orange-400 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-orange-400 hover:text-white transition duration-300">
        Shop Now
      </button>
    </div>
  );
};

const AppleSection = () => {
  return (
    <aside className="flex flex-col items-center">
      <div className="flex justify-center items-center rounded-full bg-gray-300 h-[100px] sm:h-[120px] md:h-[140px] lg:h-[180px] w-[100px] sm:w-[120px] md:w-[140px] lg:w-[180px] mb-4">
        <img
          src={LogoApple}
          alt="Apple Products"
          className="h-[60px] sm:h-[70px] md:h-[90px] lg:h-[110px] w-auto object-contain"
        />
      </div>
      <button className="flex gap-2 items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-orange-400 cursor-pointer hover:underline hover:text-orange-500 transition duration-300">
        <span>Go to Shop</span>
        {/* <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl" aria-hidden="true">➔</span> */}
      </button>
    </aside>
  );
};

const Banner = () => {
  const cardData = [
    { image: Headphone, altText: "Headphones", title: "Headphones" },
    { image: Allphone, altText: "All Items", title: "All Items" },
    { image: MacBook, altText: "Laptop", title: "Laptop" },
  ];

  return (
    <section className="relative p-4 sm:p-6 md:p-8 pt-[32px] rounded-3xl bg-[#0E1F48] min-h-[400px] sm:min-h-[450px] md:min-h-[430px] flex flex-col mx-[100px] items-center">
      <div className="w-full max-w-[1200px]">
        <header className="text-center">
          <SectionTitle>Find Your Perfect Laptop</SectionTitle>
          <SectionSubtitle>– Shop Now with Ease</SectionSubtitle>
        </header>

        {/* Responsive Layout for Logo & Cards */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 mt-4">
          <AppleSection />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {cardData.map((card, index) => (
              <ShopCard
                key={index}
                image={card.image}
                altText={card.altText}
                title={card.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;





// import React, { useState } from "react";
// import Allphone from "../../assets/Apple/AllApple.png";
// import LogoApple from "../../assets/Apple/Logo-Apple.png";
// import HeadPhone from "../../assets/Apple/HeadPhone.png";
// import MacBook from "../../assets/Apple/MacBook.png";

// const SectionTitle = ({ children }) => (
//   <h1 className="mb-2 text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-white text-center">
//     {children}
//   </h1>
// );

// const SectionSubtitle = ({ children }) => (
//   <h2 className="mb-3 text-[10px] sm:text-xs md:text-base lg:text-xl font-bold text-[#EF7D34] text-center">
//     {children}
//   </h2>
// );

// const ShopCard = ({ image, altText, title, description }) => {
//   return (
//     <div className="flex flex-col items-center bg-[#1E2A44] p-1 sm:p-2 md:p-3 lg:p-5 rounded-xl shadow-lg transform transition-transform duration-300 hover:bg-[#2A3B5A] hover:shadow-xl w-[70px] sm:w-[90px] md:w-[110px] lg:w-[200px]">
//       <img
//         src={image}
//         alt={altText}
//         className="h-[35px] sm:h-[45px] md:h-[60px] lg:h-[100px] w-auto mb-1 sm:mb-2 object-contain transition-opacity duration-300 hover:opacity-80"
//       />
//       <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-semibold text-white mb-1 sm:mb-2 text-center transition-colors duration-300 hover:text-gray-200">
//         {title}
//       </h3>
//       <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-base text-gray-300 mb-1 sm:mb-2 text-center hidden md:block transition-opacity duration-300 hover:opacity-80">
//         {description}
//       </p>
//       <button className="px-2 py-1 sm:px-3 sm:py-1 md:px-3 md:py-2 lg:px-5 lg:py-3 bg-transparent border border-orange-400 text-orange-400 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm lg:text-lg hover:bg-orange-500 hover:text-white transition duration-300">
//         Shop Now
//       </button>
//     </div>
//   );
// };

// const AppleSection = () => {
//   return (
//     <aside className="flex flex-col items-center">
//       <div className="flex justify-center items-center rounded-full bg-gray-300 h-[70px] sm:h-[90px] md:h-[100px] lg:h-[180px] w-[70px] sm:w-[90px] md:w-[100px] lg:w-[180px] mb-2 sm:mb-3 transition-transform duration-300 hover:scale-105">
//         <img
//           src={LogoApple}
//           alt="Apple Products"
//           className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[110px] w-auto object-contain transition-opacity duration-300 hover:opacity-80"
//         />
//       </div>
//       <button className="flex gap-1 items-center text-[12px] sm:text-sm md:text-base lg:text-xl font-bold text-orange-400 cursor-pointer hover:underline hover:text-orange-500 transition duration-300">
//         <span>Go to Shop</span>
//       </button>
//     </aside>
//   );
// };

// const Banner = () => {
//   const bgColors = ["#0E1F48", "#1E2A44", "#2A3B5A", "#3C4E7A"];
//   const [activeColorIndex] = useState(0);

//   const cardData = [
//     {
//       image: HeadPhone,
//       altText: "Headphones",
//       title: "Headphones",
//       description: "Immersive sound with ultimate comfort.",
//     },
//     {
//       image: Allphone,
//       altText: "All Items",
//       title: "All Items",
//       description: "Explore our full range of products.",
//     },
//     {
//       image: MacBook,
//       altText: "Laptop",
//       title: "Laptop",
//       description: "Powerful performance in sleek design.",
//     },
//   ];

//   return (
//     <section
//       className="p-2 sm:p-3 md:p-6 lg:p-8 rounded-3xl min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col items-center transition-background duration-500 ease-in-out w-full [@media(min-width:1025px)]:mx-[100px] [@media(min-width:1025px)]:px-[100px]"
//       style={{ backgroundColor: bgColors[activeColorIndex] }}
//     >
//       <div className="w-full max-w-[1200px]">
//         <header className="text-center">
//           <SectionTitle>Find Your Perfect Laptop</SectionTitle>
//           <SectionSubtitle>– Shop Now with Ease</SectionSubtitle>
//         </header>

//         <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-3 md:gap-6 lg:gap-14 mt-2 sm:mt-3">
//           <AppleSection />
//           <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-12">
//             {cardData.map((card, index) => (
//               <ShopCard
//                 key={index}
//                 image={card.image}
//                 altText={card.altText}
//                 title={card.title}
//                 description={card.description}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;



// import React from "react";
// import Allphone from "../../assets/Apple/AllApple.png";
// import Headphone from "../../assets/Apple/Headphone.png";
// import LogoApple from "../../assets/Apple/Logo-Apple.png";
// import MacBook from "../../assets/Apple/Macbook.png";

// const SectionTitle = ({ children }) => (
//   <h1 className="mb-2 text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-white text-center">
//     {children}
//   </h1>
// );

// const SectionSubtitle = ({ children }) => (
//   <h2 className="mb-3 text-[10px] sm:text-xs md:text-base lg:text-xl font-bold text-[#EF7D34] text-center">
//     {children}
//   </h2>
// );

// const ShopCard = ({ image, altText, title }) => {
//   return (
//     <div className="flex flex-col items-center bg-[#1E2A44] p-1 sm:p-2 md:p-3 lg:p-5 rounded-xl shadow-lg transform transition-transform duration-300 hover:bg-[#2A3B5A] hover:shadow-xl w-[70px] sm:w-[90px] md:w-[110px] lg:w-[200px]">
//       <img
//         src={image}
//         alt={altText}
//         className="h-[35px] sm:h-[45px] md:h-[60px] lg:h-[100px] w-auto mb-1 sm:mb-2 object-contain transition-opacity duration-300 hover:opacity-80"
//       />
//       <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-semibold text-white mb-1 sm:mb-2 text-center transition-colors duration-300 hover:text-gray-200">
//         {title}
//       </h3>
//       <button className="px-2 py-1 sm:px-3 sm:py-1 md:px-3 md:py-2 lg:px-5 lg:py-3 bg-transparent border border-orange-400 text-orange-400 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm lg:text-lg hover:bg-orange-400 hover:text-white transition duration-300">
//         Shop Now
//       </button>
//     </div>
//   );
// };

// const AppleSection = () => {
//   return (
//     <aside className="flex flex-col items-center">
//       <div className="flex justify-center items-center rounded-full bg-gray-300 h-[70px] sm:h-[90px] md:h-[100px] lg:h-[180px] w-[70px] sm:w-[90px] md:w-[100px] lg:w-[180px] mb-2 sm:mb-3 transition-transform duration-300 hover:scale-105">
//         <img
//           src={LogoApple}
//           alt="Apple Products"
//           className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[110px] w-auto object-contain transition-opacity duration-300 hover:opacity-80"
//         />
//       </div>
//       <button className="flex gap-1 items-center text-[12px] sm:text-sm md:text-base lg:text-xl font-bold text-orange-400 cursor-pointer hover:underline hover:text-orange-500 transition duration-300">
//         <span>Go to Shop</span>
//       </button>
//     </aside>
//   );
// };

// const Banner = () => {
//   const cardData = [
//     { image: Headphone, altText: "Headphones", title: "Headphones" },
//     { image: Allphone, altText: "All Items", title: "All Items" },
//     { image: MacBook, altText: "Laptop", title: "Laptop" },
//   ];

//   return (
//     <section className="relative p-2 sm:p-3 md:p-6 lg:p-8 rounded-3xl bg-[#0E1F48] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col items-center w-full [@media(min-width:1025px)]:mx-[100px]">
//       <div className="w-full max-w-[1200px]">
//         <header className="text-center">
//           <SectionTitle>Find Your Perfect Laptop</SectionTitle>
//           <SectionSubtitle>– Shop Now with Ease</SectionSubtitle>
//         </header>

//         {/* Responsive Layout for Logo & Cards */}
//         <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-3 md:gap-6 lg:gap-14 mt-2 sm:mt-3">
//           <AppleSection />
//           <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-12">
//             {cardData.map((card, index) => (
//               <ShopCard
//                 key={index}
//                 image={card.image}
//                 altText={card.altText}
//                 title={card.title}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;