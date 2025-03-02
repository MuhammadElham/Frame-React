import React from "react";
import Hero from "../component/Hero";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewsLetter from "../component/NewsLetter";
import Reels from "../component/Reels";

const Home = () => {
  return (
    <div>
      <Hero />
      <Reels/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />  
    </div>
  );
};

export default Home;
