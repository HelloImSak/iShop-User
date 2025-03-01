import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Logo from "../../assets/logo/ishop-dark-logo.png";
import { useGetLoginMutation } from "../../redux/features/auth/authSlice";

const SignInCom = ({ setIsLoggedIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [getLogin, { isLoading, error }] = useGetLoginMutation(); // Use RTK Query Mutation

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
        }).unwrap(); // API call
        console.log("Login Response:", accessTokenData);

        // Assuming response contains token or success message
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
          toast.error("Login failed. Please try again.");
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Login failed! Check your credentials.");
      }
    },
  });

  return (
    <div className="font-OpenSan flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div>
          <h5 className="font-OpenSanBold text-h5 mb-3 text-primary">
            Welcome Back!
          </h5>
          <a href="/">
            <img
              src={Logo}
              alt="Logo"
              className="sm:visible md:hidden h-12 mx-auto mb-6"
            />
          </a>
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <form className="space-y-7" onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Remember me Checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:border hover:border-primary hover:bg-white hover:text-primary"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInCom;
