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
    const productInfo = products.find((p) => p._id === itemId);
    const needsSize = productInfo?.sizes?.length > 0;

    if (needsSize && !size) {
      toast.error("Please select a size");
      return;
    }  

    // ✅ Naya item banate waqt condition use karo
    const newItem = {
      userId,
      itemId: productInfo._id,
      size: needsSize ? size : null,
      formData: formData || {},
      quantity: 1,
    };
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (typeof cartData[itemId][size] === "object" && cartData[itemId][size]?.quantity) {
        cartData[itemId][size].quantity += 1;
      } else {
        cartData[itemId][size] = newItem;
      }
    } else {
      cartData[itemId] = {
        [size || "default"]: newItem, // agar size na ho to "default"
      };
    }

    setCartItems(cartData);

    // 🔗 Backend sync
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId: productInfo._id, size, formData, quantity: 1 }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
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

      if (response.data.success && Array.isArray(response.data.cart)) {
        const structured = {};
        response.data.cart.forEach((item) => {
          if (!structured[item.itemId]) structured[item.itemId] = {};
          structured[item.itemId][item.size || "default"] = {
            quantity: item.quantity,
            ...(item.formData ? { formData: item.formData } : {}),
          };
        });
        setCartItems(structured);
      } else {
        setCartItems({}); // empty cart handle
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
