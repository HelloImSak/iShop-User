import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import logo from "../../assets/logo/ishop-light-logo.png";
import { useGetLoginMutation } from "../../redux/features/auth/authSlice";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Ill from "../../assets/auth/login.png";

const LoginForm = ({ setIsLoggedIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [getLogin, { isLoading, error }] = useGetLoginMutation();

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter a valid email"),
      password: Yup.string()
        .min(8, "Please enter at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const accessTokenData = await getLogin({
          email: values.email,
          password: values.password,
        }).unwrap(); 

        if (accessTokenData.accessToken) {
          localStorage.setItem("accessToken", accessTokenData.accessToken);
          localStorage.setItem(
            "userData",
            JSON.stringify(accessTokenData.user)
          );

          toast.success("Login Successful!", {
            icon: "✅",
          });
          setIsLoggedIn(true);

          navigate("/");
        } else {
          setLoginError("Login failed. Please try again.");
          toast.error("Login failed. Please try again.");
        }
      } catch (err) {
        const errorMessage =
          err?.data?.message || "Invalid email or password. Please try again.";
        setLoginError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // const handleGoogleLogin = async (response) => {
  //   try {
  //     const googleToken = response?.credential; // Get the Google token from the response
  //     if (googleToken) {
  //       // Send the Google token to the backend for verification
  //       const accessTokenData = await getLogin({
  //         googleToken,
  //       }).unwrap(); // Replace with the actual API call to authenticate via Google

  //       if (accessTokenData.accessToken) {
  //         // Store access token and user data in localStorage
  //         localStorage.setItem("accessToken", accessTokenData.accessToken);
  //         localStorage.setItem(
  //           "userData",
  //           JSON.stringify(accessTokenData.user)
  //         );

  //         toast.success("Google Login Successful!", { icon: "✅" });
  //         setIsLoggedIn(true);
  //         navigate("/"); // Redirect to home or dashboard
  //       }
  //     }
  //   } catch (err) {
  //     toast.error("Google login failed. Please try again.");
  //   }
  // };

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section - Top on small screens, Right on medium+ */}
        <div className="order-1 md:order-last w-full md:w-2/5 bg-indigo-800 p-6 flex items-center justify-center min-h-[200px] md:min-h-full">
          <div className="relative w-full h-full max-h-96 md:max-h-full">
            <div className="absolute top-0 left-0">
              <img src={logo} alt="Logo" className="w-[100px] md:w-[200px]" />
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={Ill}
                alt="Login Illustration"
                className="w-[200px] md:w-[300px] lg:w-[350px]"
              />
            </div>
          </div>
        </div>

        {/* Form Section - Bottom on small screens, Left on medium+ */}
        <div className="order-2 md:order-first md:w-3/5 p-6 md:p-8">
          <div className="mb-10">
            <h2 className="text-h2 font-OpenSanBold text-gray-800">Login</h2>
            <div className="w-12 h-1 bg-primary mt-2"></div>
          </div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <div className="flex flex-col">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=" "
                    className={`peer w-full h-[50px] lg:h-[55px] rounded-md border-gray-200 text-[18px] text-gray-700 shadow-xs ${
                      isFilled(formik.values.email) && !formik.errors.email
                        ? "bg-[#e8f0fe]"
                        : "bg-white"
                    }`}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-[18px] rounded-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Email
                  </label>
                </div>

                {/* Fixed height box for the error message */}
                <div className="h-[10px]">
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                  {loginError && !formik.errors.email && (
                    <div className="text-red-500 text-sm">{loginError}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full h-[50px] lg:h-[55px] rounded-md border-gray-200 text-[18px] text-gray-700 shadow-xs pr-10 ${
                    isFilled(formik.values.password) && !formik.errors.password
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                  required
                />
                {/* Floating Label */}
                <label
                  htmlFor="password"
                  className="absolute left-3 text-[18px] rounded-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Password
                </label>

                {/* Eye Toggle */}
                <button
                  type="button"
                  className="absolute right-3 lg:top-7 md:top-[26px] top-[27px] transform -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>

              {/* Fixed height error message area */}
              <div className="h-[20px] mt-1">
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
                {loginError &&
                  !formik.errors.email &&
                  !formik.errors.password && (
                    <div className="text-red-500 text-sm">{loginError}</div>
                  )}
              </div>
            </div>

            {/* Remember me Checkbox and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-primary focus:ring-3 focus:outline-hidden"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-gray-500">
              Don’t have an account yet?{" "}
              <a href="/register" className="text-blue-600 underline">
                Sign up
              </a>
            </p>
          </form>
          {/* google */}
          <div className="flex items-center justify-center space-x-2 my-5">
            <span className="h-px w-16 bg-gray-100"></span>
            <span className="text-gray-300 font-normal">or</span>
            <span className="h-px w-16 bg-gray-100"></span>
          </div>
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecode = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponseDecode);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
