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
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    certificate: "",
    language: "",
    signature_line: "",
    transfer_signature: "",
    witness: "",
    husband_name: "",
    wife_name: "",
    name_order: "",
    gregorian_date: "",
    islamic_date: "",
    city: "",
    mahr: "",
    customization: [],
    note: "",
  });

  const addToCart = async (itemId, size, formData, userId) => {
    // Toastify for Size
    const productInfo = products.find((p) => p._id === itemId);
    const needsSize = productInfo?.sizes?.length > 0;
    if (needsSize && !size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (typeof cartData[itemId][size] === "object" && cartData[itemId][size]?.quantity) {
        // agar size ka data object hai aur quantity hai to +1
        cartData[itemId][size].quantity += 1;
      } else {
        // size ka data missing ya incorrect format hai to naya object set karo
        cartData[itemId][size] = {
          quantity: 1,
          formData,
        };
      }
    } else {
      // naya product add karo with size and formData
      cartData[itemId] = {
        [size]: {
          quantity: 1,
          formData,
        },
      };
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
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const item = cartItems[productId][size];
        if (item.quantity > 0) {
          totalCount += item.quantity;
        }
      }
    }
    return totalCount;
  };
  // const getCartCount = () => {
  //   console.log("cartItem ",cartItems);

  //   let totalCount = 0;
  //   for (const productId in cartItems) {
  //     for (const size in cartItems[productId]) {
  //       try {
  //         const item = cartItems[productId][size];
  //         if (item.quantity > 0) {
  //           totalCount += item.quantity;
  //           console.log("Total Count ", totalCount);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   return totalCount;
  // };
  // Update quantity safely
  // Inside ShopContext.js
  const updateQuantity = (productId, size, newQuantity, formData = null) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };

      // Agar product nahi hai cart me to naya banado
      if (!updatedCart[productId]) {
        updatedCart[productId] = {};
      }

      // Agar size nahi hai to naya banado
      if (!updatedCart[productId][size]) {
        updatedCart[productId][size] = {
          formData: formData || {},
          quantity: 0,
        };
      }

      // Agar quantity 0 kar rahe ho to item delete kar do
      if (newQuantity <= 0) {
        delete updatedCart[productId][size];

        // Agar product ka koi size nahi bacha to product delete kar do
        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      } else {
        updatedCart[productId][size] = {
          ...updatedCart[productId][size],
          quantity: newQuantity,
          ...(formData ? { formData } : {}), // agar naya formData aaye to update karo
        };
      }

      return updatedCart;
    });
  };

  // const updateQuantity = async (itemId, size, quantity) => {
  //   let cartData = structuredClone(cartItems);
  //   // cartData[itemId][size] = quantity;
  //   if (typeof cartData[itemId][size] === "number") {
  //     cartData[itemId][size] = { quantity, formData: null };
  //   } else {
  //     cartData[itemId][size].quantity = quantity;
  //   }

  //   setCartItems(cartData);
  //   //
  //   if (token) {
  //     try {
  //       await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };

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
          const cartItem = cartItems[items][item];
          if (cartItem && cartItem.quantity > 0) {
            totalAmount += itemInfo.price * cartItem.quantity;
          }
          // if (cartItems[items][item] > 0) {
          //   totalAmount += itemInfo.price * cartItems[items][item];
          // }
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
  // new
  // Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
    isOpen,
    setIsOpen,
    formData,
    setFormData,
  };
  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
