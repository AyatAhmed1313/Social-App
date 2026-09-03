import { AuthContext } from "@/Contexts/AuthContext";
// import { NavbarCollapse } from 'flowbite-react'
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// ~ <============================================================================>

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function NavbarComponent() {
  let [settingClicked,setSettingClicked]=useState(false)
  // let [openMainDropdown,setOpenDropdown]=useState(false)
  const { token, setToken, userData } = useContext(AuthContext);
  const { username, email, photo ,name} = userData || {};
  console.log("userData", userData);
  console.log("userName", username);
  console.log("email", email);
  console.log("photo", photo);
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("token");
    setToken();
    navigate("/");
  }

  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand>
          <div className="flex gap-2 items-center">
          <span className="text-blue-500 w-[48px] h-[48px] bg-blue-200 text-lg/4 font-bold border border-white rounded-xl flex justify-center items-center">
            S
          </span>
          <span className="font-stretch-50% font-[900] text-2xl text-blue-500 flex items-center">
            SocialHub
          </span>
        </div>

        </NavbarBrand>
        {token ? (
          <>
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt={username} img={photo} rounded />}
              >
                <div className="relative">
                   <>
                   
                    <div className={`${settingClicked &&'absolute top-0 z-1000 -left-[100%] hidden'} transition-all duration-2000`} >
                    
                    <DropdownHeader>
                    <span className="block text-sm w-[160px] font-semibold pb-[16px]">{name}</span>
                    </DropdownHeader>

                    <div onClick={()=>{
                      setSettingClicked(true)
                   
                      }} className="w-[160px] text-sm cursor-pointer px-[16px]">Settings</div>

                    <DropdownDivider />
                    <DropdownItem className="w-[150px]" onClick={signOut}>Sign out</DropdownItem>
                  </div>
                  </>
                
                  
                    


                <div className={`${settingClicked?'right-0 block':'-right-[100%] hidden'} transition-all duration-2000 min-h-[120px] absolute bg-white py-[16px]  z-1000 -top-[4px] border-1 border-solid border-balck-500 rounded-[10px]`}>
            
                  <div className="flex gap-6 items-center px-[10px] cursor-pointer pb-[16px] w-fit">
                    <IoMdArrowRoundBack onClick={()=>setSettingClicked(false)} className="text-xl" />
                    <p className="text-[18px] font-semibold cursor-pointer tracking-wider">Settings</p>
                  </div>
                      <DropdownHeader>
                        <div className="flex gap-2 items-center w-fit">
                          <div className="size-[35px] rounded-full bg-gray-200">
                            <img className={'w-full h-full rounded-full'}  src={photo} alt={name}/>
                          </div>
                          <span className="block text-sm font-semibold whitespace-nowrap">{name}</span>

                        </div>
                      
                      </DropdownHeader>
                      <DropdownDivider />
                      <NavLink  to={'changepassword'} className="w-fit whitespace-nowrap text-sm px-4 py-2 font-[500]">Change password</NavLink>
                </div>
                </div>
               

              </Dropdown>
              <NavbarToggle />
            </div>
            <NavbarCollapse>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  isActive
                    ? "text-[18px] text-blue-500 block py-2 px-3 rounded md:bg-transparent md:p-0 md:text-blue-600"
                    : "text-[18px] block py-2 px-3 rounded md:bg-transparent md:p-0"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-[18px] text-blue-500 block py-2 px-3 rounded md:bg-transparent md:p-0 md:text-blue-600"
                    : "text-[18px] block py-2 px-3 rounded md:bg-transparent md:p-0"
                }
              >
                Profile
              </NavLink>
            </NavbarCollapse>
          </>
        ) : (
          <NavbarCollapse>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 rounded md:bg-transparent md:p-0 md:text-blue-600"
                  : "block py-2 px-3 rounded md:bg-transparent md:p-0"
              }
            >
              Login
            </NavLink>
            <NavLink
              to={"/signup"}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 rounded md:bg-transparent md:p-0 md:text-blue-600"
                  : "block py-2 px-3 rounded md:bg-transparent md:p-0"
              }
            >
              Register
            </NavLink>

            <NavLink href="#">Contact</NavLink>
          </NavbarCollapse>
        )}
      </Navbar>
    </>
  );
}
