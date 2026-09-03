import AuthWelcomeSection from "@/Components/AuthWelcomeSection/AuthWelcomeSection";
import { AuthContext } from "@/Contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaSpinner,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";

export default function Login() {
  let [showEye,setShowEye]=useState(false)
  let [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState();
  let navigate = useNavigate();
  const {setToken}=useContext(AuthContext)

  const LoginSchema = z.object({
    email: z.string().min(1, "Email Is Required").email("Email is Not Valid"),
    password: z
      .string()
      .min(1, "Password Is Required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  });

  const { register, handleSubmit, formState } = useForm({
    // mode: "onBlur",
    // reValidateMode: "onSubmit",
  resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function sendLoginData(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        values,
      );
      console.log(response.data.data.token);
      localStorage.setItem('token',response.data.data.token)
      setToken(response.data.data.token)


      setLoading(false);
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            navigate("/posts");
          }, 1000);
        }
      });
      //response.data.message
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
      Swal.fire({
        title: "failure!!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  }
  return (
    <>
      <div className="lg:flex lg:min-h-screen">
        <AuthWelcomeSection signup_page={false} />
        <div className="h-screen lg:w-1/2 flex items-center">
          <div className="w-[90%] lg:w-[90%] xl:w-[80%] p-[40px] shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] text-center mx-auto rounded-xl">
            <h2 className="text-3xl font-bold mb-[10px]">Login</h2>
            <p className="mb-[20px]">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-blue-400 visited:text-blue-800"
              >
                sign up
              </Link>
            </p>
            {/* <div className="flex mt-[20px] gap-x-3 mb-[15px]">
              <button type="submit" className="w-1/2 border border-solid border-gray-200 rounded-xl h-fit py-[10px] text-base">
                <FaGoogle className="inline mr-[10px] text-red-500 text-lg" />
                Google
              </button>
              <button type="submit" className="w-1/2 border border-solid border-gray-200 rounded-xl h-fit py-[10px] bg-blue-500 text-amber-50 text-base">
                <FaFacebookF className="inline mr-[10px] text-amber-50" />
                Facebook
              </button>
            </div> */}

            <form className="text-left" onSubmit={handleSubmit(sendLoginData)}>
              <div className="flex mt-[10px] gap-x-3 text-center mb-[15px]">
                <button
                  type="submit"
                  className="w-1/2 border border-gray-200 rounded-xl py-[10px] text-base cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  <FaGoogle className="inline mr-[10px] text-red-500 text-lg" />
                  Google
                </button>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer border border-solid border-gray-200 rounded-xl h-fit py-[10px] bg-blue-500 text-amber-50 text-base transition-all duration-300 hover:scale-110"
                >
                  <FaFacebookF className="inline mr-[10px] text-amber-50" />
                  Facebook
                </button>
              </div>
              <p className="text-sm text-center text-gray-500">
                or continue with email
              </p>
              {/* //^==== Email ========================================================== */}
              <div className="mb-[25px]">
                <label htmlFor="email" className="mb-3 text-sm text-gray-800">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("email")}
                    className="w-full border border-solid border-gray-300 rounded-lg h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <MdEmail className="text-gray-400 absolute top-[17px] left-[15px] text-xl" />
                </div>
                {formState.errors.email && (
                  <p className="bg-red-400 p-1 pl-[10px] text-white">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
              {/* //^===== Password ========================================================== */}
              <div className="mb-[20px]">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("password")}
                    onChange={(e)=>e.target.value!=''?setShowEye(true):setShowEye(false)}
                    className="w-full border border-solid border-gray-300 rounded-lg h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                    id="password"
                    placeholder="create a strong password"
                    type={showPassword?'text':'password'}
                  />
                  {/* {showEye&&<FaEyeSlash/>} */}
                  {showPassword ? (
                    showEye&&
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:cursor-pointer absolute top-[17px] right-[15px] text-xl"
                    />
                  ) : 
                    showEye && <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:cursor-pointer absolute top-[17px] right-[15px] text-xl"
                    />
                      }
                  
                  <FaLock className="text-gray-400 absolute top-[17px] left-[15px] text-xl" />
                </div>
                {formState.errors.password && (
                  <p className="bg-red-400 p-1 pl-[10px] text-white rounded-sm">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
              <button
                disabled={loading}
                className={`w-full h-fit py-[10px] rounded-xl bg-gray-400 flex justify-center items-center text-white font-bold rounded-xl${loading ? "cursor-not-allowed bg-gray-500" : "cursor-pointer"}`}
              >
                {loading ? (
                  <>
                    <span className="mr-[5px]">Sign You in</span>{" "}
                    <FaSpinner className="animate-spin" />
                  </>
                ) : (
                  "Sign in"
                )}
                <span className={`ml-[5px] ${loading ? "hidden" : "inline"}`}>
                  <FaArrowRight className="inline-block" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
