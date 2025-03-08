import React from "react";
import laptop from "../../assets/BestSellingImages/laptop.png"
import phone from "../../assets/PopularCategories/phoneCategory.png"
import headphone from "../../assets/HomeBannerImages/img1.png"
import mouse from "../../assets/PopularCategories/mouseCategory.png"
import keyboard from "../../assets/PopularCategories/keyboardCategory.png"
import speaker from "../../assets/BestSellingImages/speaker1.png"

const Banner = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center rounded-[25px] mx-[100px]">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome to iShop – Your Ultimate Tech Destination!
        </h1>
        <p className="text-gray-700 mt-4">
          At iShop, we are passionate about technology and innovation. Our goal
          is to make the latest and best electronic products accessible to
          everyone at affordable prices. Whether you’re a tech lover, a
          professional, or just need reliable gadgets, we’ve got you covered!
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <div className="grid grid-cols-3 gap-4">
          <img
            src={mouse}
            alt="mouse"
            className="w-28 md:w-32 lg:w-40 2xl:w-56"
          />
          <img
            src={phone}
            alt="Phone"
            className="w-24 md:w-32 lg:w-40 2xl:w-56"
          />
          <img
            src={headphone}
            alt="Speaker"
            className="w-24 md:w-28 lg:w-30 2xl:w-50"
          />
          <img
            src={laptop}
            alt="Laptop"
            className="w-28 md:w-32 lg:w-40 2xl:w-56"
          />
          <img
            src={keyboard}
            alt="keyboard"
            className="w-28 md:w-32 lg:w-36 2xl:w-46"
          />
          <img
            src={speaker}
            alt="speaker"
            className="w-28 md:w-32 lg:w-40 2xl:w-48"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
