import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* 1 Col */}
        <div>
          <Link to="/">
            <img className="mb-5 w-32" src="https://res.cloudinary.com/dmmz8ldz9/image/upload/f_auto,q_auto/v1741605636/ecommerce-assets/flqrjp0nlmalt5vscokn.png" alt="" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">Crafting timeless wedding memories through exquisite handmade frames, nikah certificates, and ceremonial accessories. Each piece tells your unique love story with traditional artistry and modern elegance.</p>
        </div>

        {/* 2 Col */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 ">
            <Link to="/"><li>HOME</li></Link>
            <Link to='/collection'><li>COLLECTION</li></Link>
            <Link to='/about'><li>ABOUT</li></Link>
            <Link to='/contact'><li>CONTACT</li></Link>
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
        <p className="py-5 text-sm text-center">Copyright 2025@ karigari.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
