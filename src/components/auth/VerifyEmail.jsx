import React from "react";
import { FaArrowRight } from "react-icons/fa"; 

const VerifyEmail = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification code submitted");
  };

  const handleResendCode = () => {
    console.log("Resend code requested");
  };

  return (
    <div className="shadow-2xl flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Verify Your Email Address
        </h2>

        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Enter the 6-digit code sent to your email.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verification Code
              </label>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm text-blue-500 hover:underline dark:text-blue-500"
              >
                Resend Code
              </button>
            </div>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              placeholder="Enter verification code"
              className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            aria-label="Verify me"
          >
            Verify Me <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
