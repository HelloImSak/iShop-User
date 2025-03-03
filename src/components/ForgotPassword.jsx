import React from "react";
import { FaArrowRight } from "react-icons/fa"; 

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="shadow flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
  <div className="w-[400px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:border dark:border-gray-700">
    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
      Forget Password
    </h2>
        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Please enter your email address, and we'll send you a link
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enter your email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            className="w-full h-70 mt-2 p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full h-70 mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            aria-label="Send reset link"
          >
            Send code <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;