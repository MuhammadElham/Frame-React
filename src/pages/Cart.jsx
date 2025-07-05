import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const { products, currency, currencyCode, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]); // Array

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      {/* Heading */}
      <div className="text-2xl mb-3">
        <Title text1={"YOUR "} text2={"CART"} />
      </div>
      {/* Item Listing */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                {/*Product Image */}
                <img className="w-16 sm:w-20" src={Array.isArray(productData.image) ? productData.image[0] : productData.image} alt="" />
                {/* Product Details */}
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                      {currencyCode}
                    </p>
                    {/* Logic */}
                    {item.size?.length > 0 && <p className="px-2 sm:px-3 sm:py-1 text-sm border border-black bg-black text-white">{item.size}</p>}
                  </div>
                </div>
              </div>
              <input onChange={(e) => (e.target.value === "0" || e.target.value === "" ? null : updateQuantity(item._id, item.size, Number(e.target.value)))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src="https://res.cloudinary.com/dmmz8ldz9/image/upload/f_auto,q_auto/v1741605630/ecommerce-assets/hcdnubfi4ajhzxhscevc.png" alt="" />
            </div>
          );
        })}
      </div>
      {/* Total Amount */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate("/place-order")} className="border border-black text-xs px-6 py-3 my-8 sm:px-8 sm:text-sm bg-black text-white hover:bg-white hover:text-black transition-all duration-300">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
