import React from "react";

export default function BannerAllPro() {
  return (
    <section className="container w-full pt-14 mx-auto flex ">
      <div className="conatiner mx-auto w-full max-w-[1200px] flex  relative flex-col items-start py-16 pr-20 pl-7 rounded-[25px] overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9abc4629e1f0fc8ace9ddce348de792b87d2f7e0bd14a9b5fa5c16c7fa600e76?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
          alt="Background image"
          className="mx-auto absolute inset-0 w-full h-full rounded-[25px] "
        />
        <p className="relative text-4xl font-bold tracking-tighter text-neutral-700 max-md:text-2xl">
          <span className="text-[32px] text-[rgba(60,60,60,1)]">
            You're choosing the{" "}
          </span>
          <span className="text-[32px] text-secondary">Right</span>
          <span className="text-[32px] text-[rgba(60,60,60,1)] block">
            place to buy your favorite thing.
          </span>
        </p>
        <h1 className="relative mt-16 text-7xl font-extrabold text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl xl:text-[70px]">
          Apple iMac
        </h1>
      </div>
    </section>
  );
}
