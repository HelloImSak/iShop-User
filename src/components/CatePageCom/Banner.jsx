import React from 'react'

export default function Banner() {
  return (
<main className='flex justify-center mx-[50px]'>
<main lassName=" flex-col items-start px-16 pt-16 pb-5 mt-12 w-full rounded-xl bg-blue-950 max-w-[1340px] max-md:px-5 max-md:mt-10 max-md:max-w-full  mx-[100px]">
    <div className="bg-primary w-full max-w-[1300px] max-md:max-w-full p-[30px] rounded-[20px] ">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start mt-8 w-full max-md:mt-10 max-md:max-w-full">
            <h1 className="self-stretch text-5xl font-semibold tracking-widest leading-[60px] text-neutral-50 max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
              Enhance Your Music Experience
            </h1>
            <div className="flex justify-center md:justify-start space-x-4 mb-6">
            <div className="bg-white text-black px-4 py-2 rounded-full text-center">
              <p className="text-xl font-bold">23</p>
              <p className="text-sm">Hours</p>
            </div>
            <div className="bg-white text-black px-4 py-2 rounded-full text-center">
              <p className="text-xl font-bold">05</p>
              <p className="text-sm">Days</p>
            </div>
            <div className="bg-white text-black px-4 py-2 rounded-full text-center">
              <p className="text-xl font-bold">59</p>
              <p className="text-sm">Minutes</p>
            </div>
            <div className="bg-white text-black px-4 py-2 rounded-full text-center">
              <p className="text-xl font-bold">35</p>
              <p className="text-sm">Seconds</p>
            </div>
          </div>
            <button className="gap-2.5  px-12 py-4 mt-10 text-2xl font-semibold leading-none bg-red-600 rounded-lg hover:bg-red-500 text-neutral-50 max-md:px-5">
              Buy Now!
            </button>
          </div>
        </div>
        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/d8062fa0e11c492cba1ae1f699040999/5d67be095cbbc27a74a59aab4d7c311706bde3af005471f6180b6847bbc5f3cc?placeholderIfAbsent=true"
            className="object-contain w-full aspect-[1.82] max-md:mt-10 max-md:max-w-full"
            alt="Headphones"
          />
        </div>
      </div>
    </div>
      
    </main>
</main>
  )
}
