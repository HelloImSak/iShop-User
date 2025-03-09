import React from "react";

const Banner = () => {
  return (
      <div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
        <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">Welcome to iShop</span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-indigo-600">Our Shop</span>
            </h2>
            <p class="text-gray-700">
            At iShop, our mission is to make the latest technology accessible to everyone. We provide high-quality gadgets at affordable prices while ensuring a seamless shopping experience. Our goal is to connect people with the best tech solutions for their needs.
            </p>
        </div>
    </div>
</div>
  );
};

export default Banner;
