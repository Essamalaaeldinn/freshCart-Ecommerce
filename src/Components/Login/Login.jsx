import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const { userLogin, setUserLogin } = useContext(UserContext); // Correctly access the context
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(values) {
    setIsLoading(true);
    setApiError("");
    axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
        .then((res) => {
            setIsLoading(false);
            if (res.data.message === "success") {
                const userToken = res.data.token;                 
                localStorage.setItem("userToken", userToken);
                setUserLogin(userToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                navigate("/");
            }
        })
        .catch((error) => {
            setIsLoading(false);
            setApiError(error.response?.data?.message || "An error occurred");
        });
}

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password should be between 6 and 10 characters"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
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
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto py-2">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className={`block text-slate-100 py-2.5 px-0 w-full text-sm ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className={`block py-2.5 text-slate-100 px-0 w-full text-sm ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <Link to={"/register"}>
              <span className="text-blue-500">Don't have an account? <span className="font-bold text-emerald-600 hover:underline">Register now</span> </span>
            </Link>
            <Link  to={"/forgetpassword"}>
               <span className="font-bold text-emerald-600 hover:underline">Forget Password</span> 
            </Link>
          </div>
        </form>
       
      </div>
    </>
  );
}