import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import "./HomeBanner.css";
import img1 from "../../assets/HomeBannerImages/img1.png";
import img2 from "../../assets/HomeBannerImages/img2.png";
import img3 from "../../assets/HomeBannerImages/img3.png";
import img4 from "../../assets/HomeBannerImages/img4.png";

const HomeBanner = () => {
  const bgColors = ["#FAE8FF", "#E3DCDB", "#B9DCF7", "#A9A9A9"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let nextButton = document.getElementById("next");
    let prevButton = document.getElementById("prev");
    let carousel = document.querySelector(".carousel");
    let listHTML = document.querySelector(".carousel .list");

    const showSlider = (type) => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";

      carousel.classList.remove("next", "prev");
      let items = document.querySelectorAll(".carousel .list .item");

      if (type === "next") {
        listHTML.appendChild(items[0]);
        setActiveIndex((prev) => (prev + 1) % bgColors.length); // Update active slide index
        carousel.classList.add("next");
      } else {
        listHTML.prepend(items[items.length - 1]);
        setActiveIndex(
          (prev) => (prev - 1 + bgColors.length) % bgColors.length
        ); // Update active slide index
        carousel.classList.add("prev");
      }

      setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    };

    nextButton.onclick = () => showSlider("next");
    prevButton.onclick = () => showSlider("prev");
  },);

  return (
    <div
      className="carousel"
      style={{
        backgroundColor: bgColors[activeIndex], // Dynamically changing background color
        transition: "background-color 0.5s ease-in-out", // Smooth transition
      }}
    >
      <div className="list">
        <div className="item">
          <img
            src={img1}
            alt="Slide 1"
            className="responsive-img1 w-auto h-auto object-contain "
          />
          <div className="introduce ">
            <div className="title ">
              Most comfortable 2025 PS4 gaming headset
            </div>
            <div className="topic">HeadPhone</div>
            <div className="des">
              Experience ultimate comfort and immersive sound with the HyperX
              Cloud III Wireless gaming headset.
              <button className="bg-primary hover:bg-accent_1 block mt-4 text-white font-semibold py-2 px-5 rounded-[8px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="item ">
          <img
            src={img2}
            alt="Slide 2"
            className="responsive-img2 w-auto h-auto object-contain "
          />
          <div className="introduce w-2000">
            <div className="title">
              Most comfortable 2025 PS4 gaming headset
            </div>
            <div className="topic">HeadPhone</div>
            <div className="des">
              Experience ultimate comfort and immersive sound with the HyperX
              Cloud III Wireless gaming headset.
              <button className="bg-primary hover:bg-accent_1 block mt-4 text-white font-semibold py-2 px-5 rounded-[8px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="item">
          <img
            src={img3}
            alt="Slide 3"
            className="responsive-img3 h-auto w-huto object-contain  "
          />
          <div className="introduce">
            <div className="title">
              Most comfortable 2025 PS4 gaming headset
            </div>
            <div className="topic">HeadPhone</div>
            <div className="des">
              Experience ultimate comfort and immersive sound with the HyperX
              Cloud III Wireless gaming headset.
              <button className="bg-primary hover:bg-accent_1 block mt-4 text-white font-semibold py-2 px-5 rounded-[8px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="w-full flex justify-center">
            <img
              src={img4}
              alt="Slide 4"
              className="responsive-img4 w-auto h-auto object-contain "
            />
          </div>
          <div className="introduce">
            <div className="title">
              Most comfortable 2025 PS4 gaming headset
            </div>
            <div className="topic">HeadPhone</div>
            <div className="des">
              Experience ultimate comfort and immersive sound with the HyperX
              Cloud III Wireless gaming headset.
              <button className="bg-primary hover:bg-accent_1 block mt-4 sm-mt-2 text-white font-semibold py-2 px-5 rounded-[8px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="arrows">
        <button
          id="prev"
          className="2xl:ps-5 xl:ps-3 lg:ps-3 md:ps-3 sm:ps-[7px]  text-gray-500 "
        >
          <FaArrowLeft />
        </button>
        <button
          id="next"
          className="2xl:ps-5 xl:ps-3 lg:ps-3 md:ps-3 sm:ps-[7px] text-gray-500 "
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
