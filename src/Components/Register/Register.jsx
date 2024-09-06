import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(values) {
    setIsLoading(true);
    setApiError("");
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token); 
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response?.data?.message || "An error occurred");
      });
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(15, "Max length is 15")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password should be between 6 and 10 characters"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {apiError && (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 mb-4">
          {apiError}
        </div>
      )}
      <div className="my-8">
        <h2 className="text-2xl text-center text-emerald-600 font-bold">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto py-2">
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              id="name"
              className={`block py-2.5 px-0 w-full text-sm ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : "border-white"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white peer text-white`}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className={`block py-2.5 px-0 w-full text-sm ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-white"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white peer text-white`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email Address
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className={`block py-2.5 px-0 w-full text-sm ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-500"
                  : "border-white"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white peer text-white`}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className={`block py-2.5 px-0 w-full text-sm ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-white"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white peer text-white`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className={`block py-2.5 px-0 w-full text-sm ${
                formik.errors.rePassword && formik.touched.rePassword
                  ? "border-red-500"
                  : "border-white"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white peer text-white`}
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re-enter Your Password
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="text-red-500 text-sm">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
