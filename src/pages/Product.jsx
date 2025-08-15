import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../component/RelatedProduct";
import ZoomImage from "../component/ZoomImage";
import CartNotification from "../component/CartNotification";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, currencyCode, addToCart, setIsOpen, formData, setFormData } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // checked
      if (checked) {
        setFormData((prev) => ({ ...prev, [name]: [...prev[name], value] }));
      }
      // unchecked
      else {
        setFormData((prev) => ({ ...prev, [name]: [...prev[name].filter((item) => item !== value)] }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData({
        ...foundProduct,
        image: Array.isArray(foundProduct.image) ? foundProduct.image : [foundProduct.image],
      });
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      await fetchProductData();
    };
    getProduct();
  }, [productId, products]);

  // Ensure image updates when productData changes
  useEffect(() => {
    if (productData && productData.image?.length > 0) {
      setImage(productData.image[0]); // Ensuring image is set after productData updates
    }
  }, [productData]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row sm:max-h-[calc(100vh-100px)] sm:sticky sm:top-32">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full max-h-full">{productData.image.map((item, index) => image && <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] rounded-[4px] sm:rounded-md sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover" alt="" />)}</div>
          {/* Zoom Effect */}
          {/* Logic */}
          <div className="w-full sm:w-[80%] overflow-hidden flex items-start justify-center">
            <ZoomImage
              src={image}
              width="100%"
              height="auto"
              style={{
                borderRadius: "inherit",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src="https://res.cloudinary.com/dmmz8ldz9/image/upload/q_auto,f_auto/v1741605705/ecommerce-assets/p40zvxenlivjpkja66lc.png" alt="" className="w-3 5" />
            <img src="https://res.cloudinary.com/dmmz8ldz9/image/upload/q_auto,f_auto/v1741605705/ecommerce-assets/p40zvxenlivjpkja66lc.png" alt="" className="w-3 5" />
            <img src="https://res.cloudinary.com/dmmz8ldz9/image/upload/q_auto,f_auto/v1741605705/ecommerce-assets/p40zvxenlivjpkja66lc.png" alt="" className="w-3 5" />
            <img src="https://res.cloudinary.com/dmmz8ldz9/image/upload/q_auto,f_auto/v1741605705/ecommerce-assets/p40zvxenlivjpkja66lc.png" alt="" className="w-3 5" />
            <img src="https://res.cloudinary.com/dmmz8ldz9/image/upload/q_auto,f_auto/v1741605705/ecommerce-assets/qvew44ynpz6ttehj0auv.png" alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
            {currencyCode}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          {/* -- Size -- */}
          {productData.sizes?.length > 0 && (
            <div className="flex flex-col gap-4 mt-8 mb-4">
              <p>Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border border-black text-black tracking-widest text-sm py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${item === size ? "text-white bg-black" : ""}`} key={index}>
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 font-medium text-lg">Order Now - Fill Out the Form & Add to Cart:</p>
            </div>
          )}

          {productData.sizes?.length > 0 && (
            <form className="block max-w-[440px]">
              {/* Type of Certificate */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Type of Certificate</h4>
                <select name="certificate" value={formData.certificate} onChange={handleChange} className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400">
                  <option>Marriage Certificate</option>
                  <option>Anniversary Certificate</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Language</h4>
                <select name="language" value={formData.language} onChange={handleChange} className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400">
                  <option>English</option>
                  <option>French</option>
                  <option>Arabic</option>
                  <option>Turkish</option>
                  <option>German</option>
                  <option>Farsi</option>
                  <option>Urdu</option>
                </select>
              </div>

              {/* Signature Lines */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Signature Lines</h4>
                <select name="signature_line" value={formData.signature_line} onChange={handleChange} className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400">
                  <option>All (Husband, Wife, Witnesses, Wali, Officiant)</option>
                  <option>Husband & Wife Only</option>
                  <option>Husband & Wife & Witnesses & Wali</option>
                  <option>Husband & Wife & Officiant & Wali</option>
                  <option>Husband & Wife & Witnesses & Officiant</option>
                  <option>Husband & Wife & Wali</option>
                  <option>Husband & Wife & Officiant</option>
                </select>
              </div>

              {/* Transfer Signatures */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Transfer Signatures (Optional)</h4>
                <div className="w-1/3 flex items-center justify-between">
                  <label className="text-gray-400">
                    <input type="radio" name="transfer_signature" value="yes" checked={formData.transfer_signature === "yes"} onChange={handleChange} className="mr-2 cursor-pointer accent-yellow-700" />
                    Yes
                  </label>
                  <label className="text-gray-400">
                    <input type="radio" name="transfer_signature" value="no" checked={formData.transfer_signature === "no"} onChange={handleChange} className="mr-2 cursor-pointer accent-yellow-700" />
                    No
                  </label>
                </div>
                <p className="w-full text-gray-400 mb-4">Choose 'yes' if you would like to transfer signatures from your old contract onto this one.</p>
              </div>

              {/* Number of Witness Signature Areas */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Number of Witness Signature Areas</h4>
                <select name="witness" value={formData.witness} onChange={handleChange} className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400">
                  <option>2 (Recommended)</option>
                  <option>4</option>
                  <option>6</option>
                </select>
              </div>

              {/* Husband Full Name */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Husband Full Name</h4>
                <input name="husband_name" value={formData.husband_name} onChange={handleChange} type="text" className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400" />
              </div>

              {/* Wife Full Name */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Wife Full Name</h4>
                <input name="wife_name" value={formData.wife_name} onChange={handleChange} type="text" className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400" />
              </div>

              {/* Name Order */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Husband or Wife's Name First?</h4>
                <select name="name_order" value={formData.name_order} onChange={handleChange} className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400">
                  <option>Husband's Name First</option>
                  <option>Wife's Name First</option>
                </select>
              </div>

              {/* Gregorian Date */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Date of Marriage - Gregorian</h4>
                <input name="gregorian_date" value={formData.gregorian_date} onChange={handleChange} type="text" placeholder="ex: August 1, 2025" className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400" />
              </div>

              {/* Islamic Date */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Islamic Date of Marriage</h4>
                <input name="islamic_date" value={formData.islamic_date} onChange={handleChange} type="text" placeholder="ex: Safar 7, 1447" className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400" />
              </div>

              {/* City Name */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">City, State, Country of Marriage</h4>
                <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="ex: Toronto, Ontario, Canada" className="text-sm p-3 w-full outline-none border border-black text-gray-400" />
                <p className="text-sm text-gray-400 mb-4">The section will be written as "In the city of..."</p>
              </div>

              {/* Mahr */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Mahr (Optional)</h4>
                <input name="mahr" value={formData.mahr} onChange={handleChange} type="text" className="text-sm p-3 w-full outline-none border border-black mb-3 text-gray-400" />
              </div>

              {/* Extra Customizations */}
              <div>
                <h4 className="text-gray-500 font-medium pb-3">Extra Customizations (Optional)</h4>
                <div className="w-full  grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-400 mb-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input name="customization" value={"Text Changes"} onChange={handleChange} type="checkbox" className="accent-yellow-700 w-4 h-4" />
                    <span>Text Changes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input name="customization" value={"Color Changes (+25.00 dh)"} onChange={handleChange} type="checkbox" className="accent-yellow-700 w-4 h-4" />
                    <span>Color Changes (+25.00 dh)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input name="customization" value={"Couple's Crest (+50.00 dh)"} onChange={handleChange} type="checkbox" className="accent-yellow-700 w-4 h-4" />
                    <span>Couple's Crest (+50.00 dh)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input name="customization" value={"Marriage Conditions"} onChange={handleChange} type="checkbox" className="accent-yellow-700 w-4 h-4" />
                    <span>Marriage Conditions</span>
                  </label>
                </div>
                <p className="w-full  text-gray-400 mb-4 text-sm">Extra customizations require an extended processing time of 10 business days and you will receive an email preview within 5 business days. Once you give your final approval, it will take 5 more business days before your certificate is dispatched for shipping.</p>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-gray-500 font-medium pb-1">Any other notes</h4>
                <textarea name="note" value={formData.note} onChange={handleChange} className="w-full text-sm p-3 outline-none border border-black text-gray-400" placeholder="Anything we need to know before working on your certificate?"></textarea>
              </div>
            </form>
          )}
          {/* Add to Cart */}
          <button
            onClick={() => {
              addToCart(productData._id, size, formData);
              size && setShowAddToCartPopup(true);
              setIsOpen(true);
            }}
            className="px-8 py-3 mt-8 text-sm border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            ADD TO CART
          </button>
          {/* Notification Render */}
          {showAddToCartPopup && <CartNotification productData={productData} formData={formData} productImage={image} productSize={size} />}
          {/* ---------- Details Portion END ---------- */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
