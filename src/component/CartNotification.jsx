import React from "react";
import { IoCheckmark } from "react-icons/io5";

const CartNotification = ({ productData, formData, productImage, productSize }) => {
  return (
    <div className="absolute top-40 right-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="max-w-[370px] py-[25px] px-[30px] border-[1px] border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm gap-2 text-gray-600">
            <IoCheckmark />
            <p>item added to your cart </p>
          </div>
          <p className="font-light text-lg cursor-pointer">X</p>
        </div>
        <div className="flex mt-[20px] mb-[30px]">
          {/* image section */}
          <div className="mt-[6px] mr-[15px]">
            <img src={productImage} className="w-[70px] h-[106px]" loading="lazy" alt="Product Image" />
          </div>
          {/* detail section */}
          <div>
            <p className="text-base text-gray-800 mb-[5px]">{productData.name}</p>
            <p className="text-sm text-gray-600">Size: {productSize}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Type: {formData.certificate}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Language: {formData.language}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Signatures: {formData.signature_line}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Witness Signature Areas: {formData.witness}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Husband: {formData.husband_name}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Wife: {formData.wife_name}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Name Style: {formData.name_order}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Date: {formData.gregorian_date}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Islamic Date: {formData.islamic_date}</p>
            <p className="text-sm text-gray-600 mt-[6px]">City: {formData.city}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Mahr: {formData.mahr}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Extra Customizations: {formData.customization.join(", ")}</p>
            <p className="text-sm text-gray-600 mt-[6px]">Note: {formData.note}</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col">
          <button className="text-sm text-[#d1a847] border-[1px] border-[#cf9a1e] py-[12px] tracking-[1.2px] mt-[10px] hover:border-[2px] hover:border-[rgba(92,58,1,0.5)]">View my cart</button>
          <button className="text-sm text-white bg-black py-[12px] tracking-[1.2px] mt-[10px] transition-transform duration-200 hover:scale-95">Check out</button>
          <p className="text-sm text-[#d1a847] underline cursor-pointer mt-[10px] text-center">Continue shopping</p>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
