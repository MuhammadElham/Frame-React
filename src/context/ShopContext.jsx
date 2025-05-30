import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const currencyCode = " PKR";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({}); // Object
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  // Navigation for Proceed Button
  const navigate = useNavigate();

  const addToCart = async (itemId, size, userId) => {
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
    //
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId, size, userId }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  // for selecting products
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      // cartItems is Object having { ID : { Size : Quantity } }
      for (const item in cartItems[items]) {
        // cartItems[items] is for Size
        try {
          if (cartItems[items][item] > 0) {
            // cartItems[items][item] is for Quantity
            totalCount += cartItems[items][item];
            console.log("cartItems = ", cartItems);
            console.log("cartItems[items] = ", cartItems[items]);
            console.log("cartItems[items][item] = ", cartItems[items][item]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // for Delete Item
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    //
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // for Total Amount
  const getCartAmount = () => {
    // temp var
    let totalAmount = 0;
    // looping from items ID
    for (const items in cartItems) {
      // finding from products
      let itemInfo = products.find((product) => product._id === items); // itemInfo having all details about products
      // looping from Size
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);
  //
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  const value = {
    products,
    currency,
    currencyCode,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    setCartItems,
    navigate,
    token,
    setToken,
  };
  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
