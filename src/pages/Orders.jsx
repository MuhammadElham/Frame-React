import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { div } from "framer-motion/client";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t pt-16">
      {/* Heading */}
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {/* Product Details */}
      <div>
        {
          products.slice(0,4).map((item,index)=>(
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <img src={item.image[0]} alt="" />     
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
