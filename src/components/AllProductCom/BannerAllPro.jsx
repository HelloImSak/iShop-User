import React from "react";

export default function BannerAllPro() {
  return (
    <div className="pt-[32px] px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] xl:px-[100px]">
      <section className="flex overflow-hidden relative flex-col items-start py-16 pr-20 pl-7 rounded-[25px] min-h-[377px] max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9abc4629e1f0fc8ace9ddce348de792b87d2f7e0bd14a9b5fa5c16c7fa600e76?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
          alt="Background image"
          className="object-cover absolute inset-0 size-full"
        />
        <p className="relative text-4xl font-bold tracking-tighter text-neutral-700">
          <span className="text-[32px] text-[rgba(60,60,60,1)]">
            You're choosing the{" "}
          </span>
          <span className="text-[32px] text-secondary">Right</span>
          <span className="text-[32px] text-[rgba(60,60,60,1)] block">
            {" "}
            place to buy your favorite thing.
          </span>
        </p>
        <h1 className="relative mt-16 text-7xl font-extrabold text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl xl:text-[70px]">
          Apple iMac
        </h1>
      </section>
    </div>
  );
}
