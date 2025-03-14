import React from "react";

export default function BannerAllPro() {
  return (
    <section className="flex justify-center py-10 mx-[50px] sm:mx-[20px] ">
      <div className="w-full rounded-3xl bg-[#E2DEDB] p-10 flex flex-row items-center gap-6">
        {/* Left Section - Text */}
        <div className="w-[40%] ">
          <h2 className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-[16px] font-semibold text-gray-700">
            You're choose the{" "}
            <span className="text-orange-500 font-bold">Right</span> place to buy your favorite thing.
          </h2>
          <h1 className="2xl:text-7xl xl:text-6xl lg:text-4xl md:text-3xl sm:text-3xl  font-extrabold text-gray-900 mt-4">
            Apple iMac
          </h1>
        </div>

        {/* Right Section - iMac Image */}
        <div className="w-[60%] ">
          <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9abc4629e1f0fc8ace9ddce348de792b87d2f7e0bd14a9b5fa5c16c7fa600e76?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
            alt="Apple iMacs"
            className="w-full sm-w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
