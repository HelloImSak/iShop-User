import React from "react";
import phone from "../../assets/BestSellingImages/phone.png";
import laptop from "../../assets/BestSellingImages/laptop.png";
import speaker from "../../assets/BestSellingImages/speaker.png";

const BestSellingProducts = () => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl text-primary text-center font-OpenSanBold mb-10">
        Best Selling Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Laptop Section */}
        <div className="bg-gray-900 text-white rounded-lg p-6 flex flex-col items-start space-y-4 relative overflow-hidden">
          <img src={laptop} alt="Laptop" className="w-[250px] mx-auto" />
          <p className="text-lg font-semibold">
            Unleash Power & Performance – New Arrival Laptops Are Here!
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
            Shop Now
          </button>
        </div>
        {/* Smartphone Section */}
        <div className="bg-gray-900 text-white rounded-lg p-6 flex flex-col items-start space-y-4">
          <img src={phone} alt="Smartphones" className="w-[380px] mx-auto" />
          <p className="text-lg font-semibold" >Experience Innovation – New Arrival Smartphones Are Here!</p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
            Shop Now
          </button>
        </div>
        {/* Speaker Section */}
        <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col items-center md:items-start space-y-4 md:col-span-2">
          <img src={speaker} alt="Speakers" className="w-full max-w-[500px] mx-auto" />
          <p className="text-lg font-semibold text-center md:text-left">
            Unleash Powerful Sound – Experience the ultimate audio with our best-selling speakers.
          </p>
          <button className=" bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
