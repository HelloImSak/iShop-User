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
    <section className="relative p-4 sm:p-6 md:p-8 rounded-3xl bg-[#0E1F48] min-h-[400px] sm:min-h-[450px] md:min-h-[430px] flex flex-col px-[32px] mx-[100px] items-center">
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
