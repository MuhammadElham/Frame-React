import React from "react";
import Hero from "../component/Hero";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewsLetter from "../component/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />  
    </div>
  );
};

export default Home;
