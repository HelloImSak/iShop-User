import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useUserRegisterMutation } from "../../redux/features/auth/authSlice";
import { useUploadImageMutation } from "../../redux/features/images/imgSlice";

const Register = () => {
  const [userRegister, { isLoading, error }] = useUserRegisterMutation();
  const [uploadImage] = useUploadImageMutation();

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
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        )
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

        const res = await userRegister({
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

        console.log("Registration success:", res);
        toast.success("Sign Up Successful!", {
          icon: "✅",
        });
        resetForm();
      } catch (err) {
        console.error("Registration failed:", err);
        setErrors({ email: err?.data?.message || "Registration failed." });
        toast.error("Sign Up failed. Please try again.");
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
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* ... Logo and header content ... */}

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
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.username) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber} // Fixed from values.username
                  onChange={formik.handleChange}
                  placeholder="Phone Number"
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.phoneNumber) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.email) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Password"
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.password) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="Confirm Password"
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.confirmPassword)
                      ? "bg-[#e8f0fe]"
                      : ""
                  }`}
                />
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
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.addressLine1) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6">
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                  placeholder="Address Line 2"
                  required
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs ${
                    isFilled(formik.values.addressLine2) ? "bg-[#e8f0fe]" : ""
                  }`}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="text"
                  id="road"
                  name="road"
                  value={formik.values.road}
                  onChange={formik.handleChange}
                  placeholder="Road"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <input
                  type="text"
                  id="linkAddress"
                  name="linkAddress"
                  value={formik.values.linkAddress}
                  onChange={formik.handleChange}
                  placeholder="Link Address"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                />
              </div>

              <div className="col-span-6">
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={handleFileChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                />
              </div>

              {/* ... Marketing checkbox and terms ... */}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                  disabled={formik.isSubmitting || isLoading} // Fixed from isSubmitting
                >
                  {formik.isSubmitting || isLoading
                    ? "Registering..."
                    : "Register"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
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
