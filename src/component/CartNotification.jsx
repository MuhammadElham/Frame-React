import React from "react";
import { IoCheckmark } from "react-icons/io5";

const CartNotification = ({ productData, formData, productImage, productSize, onClose }) => {
  return (
    <div className="absolute top-40 right-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="py-[25px] px-[30px] border-2 border-black">
        {/* tick section */}
        <div className="flex items-center text-sm gap-2">
          <IoCheckmark />
          <p>item added to your cart </p>
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
      </div>
    </div>
  );
};

export default CartNotification;
