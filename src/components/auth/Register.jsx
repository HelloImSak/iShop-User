import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useUserRegisterMutation } from "../../redux/features/auth/authSlice";
import { useUploadImageMutation } from "../../redux/features/images/imgSlice";

import { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo/ishop-light-logo.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Ill from "../../assets/auth/register.png";

const Register = () => {
  const [userRegister, { isLoading, error }] = useUserRegisterMutation();
  const [uploadImage] = useUploadImageMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      addressLine1: "",
      addressLine2: "",
      road: "",
      linkAddress: "",
      profile: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must not exceed 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters")
        .required("Username is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(8, "Phone Number must be 8 to 16 numbers")
        .required("Phone Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().required("Address Line 2 is required"),
      road: Yup.string().required("Road is required"),
      linkAddress: Yup.string().required("Link Address is required"),
      profile: Yup.mixed().required("Profile picture is required"), // Changed to mixed for file input
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append("file", values.profile);

        const imageResponse = await uploadImage(formData).unwrap();
        console.log("Image uploaded successfully:", imageResponse);

        await userRegister({
          username: values.username,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          address: {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            road: values.road,
            linkAddress: values.linkAddress,
          },
          profile: imageResponse.uri,
        }).unwrap();
        toast.success("Please verify your Email!", {
          icon: "✅",
        });
        resetForm();
        navigate(`/verify-email?email=${values.email}`);
      } catch (err) {
        console.error("Registration failed:", err);

        const errorMessage =
          err?.data?.error?.description || "Registration failed.";

        if (errorMessage.includes("Email or username already exists")) {
          setErrors({ email: errorMessage });
          toast.error(errorMessage);
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue("profile", file);
    }
  };

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="w-full md:w-2/5 bg-indigo-800 p-6 flex items-center justify-center min-h-[200px] md:min-h-full">
          <div className="relative w-full h-full max-h-96 md:max-h-full">
            <div className="absolute top-0 left-0 ">
              <div className="flex items-center">
                <img src={logo} alt="logo" className="md:w-[200px] w-[100px]" />
              </div>
            </div>

            <div className="w-full h-full flex justify-center items-center">
              <img
                src={Ill}
                alt=""
                className="w-[200px] md:w-[300px] lg:[350px]"
              />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-3/5 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Registration</h2>
              <div className="w-12 h-1 bg-primary mt-2"></div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.username) && !formik.errors.username
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-gray-700">PhoneNumber</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber} // Fixed from values.username
                onChange={formik.handleChange}
                placeholder="Phone Number"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.phoneNumber) &&
                  !formik.errors.phoneNumber
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>

            <div className="col-span-6">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.email) && !formik.errors.phoneNumber
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.password) && !formik.errors.phoneNumber
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              <button
                type="button"
                className="absolute right-2 top-9 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
              {formik.errors.password && formik.touched.password && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                placeholder="Confirm Password"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200  text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.confirmPassword) &&
                  !formik.errors.phoneNumber
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              <button
                type="button"
                className="absolute right-2 top-9 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="text-accent_1 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* Added missing address fields */}
            <div className="col-span-6">
              <label className="block text-gray-700">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                placeholder="Address Line 1"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.addressLine1) &&
                  !formik.errors.addressLine1
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.addressLine1 && formik.touched.addressLine1 && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.addressLine1}
                </div>
              )}
            </div>

            <div className="col-span-6">
              <label className="block text-gray-700">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
                placeholder="Address Line 2"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.addressLine2) &&
                  !formik.errors.addressLine2
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.addressLine2 && formik.touched.addressLine2 && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.addressLine2}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-gray-700">The Road</label>
              <input
                type="text"
                id="road"
                name="road"
                value={formik.values.road}
                onChange={formik.handleChange}
                placeholder="Road"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.road) && !formik.errors.road
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.road && formik.touched.road && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.road}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-gray-700">Google Map</label>
              <input
                type="text"
                id="linkAddress"
                name="linkAddress"
                value={formik.values.linkAddress}
                onChange={formik.handleChange}
                placeholder="Link Address"
                onBlur={formik.handleBlur}
                required
                className={`mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                  isFilled(formik.values.linkAddress) &&
                  !formik.errors.linkAddress
                    ? "bg-[#e8f0fe]"
                    : "bg-white"
                }`}
              />
              {formik.errors.linkAddress && formik.touched.linkAddress && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.linkAddress}
                </div>
              )}
            </div>

            <div className="col-span-3">
              <label
                htmlFor="profile"
                className="block text-sm font-medium text-gray-700"
              >
                Your profile
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                required
                className="mt-1 w-full h-[40px] lg:h-[45px] rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              />

              {formik.errors.profile && formik.touched.profile && (
                <div className="text-accent_1 text-sm">
                  {formik.errors.profile}
                </div>
              )}
              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Preview:</p>
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="h-28 w-28 rounded-full object-cover border transition-transform duration-300 hover:scale-125"
                  />
                </div>
              )}
            </div>

            <div className="col-span-6 space-y-2">
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
                    By registering, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="inline-block w-full shrink-0 rounded-md border border-primary bg-blue-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-primary hover:text-white focus:ring-3 focus:outline-hidden"
                disabled={formik.isSubmitting || isLoading} // Fixed from isSubmitting
              >
                {formik.isSubmitting || isLoading
                  ? "Loading..."
                  : "Next Step 👉"}
              </button>

              <p className="mt-4 text-sm text-gray-500">
                Already have an account?
                <a
                  href="/login"
                  className="text-primary text-caption underline ml-3"
                >
                  Log in
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
