import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, setCartItems, navigate, token, setToken } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div
      className="flex items-center justify-between py-5 font-medium sticky bg-white
w-full top-0 left-0 z-[1000] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
    >
      {/* 1 part */}
      <Link to="/">
        <img src={assets.logo} className="w-20 sm:w-24 md:w-28 lg:w-32" alt="" />
      </Link>
      {/* 2 part */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* 3 part */}
      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <div className="group relative">
          <img onClick={() => (token ? "null" : navigate("/login"))} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
          {/* DropDown */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        {/* Menu Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
      </div>
      {/* Sidebar Menu for Small Screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all h-min z-[100] ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer w-fit">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {/* NavItems */}
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
