import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency,currencyCode } = useContext(ShopContext);
  const imageUrl = Array.isArray(image) ? image[0] : image;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link to={`/product/${id}`} onClick={scrollToTop} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden rounded-md aspect-[3/4]">
        <img className="w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out" src={imageUrl} loading="lazy" alt={name} />
      </div>
      {/* <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out w-full h-[235px] md:h-[300px] lg:h-[370px] object-cover" src={imageUrl} loading="lazy" alt={name} />
      </div> */}
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
        {currencyCode}
      </p>
    </Link>
  );
};

export default ProductItem;
