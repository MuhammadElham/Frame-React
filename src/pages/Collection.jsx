import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../component/Title";
import ProductItem from "../component/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    setCategory((prev) => (prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]));
  };

  const sortProduct = (filteredProducts) => {
    let sortedProducts = [...filteredProducts];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilterProducts(sortedProducts);
  };

  const applyFilter = () => {
    let filtered = category.length ? products.filter((item) => category.includes(item.category)) : products;
    sortProduct(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [sortType, products, category]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options  */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-3">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Frames", "Ring Trays", "Welcome Boards", "Sweet Boxes", "Pens"].map((item) => (
              <p key={item} className="flex gap-2 cursor-default">
                <input className="w-3 cursor-pointer" type="checkbox" value={item} onChange={toggleCategory} />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} lineWidth="w-[1rem] md:w-12" />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-[0.675rem] w-[130px] h-[30px] md:w-auto md:h-auto sm:text-sm px-2 cursor-pointer">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} image={item.image} name={item.name} id={item._id} price={item.price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
