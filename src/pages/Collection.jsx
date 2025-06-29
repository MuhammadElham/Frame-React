import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import ProductItem from "../component/ProductItem";
// Updation
import { FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
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
  // GPT Logic which i change it
  const applyFilter = () => {
    let filteredProducts = products.slice();
    // 🔍 Apply Search Filter
    if (search.length > 0) {
      filteredProducts = filteredProducts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    // 🏷️ Apply Category Filter
    if (category.length) {
      filteredProducts = filteredProducts.filter((item) => category.includes(item.category));
    }
    // 📌 Apply Sorting
    sortProduct(filteredProducts);

    console.log(filterProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [sortType, products, category, search, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options  */}
      <div className="min-w-60">
        {/* Mobile Button with Animation */}
        <motion.button
          onClick={() => setShowFilter(!showFilter)}
          className="md:hidden flex items-center gap-2 mb-5 text-base font-medium px-3 py-2 border rounded"
          animate={
            showFilter
              ? { rotate: 0, scale: 1 } // stop animation if filter is open
              : { rotate: [0, -6, 6, -6, 6, 0], scale: [1, 1.05, 1] }
          }
          transition={{
            repeat: showFilter ? 0 : Infinity,
            repeatDelay: 4, // shake every 4 seconds
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <FiFilter className="w-4 h-4" />
          <span>Filters</span>
        </motion.button>

        {/* Desktop Filter Heading - keep same */}
        <p onClick={() => setShowFilter(!showFilter)} className="hidden md:flex items-center cursor-pointer gap-3 my-2 text-xl">
          FILTERS
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Frame", "Ring Trays", "Welcome Board", "Sweet Box", "Pen", "Dupatta"].map((item) => (
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
