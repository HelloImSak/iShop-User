import phone from "../../assets/PopularCategories/phoneCategory.png";
import laptop from "../../assets/PopularCategories/laptopCategory.png";
import headphone from "../../assets/PopularCategories/headPhoneCategory.png";
import mouse from "../../assets/PopularCategories/mouseCategory.png";
import keyboard from "../../assets/PopularCategories/keyboardCategory.png";

const products = [
  { name: "Phone", image: phone },
  { name: "Laptop", image: laptop },
  { name: "Headphone", image: headphone },
  { name: "Mouse", image: mouse },
  { name: "Keyboard", image: keyboard }
];

export default function PopularCategories() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl  text-primary text-center font-OpenSanBold mb-8 pt-[30px]">
        Popular Categories
      </h1>
      <div className=" flex justify-center w-full px-[50px] pt-[30px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 w-full ">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transition-transform transform duration-700 ease-in-out hover:scale-110 w-full"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48  md:h-48 2xl:w-64 2xl:h-64 object-contain drop-shadow-xl"
              />
              <h3 className="mt-4 text-gray-700 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
