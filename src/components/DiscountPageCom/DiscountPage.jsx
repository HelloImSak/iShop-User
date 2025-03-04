import React from "react";
import { BsCart3 } from "react-icons/bs";
export default function DiscountPage() {
  const products = [
    {
      id: 1,
      name: "  Beats Studio Pro",
      brand: "Beat",
      price: 38.0,
      originalPrice: 42.22,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097",
      discount: "10%",
    },
    {
      id: 2,
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://inspireonline.in/cdn/shop/files/iPhone_16_Pro_Max_Natural_Titanium_PDP_Image_Position_1__en-IN_441741be-ad4f-42f1-879b-d8f7ff570473.jpg?v=1727250678&width=1445",
      discount: "10%",
    },
    {
      id: 3,
      name: "JBL Xtreme 3",
      brand: "JBL",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://uk.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcbb4fd11/1_JBL_BOOMBOX_3_HERO_BLACK_33216_x2.png?sw=400&sh=400&sm=fit&sfrm=png",
      discount: "10%",
    },
    {
      id: 4,
      name: "Asus ZenBook 14 OLED",
      brand: "Asus",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://dlcdnwebimgs.asus.com/gain/26b2a6c1-fa0f-4de9-87e7-3cbde6b4fd77/",
      discount: "10%",
    },
    {
      id: 5,
      name: "Sony WH-CH520",
      brand: "Sony",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://img.tatacliq.com/images/i10/437Wx649H/MP000000017346208_437Wx649H_202304251122161.jpeg",
      discount: "10%",
    },
    {
      id: 6,
      name: "Predator Aethon PKW120",
      brand: "Acer",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://i5.walmartimages.com/asr/d5989ba2-abb6-43f4-90cc-8eff27f4879a.cd5946fc3610e1b8751b59821e98ae41.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      discount: "10%",
    },
    {
      id: 7,
      name: "ThinkCentre M70q Gen5",
      brand: "Lenovo",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://p4-ofp.static.pub/fes/cms/2022/04/05/k79u5akx2r8xbxud71yn5ogf2s8mp0348065.png",
      discount: "10%",
    },
    {
      id: 8,
      name: "Sasung Galaxy S25 Ultra",
      brand: "Samsung",
      price: 1199.0,
      originalPrice: 1332.0,
      image:
        "https://app-area.riointernational.com.bd/productImages/1738403480BRk6I.png",
      discount: "10%",
    },
    {
      id: 9,
      name: "Lenovo Yoga Pro Mouse",
      brand: "Lenovo",
      price: 1199.0,
      originalPrice: 1332.0,
      image: "https://www.rootitsupport.com/userfiles/GY51P14335-1.png",
      discount: "10%",
    },
  ];

  return (
    <>
      <main className=" min-h-screen">
        <div className="container mx-auto py-10 px-[100px]">
          <h2 className=" font-bold text-center mb-[40px] text-primary text-[40px]">
            Best Price Products
          </h2>

          <div className="flex gap-5">
            <aside className="w-1/4 p-5 rounded-lg">
              <h3 className="font-semibold  text-[20px] text-primary mb-3">
                Product Categories
              </h3>
              <ul className="space-y-2  text-[16px] text-gray-600">
                {[
                  "Laptop",
                  "Desktop",
                  "Keyboard",
                  "Mouse",
                  "Speaker",
                  "Headphone",
                ].map((category) => (
                  <li key={category}>
                    <input type="checkbox" id={category} className="mr-2" />
                    <label htmlFor={category}>{category}</label>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold  text-[20px] text-primary mt-5 mb-3">
                Product Brands
              </h3>
              <ul className="space-y-2 text-[16px] text-gray-600">
                {[
                  "Apple",
                  "Asus",
                  "Msi",
                  "Samsung",
                  "Acer",
                  "Lenovo",
                  "Asus",
                  "Microsoft",
                  "Sony",
                  "Vivo",
                  "Oppo",
                  ,
                  "Beat",
                  "JBL",
                  "Sharper",
                  "TECKNET",
                ].map((brand) => (
                  <li key={brand}>
                    <input
                      type="checkbox"
                      id={brand}
                      className="mr-[10px] mt-2 w-[17px]"
                    />
                    <label htmlFor={brand}>{brand}</label>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-[20px]  text-primary mt-5 mb-3">
                Choose Price
              </h3>
              <input type="range" min="20" max="9950" className="w-full" />
              <div className="flex justify-between text-[16px] font-bold mt-2">
                <span>$20</span>
                <span>$4950</span>
              </div>
            </aside>

            {/* Card */}
            <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-[30px] gap-y-[30px] ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[305px] h-[380px] max-w-sm bg-white border border-gray-200 rounded-[25px] shadow-lg px-5 relative mb-0 py-0"
                >
                  <div className="absolute top-5 left-5">
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                      {product.discount}
                    </span>
                  </div>
                  <a href="#">
                    <img
                      className=" mx-auto h-[250px]"
                      src={product.image}
                      alt={product.name}
                    />
                  </a>
                  <div className="px-1 pb-1 text-left">
                    <div className="flex items-center justify-between gap-2 mt-4 relative">
                      <a href="#">
                        <p className="text-[16px] font-bold text-primary inline">
                          {product.name}
                        </p>
                      </a>
                      <button className="bg-secondary text-white p-2 rounded-full">
                        <BsCart3 />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1 text-[14px]">
                      {product.brand}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-[18px] font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <del className="text-[15px] font-bold text-gray-600 mx-5">
                        ${product.originalPrice.toFixed(2)}
                      </del>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
