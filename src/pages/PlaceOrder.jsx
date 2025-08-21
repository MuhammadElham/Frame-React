import { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [isFormData, setIsFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setIsFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("Cart Items Before Processing:", cartItems); // 👈 sabse pehle yaha
      let orderItems = [];
      for (const productId in cartItems) {
        const productInfo = structuredClone(products.find((p) => p._id === productId));
        if (!productInfo) continue;

        const hasSizes = productInfo?.sizes?.length > 0;

        if (hasSizes) {
          for (const size in cartItems[productId]) {
            const { quantity, formData } = cartItems[productId][size];
            if (quantity > 0) {
              orderItems.push({
                productId,
                name: productInfo.name,
                price: productInfo.price,
                size,
                quantity,
                formData: formData , // ✅ correct key
              });
            }
          }
        } else {
          const { quantity } = cartItems[productId].default || {};
          if (quantity > 0) {
            orderItems.push({
              productId,
              name: productInfo.name,
              price: productInfo.price,
              size: null,
              quantity,
              formData: null,
            });
          }
        }
      }
      let orderData = {
        address: isFormData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      // let orderData = {
      //   address: isFormData,
      //   items: orderItems,
      //   amount: getCartAmount() + delivery_fee,
      // };
      console.log("Form Data: ", isFormData);
      console.log("Order Items: ", orderItems);
      console.log("Final Order Data (to be sent): ", orderData);

      switch (method) {
        // API Calls for COD
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          console.log("API Response:", response.data); // 👈 backend reply
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            // toast.error(response.data.message);
            navigate("/login");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* -------- Left Side -------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/* Heading */}
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY "} text2={"INFORMATION"} />
        </div>
        {/* Input Fields */}
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={isFormData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={isFormData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={isFormData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={isFormData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={isFormData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={isFormData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={isFormData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={isFormData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={isFormData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>

      {/* -------- Right Side -------- */}
      <div className="mt-8">
        {/* Total */}
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* Heading */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------- Payment Method Selection ------- */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          {/* Button */}
          <div className="w-full text-end mt-8">
            <button type="submit" className="border bg-black text-white px-16 py-3 text-sm hover:bg-white hover:text-black hover:border-black">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
