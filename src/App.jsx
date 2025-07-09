import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useLenis from "./component/UseLenis.jsx";
import PageTransition from "./component/PageTransition.jsx";
import TopMarquee from "./component/TopMarquee.jsx";
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
import SearchBar from "./component/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
// import ChatBot from "./component/ChatBot.jsx";
function App() {
  useLenis();
  const location = useLocation();
  return (
    <>
    <TopMarquee/> 
      <Navbar />
      <SearchBar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        {/* Annimation */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/product/:productId" element={<PageTransition><Product /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/place-order" element={<PageTransition><PlaceOrder /></PageTransition>} />
            <Route path="/orders" element={<PageTransition><Orders /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
        {/* <WhatsAppChatButton /> */}
        {/* <ChatBot /> */}
      </div>
    </>
  );
}

export default App;
