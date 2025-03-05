import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useUserRegisterMutation } from "../../redux/features/auth/authSlice";
import { useUploadImageMutation } from "../../redux/features/images/imgSlice";

import { useNavigate } from "react-router";
import ResPic from "../../assets/auth/register.png";
import Logo from "../../assets/logo/ishop-dark-logo.png";

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

  const handleFileChange = (e) => {
    formik.setFieldValue("profile", e.target.files[0]);
  };

  const isFilled = (value) => {
    // Improved logic to handle different input types consistently
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true; // For file inputs
    return false;
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative hidden lg:block lg:col-span-5 xl:col-span-6">
          <img
            src={ResPic}
            alt="E-commerce Banner"
            className="absolute inset-0 h-full w-full object-contain px-5"
          />
          <div className="absolute inset-0 flex justify-center bg-primary bg-opacity-30">
            <div className="text-white mt-6">
              <img src={Logo} alt="" className="w-[200px] mx-auto" />
              <h2 className="text-3xl font-bold mb-4 text-center">
                Join Us Today!
              </h2>
              <p className="text-lg">
                Sign up to explore exclusive deals and start shopping with ease.
              </p>
            </div>
          </div>
        </aside>

        <main className="items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full">
            <h1 className="text-center mt-6 text-h1 font-OpenSanBold text-gray-900 sm:text-h2 md:text-h1">
              Sign Up
            </h1>

            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Username"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber} // Fixed from values.username
                  onChange={formik.handleChange}
                  placeholder="Phone Number"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.password) &&
                    !formik.errors.phoneNumber
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-accent_1 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="Confirm Password"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200  text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.confirmPassword) &&
                    !formik.errors.phoneNumber
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="text-accent_1 text-sm">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              {/* Added missing address fields */}
              <div className="col-span-6">
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange}
                  placeholder="Address Line 1"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                  placeholder="Address Line 2"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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
                <input
                  type="text"
                  id="road"
                  name="road"
                  value={formik.values.road}
                  onChange={formik.handleChange}
                  placeholder="Road"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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
                <input
                  type="text"
                  id="linkAddress"
                  name="linkAddress"
                  value={formik.values.linkAddress}
                  onChange={formik.handleChange}
                  placeholder="Link Address"
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-xs ${
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

              <div className="col-span-6">
                Your profile
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                />
                {formik.errors.profile && formik.touched.profile && (
                  <div className="text-accent_1 text-sm">
                    {formik.errors.profile}
                  </div>
                )}
              </div>

              {/* ... Marketing checkbox and terms ... */}

              <div className="col-span-6">
                <button
                  type="submit"
                  className="inline-block w-full shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                  disabled={formik.isSubmitting || isLoading} // Fixed from isSubmitting
                >
                  {formik.isSubmitting || isLoading
                    ? "Registering..."
                    : "Register"}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                  Already have an account?
                  <a href="/login" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
