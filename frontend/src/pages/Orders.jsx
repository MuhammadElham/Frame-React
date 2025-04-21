import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { div } from "framer-motion/client";

const Orders = () => {
  const { products, currency, currencyCode } = useContext(ShopContext);
  return (
    <div className="border-t pt-16">
      {/* Heading */}
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {/* Product Details */}
      <div>
        {products.slice(0, 4).map((item, index) => (
          <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              {/* ---  Images  --- */}
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              {/* ---  Details  ---- */}
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">{currency}{item.price}{currencyCode}</p>
                  <p>Quantity: 1</p>
                  <p className="flex items-center gap-2">Size: <span className="px-3 py-1 text-sm border border-black bg-black text-white tracking-wider">12" x 24"</span></p>
                </div>
                {/* --- Date --- */}
                <p className="mt-2">Date: <span className="text-gray-400">18-April-2025</span></p>
              </div>
            </div>
            {/*  */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
