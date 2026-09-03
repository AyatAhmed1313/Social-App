import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaFacebookF,
  FaGoogle,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";
import axios from "axios";
import { RegisterationSchema } from "@/Schema/RegisterationSchema";
import Swal from "sweetalert2";
import AuthWelcomeSection from "@/Components/AuthWelcomeSection/AuthWelcomeSection";


export default function SignUp() {
  let [loading, setLoading] = useState();
  let navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    reValidateMode:"onSubmit",
    resolver: zodResolver(RegisterationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
  });

  async function sendRegisterData(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        values,
      );
      console.log(response.data.message);
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            navigate("/");
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
    <div className="sm:block lg:flex min-h-screen">
      <AuthWelcomeSection signup_page={true}/>
      <div className="sm:w-full sm:mb-[40px] lg:w-1/2 lg:mb-0 min-h-screen ">
        <div className="w-[90%] sm:w-[90%] shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] border border-solid border-gray-200 rounded-2xl my-10 p-[30px] pt-[50px]  mx-auto">
          <form onSubmit={handleSubmit(sendRegisterData)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend className={"text-center !text-3xl !font-bold"}>
                  Create account
                </FieldLegend>
                <FieldDescription
                  className={"text-center text-base text-gray-800"}
                >
                  Already have an account?{" "}
                  <Link
                    className="!no-underline text-blue-500 visited:text-blue-800"
                    to="/"
                  >
                    sign in
                  </Link>
                </FieldDescription>
                <div className="flex mt-[10px] gap-x-3 text-center">
                  <button type="submit"  className="w-1/2 border border-gray-200 rounded-xl py-[10px] text-base cursor-pointer transition-all duration-300 hover:scale-110">
                    <FaGoogle className="inline mr-[10px] text-red-500 text-lg" />
                    Google
                  </button>
                  <button type="submit" className="w-1/2 cursor-pointer border border-solid border-gray-200 rounded-xl h-fit py-[10px] bg-blue-500 text-amber-50 text-base transition-all duration-300 hover:scale-110">
                    <FaFacebookF className="inline mr-[10px] text-amber-50" />
                    Facebook
                  </button>
                </div>
                <FieldGroup>
                  {/* //^=== Name field======================== */}
                  <Field className={"gap-0"}>
                    <FieldLabel htmlFor="name" className={"gap-0 mb-[8px]"}>
                      Full Name
                    </FieldLabel>
                    <div className="relative flex items-center mb-0">
                      <Input
                        {...register("name")}
                        className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                        id="name"
                        placeholder="Enter your full name"
                      />
                      <FaUser className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                    </div>
                    {formState.errors.name && (
                      <p className="bg-red-500 p-1 text-amber-50">
                        {formState.errors.name.message}
                      </p>
                    )}
                  </Field>
                  {/* //^user Name====================================================== */}
                  <Field>
                    <FieldLabel htmlFor="userName">User Name</FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        {...register("username")}
                        className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                        id="userName"
                        placeholder="Your userName"
                      />
                      <FaUser className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                    </div>
                    {formState.errors.username && (
                      <p className="bg-red-500 p-1 text-white">
                        {formState.errors.username.message}
                      </p>
                    )}
                  </Field>
                  {/* //^===== Email ============================================== */}
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        {...register("email")}
                        className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                        id="email"
                        placeholder="name@example.com"
                      />
                      <MdEmail className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                    </div>
                    {formState.errors.email && (
                      <p className="bg-red-500 p-1 text-amber-50">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </Field>
                  {/* //^===== password field=================================================== */}
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        {...register("password")}
                        className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                        id="password"
                        placeholder="create a strong password"
                      />
                      <FaLock className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                    </div>
                    {formState.errors.password && (
                      <p className="bg-red-500 p-1 text-amber-50">
                        {formState.errors.password.message}
                      </p>
                    )}
                  </Field>
                  {/* //^=== repassword Field ====================================== */}
                  <Field>
                    <FieldLabel htmlFor="repassword">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        {...register("rePassword")}
                        className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                        id="repassword"
                        placeholder="Confirm your password"
                      />
                      <FaLock className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                    </div>
                    {formState.errors.rePassword && (
                      <p className="bg-red-500 p-1 text-amber-50">
                        {formState.errors.rePassword.message}
                      </p>
                    )}
                  </Field>

                  {/*//^====== dob================== */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field className="w-[50%]">
                      <FieldLabel htmlFor="DateOfBirth">
                        Date Of Birth
                      </FieldLabel>
                      <div className="relative flex items-center">
                        <Input
                          {...register("dateOfBirth")}
                          type="date"
                          className="h-fit py-[15px] pl-[40px] focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500"
                          id="DateOfBirth"
                        />
                        <FaCalendar className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                      </div>
                      {formState.errors.dateOfBirth && (
                        <p className="bg-red-500 p-1 text-amber-50">
                          {formState.errors.dateOfBirth.message}
                        </p>
                      )}
                    </Field>

                    {/*//^ ====== Gender =============================== */}
                    <div className="w-[50%]">
                      <label
                        htmlFor="countries"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Gender
                      </label>
                      <div className="relative flex items-center">
                        <select
                          {...register("gender")}
                          id="countries"
                          className="h-fit py-[15px] pl-[40px] border-[1.5px] corder-solid  border-gray-200 rounded-lg focus-visible:ring-0 focus-visible:border-[1.5px] focus-visible:border-blue-500 "
                        >
                          <option disabled>Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <FaTransgender className="text-gray-500 absolute top-[17px] left-[15px] text-base" />
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    className={`w-full h-fit py-[10px] mt-[10px] bg-blue-500 flex justify-center items-center text-white font-bold rounded-xl ${loading ? "cursor-not-allowed bg-gray-500" : "cursor-pointer"}`}
                  >
                    {loading ? (
                      <>
                        <span className="mr-[5px]">Creating Your Account</span>{" "}
                        <FaSpinner className="animate-spin" />
                      </>
                    ) : (
                      "create Account"
                    )}
                    <span
                      className={`ml-[5px] ${loading ? "hidden" : "inline"}`}
                    >
                      <FaArrowRight className="inline-block" />
                    </span>
                  </button>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
