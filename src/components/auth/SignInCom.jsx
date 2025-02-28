import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInCom = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              name="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInCom;
