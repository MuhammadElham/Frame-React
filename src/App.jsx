import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import WhatsAppChatButton from "./component/WhatsAppChatButton.jsx";
import SearchBar from "./component/SearchBar.jsx";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <>
      <Navbar />
      <SearchBar/>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
        <WhatsAppChatButton />
      </div>
    </>
  );
}

export default App;
