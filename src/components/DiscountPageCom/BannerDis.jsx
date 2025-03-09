import React from "react";

export default function BannerDis() {
  return (
    <main className="flex justify-center">
      <section className="mt-9 w-full max-w-[1425px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <HeadphonePromo />
          <SpeakerPromo />
        </div>
      </section>
    </main>
  );
}

function HeadphonePromo() {
  return (
    <article className="relative overflow-hidden bg-gray-200 rounded-3xl h-[550px] w-full lg:w-3/4 max-md:h-auto max-md:min-h-[400px] max-sm:min-h-[300px]">
      <div className="p-8">
        <h2 className="text-4xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
          Beat Solo
        </h2>
        <h3 className="text-8xl font-extrabold text-black max-md:text-6xl max-sm:text-5xl">
          Wireless
        </h3>
        <div className="mt-6">
          <span className="text-xl font-bold text-black">Up to</span>
          <span className="ml-4 text-8xl font-bold text-blue-400 max-md:text-6xl max-sm:text-5xl">
            30%
          </span>
          <span className="ml-4 text-xl font-bold text-black">Off</span>
        </div>
        <p className="mt-6 text-9xl font-extrabold text-white max-md:text-7xl max-sm:text-5xl">
          HEADPHONE
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/69a5bc490837e9a80ba63f758730f85c232a0aef"
        className="absolute top-0 right-0 h-[580px] w-auto max-md:h-auto max-md:w-full"
        alt="Wireless Headphones"
      />
    </article>
  );
}

function SpeakerPromo() {
  return (
    <article className="relative overflow-hidden bg-gray-200 rounded-3xl h-[550px] w-full lg:w-1/4 max-md:h-auto max-md:min-h-[400px] max-sm:min-h-[300px] flex flex-col justify-between p-6">
      <div className="flex items-center gap-3 text-red-600 text-base font-semibold">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d8062fa0e11c492cba1ae1f699040999/9539f2029241c3f37a0fdc8e126a1d2b542e31d414d41c9e4780c9f65a7bf5e0?placeholderIfAbsent=true"
          alt="Hot offer icon"
          className="w-6 h-6"
        />
        <p>Hot Offer</p>
      </div>

      <div className="text-5xl font-bold text-blue-400">
        <span>50%</span>
        <span className="ml-3 text-xl text-black">Off</span>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85247679f97bd96fb65974684a17eba25c476c4a"
        className="h-[180px] mx-auto"
        alt="JBL Speaker"
      />

      <h2 className="text-6xl font-extrabold text-white max-md:text-5xl max-sm:text-4xl text-center">
        SPEAKER
      </h2>

      <footer className="text-center">
        <h3 className="text-base font-bold text-gray-800">Home Speaker</h3>
        <p className="text-sm text-gray-500">JBL</p>
        <div className="flex justify-center gap-4 mt-2">
          <p className="text-2xl font-bold text-gray-800">$666.00</p>
          <p className="text-base font-bold text-gray-500 line-through">
            $1332.00
          </p>
        </div>
      </footer>
    </article>
  );
}
