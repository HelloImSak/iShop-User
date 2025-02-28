import { HiShoppingBag } from "react-icons/hi";
import FooterComponent from "./FooterComponent";
import NavbarTwoComponent from "./NavbarTwoComponent";

export default function NotFoundProductCom() {
  return (
    <>
      <header>
        <NavbarTwoComponent />
      </header>
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center mt-30">
        <HiShoppingBag className="w-32 h-32 text-gray-400 sm:w-40 sm:h-40 md:w-48 md:h-48" />
        <p className="text-gray-500 mt-4 text-base sm:text-lg md:text-xl font-medium">
          No products were found matching your selection.
        </p>
      </div>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
}
