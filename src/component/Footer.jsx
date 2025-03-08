import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* 1 Col */}
        <div>
          <Link to="/">
            <img className="mb-5 w-32" src={assets.logo} alt="" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam harum nostrum repellendus vitae neque quis necessitatibus animi autem voluptatibus sunt? Nisi minus, totam porro provident amet aliquam modi maxime fugiat?</p>
        </div>

        {/* 2 Col */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/"><li>HOME</li></NavLink>
            <NavLink to='/collection'><li>COLLECTION</li></NavLink>
            <NavLink to='/about'><li>ABOUT</li></NavLink>
            <NavLink to='/contact'><li>CONTACT</li></NavLink>
          </ul>
        </div>

        {/* 3 Col */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="tel:+923333003310">Tel: (+92) 333-3003310</a>
            </li>
            <li>
              <a href="mailto:elhamwaheed777@gmail.com">elhamwaheed777@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ karigari.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
