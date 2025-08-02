import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // Main Container
    <div
      className="relative text-white h-[550px] flex flex-col py-24 bg-cover bg-center -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]"
      style={{backgroundImage: `url("https://res.cloudinary.com/dmmz8ldz9/image/upload/f_auto,q_auto/v1741609342/ecommerce-assets/ygxzfscjbn2n0j1ggnij.jpg")`,}}>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative top-[100px] z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* LEFT SIDE TEXT */}
        <div className="flex items-center gap-2 pb-5">
          <p className="font-medium text-sm lg:text-base">OUR BESTSELLER</p>
          <p className="w-8 md:w-[11px] h-[2px] bg-white"></p>
        </div>
        <h1 className="prata-regular text-3xl sm:py-3 md:text-4xl lg:text-5xl leading-relaxed">Your Marriage, treasured</h1>
        <p className="text-sm lg:text-base sm:w-2/4">Every marriage has a beginning - make yours unforgettable with a handcrafted nikah certificate by Kargari.</p>
        <Link to="/collection">
          <button className="bg-white text-black hover:bg-black hover:text-white duration-300 w-auto max-w-fit tracking-wide my-4 text-xs px-5 py-3 sm:px-6 sm:py-3 sm:text-sm md:my-6 lg:text-[16px] lg:px-8 lg:py-4">SHOP NIKKAH CONTRACTS</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
