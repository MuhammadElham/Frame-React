import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
// import Certificate from "../assets/certificate.png"
import Certificate from "../../src/assets/certificate.png"

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="flex flex-col items-center text-center py-8 text-3xl">
        <img className="mb-3" src={Certificate} alt="" />
        <Title text1={"NIKKAH CERTIFICATE "} text2={"COLLECTIONS"} forLatestCollection={"text-2xl sm:text-3xl"} />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Discover our newest wedding treasures crafted with love and precision. Explore our fresh designs where tradition meets modern elegance.</p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
