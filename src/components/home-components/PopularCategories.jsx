import phone from "../../assets/PopularCategories/phoneCategory.png"
import laptop from "../../assets/PopularCategories/laptopCategory.png"
import headphone from "../../assets/PopularCategories/headPhoneCategory.png"
import mouse from "../../assets/PopularCategories/mouseCategory.png"
import keyboard from "../../assets/PopularCategories/keyboardCategory.png"
const products = [
    {
        name: "Phone",
        image: phone,
      },
    {
      name: "Laptop",
      image: laptop,
    },
    {
      name: "Headphone",
      image: headphone,
    },
    {
      name: "Mouse",
      image: mouse,
    },
    {
      name: "Keyboard",
      image: keyboard,
    },
  ];
  
  export default function PopularCategories() {
    return (
      <>
        <h1 className="text-4xl text-primary text-center font-OpenSanBold mb-6">Popular Categories</h1>
        <div className="px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center w-full max-w-6xl">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transition-transform transform duration-700 ease-in-out hover:scale-110 w-full"
              >
                <img src={product.image} alt={product.name} className="relative w-full max-w-[200px] max-h-[200px] object-contain drop-shadow-lg" />
                <h3 className="absolute bottom-0 mt-2 text-gray-500 font-semibold text-lg">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </>
    );

  }
  