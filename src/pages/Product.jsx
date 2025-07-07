import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../component/RelatedProduct";
import ZoomImage from "../component/ZoomImage";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, currencyCode, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");

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
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">{productData.image.map((item, index) => image && <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] rounded-[4px] sm:rounded-md sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />)}</div>
          {/* Zoom Effect */}
          <div className="w-full sm:w-[80%]">{image && <img className="w-full h-auto rounded-[4px] sm:rounded-md" src={image} alt="" />}</div>
          {/* Logic */}
          {/* <div className="w-full sm:w-[80%] h-full rounded-[4px] sm:rounded-md overflow-hidden">
            <ZoomImage
              src={image}
              width="100%"
              height="100%"
              style={{
                borderRadius: "inherit",
                objectFit: "cover", 
              }}
            />
          </div> */}

          {/* <ZoomImage src={image} width={"80%"} height={"100%"} /> */}
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
            <div className="flex flex-col gap-4 mt-8">
              <p>Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border border-black text-black tracking-widest text-sm py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${item === size ? "text-white bg-black" : ""}`} key={index}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => addToCart(productData._id, size)} className="px-8 py-3 mt-8 text-sm border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300">
            ADD TO CART
          </button>
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
