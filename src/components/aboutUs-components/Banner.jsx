import React from "react";

const Banner = () => {
  return (
    <section className="overflow-hidden pt-4 pl-16 rounded-3xl bg-neutral-100 max-md:pl-5 mx-[50px]">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[48%] max-md:ml-0 max-md:w-full">
          <BannerContent />
        </div>
        <div className="ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <BannerImage />
        </div>
      </div>
    </section>
  );
};
function BannerContent() {
  return (
    <article className="flex flex-col justify-center items-start self-stretch h-[470px] w-full max-md:mt-10 max-md:max-w-full">
      <h1 className="self-stretch text-4xl font-bold text-blue-950 max-md:max-w-full">
        Welcome to iShop – Your Ultimate Tech Destination!
      </h1>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/552ad159bf5a52f8a307fef046abeac3c478bf65f05491367186fb78e52936b5?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
        alt="iShop banner graphic"
        className="object-contain mt-5 max-w-full aspect-[6.54] w-[600px]"
      />
      <button className="bg-primary text-white px-4 py-2  mt-7 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-secondary text-sm sm:text-lg">
        Shop Now
      </button>
    </article>
  );
}
function BannerImage() {
  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/63da7c2c8aa5825125e7a0bf0d77c5612bebf4d4141bd3e5132ae5ce72d84387?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
      alt="Tech products showcase"
      className="object-cover grow w-[80%]  max-md:mt-10 max-md:max-w-full"
    />
  );
}
export default Banner;
