import "flowbite";
import { useState } from "react";
import { BsCart, BsMouse3 } from "react-icons/bs";
import { CiSpeaker } from "react-icons/ci";
import { FaRegKeyboard } from "react-icons/fa";
import { GiHeadphones } from "react-icons/gi";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosDesktop,
  IoIosLaptop,
  IoIosPhonePortrait,
} from "react-icons/io";
import Logo from "../../assets/logo/ishop-light-logo.png";
import Logo2 from "../../assets/logo/ishop-dark-logo.png";
import Profile from "../../assets/matra.jpg";

// Navigation Component that have background primary color and fixed on top

const NavTwoCom = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Placeholder data (replace with real data)
  const [cartItems, setCartItems] = useState(3);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <>
      {/* Main Navbar Container */}
      <div className="fixed left-0 w-full z-40 bg-primary">
        <nav className="relative py-2 flex justify-between items-center mx-[20px] md:mx-[50px] xl:mx-[100px]">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <div>
              <a className="text-3xl font-bold leading-none" href="#">
                <img
                  src={Logo}
                  alt="iShop Logo"
                  className="h-10 md:h-12 xl:h-16"
                />
              </a>
            </div>
            <div>
              {/* Desktop Menu */}
              <ul className="hidden lg:hidden 2xl:flex 2xl:items-center 2xl:space-x-6 xl:ml-10">
                <li>
                  <a
                    href="#"
                    className="block xl:font-OpenSanBold py-2 px-3 text-white hover:text-secondary"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center xl:font-OpenSanBold justify-between w-full py-2 px-3 text-white hover:text-secondary"
                  >
                    Categories
                    {isDropdownOpen ? (
                      <IoIosArrowUp className="w-5 h-5 ms-2.5 transition-transform duration-300" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5 ms-2.5 transition-transform duration-300" />
                    )}
                  </button>
                  {isDropdownOpen && (
                    <div className="z-10 absolute bg-white/50 backdrop-blur-md divide-y w-[400px] divide-gray-100 rounded-xl shadow-sm mt-[20px]">
                      <ul className="py-2 text-sm text-primary">
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <IoIosPhonePortrait className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2 ">
                              Phone
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between  hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <IoIosLaptop className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2">
                              Laptop
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between  hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <IoIosDesktop className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2">
                              Desktop
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between  hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <FaRegKeyboard className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2">
                              Keyboard
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between  hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <BsMouse3 className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2">
                              Mouse
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between  hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <CiSpeaker className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2">
                              Speaker
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px]" />
                        </li>
                        <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                          <div className="flex items-center gap-2.5">
                            <GiHeadphones className="w-[26px] h-[26px]" />
                            <a href="#" className="block px-4 py-2 ">
                              Headphone
                            </a>
                          </div>
                          <IoIosArrowForward className="w-[18px] h-[18px] hover:text-secondary" />
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 xl:font-OpenSanBold text-white hover:text-secondary"
                  >
                    Brand
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 xl:font-OpenSanBold text-white hover:text-secondary"
                  >
                    Discount
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 xl:font-OpenSanBold text-white hover:text-secondary"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile: Cart/Profile or Login + Hamburger */}
          <div className="flex items-center gap-10">
            {/* Mobile Login/Cart/Profile (Visible only on mobile) */}
            <div className="lg:hidden flex items-center gap-6">
              {/* Add search icon here */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white text-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-5">
                  <a href="/cart" className="relative">
                    <BsCart className="text-white text-xl hover:text-secondary" />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                        {cartItems}
                      </span>
                    )}
                  </a>
                  <a href="/profile">
                    <img
                      src={Profile}
                      alt="profile"
                      className="w-8 h-8 rounded-full border"
                    />
                  </a>
                </div>
              ) : (
                <button
                  className="text-white text-sm border border-white rounded-xl px-3 py-1 hover:bg-primary hover:text-white"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>
            {/* Mobile Search Popup */}
            {isSearchOpen && (
              <div className="fixed top-14 left-0 right-0 z-50 p-4 bg-white shadow-md">
                <div className="flex items-center">
                  <form onSubmit={(e) => e.preventDefault()} className="flex-1">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search your product..."
                        className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                        autoFocus
                      />
                    </div>
                  </form>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-3 text-gray-500"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Hamburger Button (Mobile , tablet) */}
            <div className="lg:hidden">
              <button
                className="navbar-burger flex items-center text-white font-OpenSanBold p-3"
                onClick={toggleMenu}
              >
                <svg
                  className="block h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Login/Cart/Profile */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {/* explore text when screen xl */}
            <div className="2xl:hidden">
              <button
                className="navbar-burger flex items-center text-white font-OpenSanBold p-3"
                onClick={toggleMenu}
              >
                Explore
              </button>
            </div>
            {/* Desktop Search Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-[400px] px-2"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search your product..."
                  className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                />
              </div>
            </form>

            {/* Desktop Login/Cart/Profile */}
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <a href="/cart" className="relative">
                  <BsCart className="text-white text-2xl hover:text-secondary" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {cartItems}
                    </span>
                  )}
                </a>
                <a href="/profile">
                  <img
                    src={Profile}
                    alt="profile"
                    className="w-12 h-12 rounded-full border"
                  />
                </a>
              </div>
            ) : (
              <button
                className="py-2 px-6 text-white border border-white rounded-xl  hover:text-white"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu (Sidebar) */}
        <div
          className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
        >
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white/50 backdrop-blur-md border-r overflow-y-auto z-50">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <img src={Logo2} alt="iShop Logo" className="h-9 ml-3" />
              </a>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-primary cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mb-6">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search your product..."
                  className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-sm border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                />
              </div>
            </form>
            {/* Mobile Menu Links */}
            <div>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    className="block p-4 text-sm font-semibold text-white hover:bg-blue-50 hover:text-primary rounded"
                  >
                    All Products
                  </a>
                </li>
                <li className="mb-1 relative">
                  <div
                    className="p-4 text-sm font-semibold text-white hover:bg-blue-50 hover:text-primary rounded cursor-pointer flex justify-between items-center"
                    onClick={toggleCategories}
                  >
                    Categories
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isCategoriesOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {isCategoriesOpen && (
                    <ul className="ml-4 bg-white/80 backdrop-blur-md rounded shadow-xl">
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <IoIosPhonePortrait className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Phone
                        </a>
                      </li>
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <IoIosLaptop className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Laptop
                        </a>
                      </li>
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <IoIosDesktop className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Desktop
                        </a>
                      </li>
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <FaRegKeyboard className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Keyboard
                        </a>
                      </li>
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <BsMouse3 className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Mouse
                        </a>
                      </li>
                      <li className="flex items-center rounded gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <CiSpeaker className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2">
                          Speaker
                        </a>
                      </li>
                      <li className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 justify-between hover:text-secondary">
                        <GiHeadphones className="w-[26px] h-[26px]" />
                        <a href="#" className="block px-4 py-2 ">
                          Headphone
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    className="block p-4 text-sm font-semibold text-white hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Brand
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    className="block p-4 text-sm font-semibold text-white hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Discount
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    className="block p-4 text-sm font-semibold text-white hover:bg-blue-50 hover:text-primary rounded"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Footer (No Login/Cart Here Anymore) */}
            <div className="mt-auto">
              <p className="my-4 text-xs text-center text-white">
                <span>Copyright © 2025 iShop</span>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavTwoCom;
