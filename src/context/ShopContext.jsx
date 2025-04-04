import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({}); // Object

  const addToCart = async (itemId, size) => {
    // Toastify for Size
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    // Fetching number of Product Items and Add them into respective place
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  // for selecting products 
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) { // cartItems is Object having { ID : { Size : Quantity } }
      for (const item in cartItems[items]) { // cartItems[items] is for Size 
        try {
          if (cartItems[items][item] > 0) { // cartItems[items][item] is for Quantity
            totalCount += cartItems[items][item];
            console.log('cartItems = ' , cartItems) 
            console.log('cartItems[items] = ' , cartItems[items]) 
            console.log('cartItems[items][item] = ' , cartItems[items][item])  
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };
  // for Delete Item
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };
  // for Total Amount
  const getCartAmount = () => {
    // temp var
    let totalAmount = 0
    // looping from items ID
    for(const items in cartItems){
      // finding from products
      let itemInfo = products.find((product)=>product._id===items) // itemInfo having all details about products
      console.log('itemInfo = ' , itemInfo);
      // looping from Size

    }
    // return totalAmount;

  }
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount
  };
  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
