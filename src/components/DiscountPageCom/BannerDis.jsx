import React from "react";

export default function BannerDis() {
  return (
    <main className="flex justify-center">

      <section className="mt-9 w-full max-w-[1340px] max-md:max-w-full ">
        <div className="flex gap-5 max-md:flex-col">
          <HeadphonePromo />
          <SpeakerPromo />
        </div>
      </section>
    </main>
  );
}

function HeadphonePromo() {
  return (
    <article className="overflow-hidden relative bg-gray-200 rounded-3xl h-[550px] w-[963px] max-md:w-full max-md:h-auto max-md:min-h-[400px] max-sm:min-h-[300px]">
      <div>
        <h2 className="absolute text-4xl font-bold text-black left-[49px] top-[49px] max-md:text-3xl max-sm:text-2xl">
          Beat Solo
        </h2>
        <h3 className="absolute text-8xl font-extrabold text-black left-[49px] top-[103px] max-md:text-6xl max-sm:text-5xl">
          Wireless
        </h3>
        <div className="absolute left-[49px] top-[219px]">
          <span className="text-xl font-bold text-black">Up to</span>
          <span className="ml-11 text-8xl font-bold text-blue-400 max-md:text-6xl max-sm:text-5xl">
            30%
          </span>
          <span className="ml-7 text-xl font-bold text-black">Off</span>
        </div>
        <p className="absolute text-9xl font-extrabold text-white left-[49px] top-[350px] max-md:text-7xl max-md:top-[280px] max-sm:text-5xl max-sm:top-[220px]">
          HEADPHONE
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/69a5bc490837e9a80ba63f758730f85c232a0aef"
        className="absolute top-0 h-[580px] right-[-185px] w-[991px] max-md:right-0 max-md:w-full max-md:h-auto"
        alt="Wireless Headphones"
      />
    </article>
  );
}

function SpeakerPromo() {
  return (
    <article className="overflow-hidden relative bg-gray-200 rounded-3xl h-[550px] w-[350px] max-md:w-full max-md:h-auto max-md:min-h-[400px] max-sm:min-h-[300px]">
      <div className="flex gap-3 self-start text-base font-semibold text-red-600 pt-4 ps-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d8062fa0e11c492cba1ae1f699040999/9539f2029241c3f37a0fdc8e126a1d2b542e31d414d41c9e4780c9f65a7bf5e0?placeholderIfAbsent=true"
          alt="Hot offer icon"
          className="object-contain shrink-0 w-6 aspect-square "
        />
        <p>Hot Offer</p>
      </div>

      <div className="absolute text-5xl font-bold text-blue-400 right-[70px] top-[54px]">
        <span>50%</span>
        <span className="ml-3 text-xl text-black">Off</span>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85247679f97bd96fb65974684a17eba25c476c4a"
        className="absolute h-[180px] left-[30px] top-[107px] w-[280px]"
        alt="JBL Speaker"
      />

      <h2 className="absolute text-6xl font-extrabold text-white left-[18px] top-[305px] max-md:text-5xl max-sm:text-4xl">
        SPEAKER
      </h2>

      <footer className="absolute left-0 px-12 py-0 bottom-[60px] max-sm:px-5 max-sm:py-0">
        <h3 className="mb-2 text-base font-bold text-slate-800">
          Home Speacker
        </h3>
        <p className="mb-3 text-sm text-gray-500">JBL</p>
        <div className="flex gap-7 items-center">
          <p className="text-2xl font-bold text-zinc-800 max-sm:text-lg">
            $666.00
          </p>
          <p className="text-base font-bold text-gray-500 line-through max-sm:text-sm">
            $1332.00
          </p>
        </div>
      </footer>
    </article>
  );
}
