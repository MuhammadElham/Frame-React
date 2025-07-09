import React from "react";

const TopMarquee = () => {
  return (
    <div className="w-full bg-black text-white overflow-hidden py-2 text-sm sm:text-base relative z-[9999]">
      <div className="animate-marquee flex gap-x-5 items-center w-max">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="flex items-center gap-x-5">
            <p className="font-semibold whitespace-nowrap text-xs sm:text-base">Summer 2025</p>
            <p className="whitespace-nowrap text-xs sm:text-base font-light">The New</p>
          </div>
        ))}
      </div>
      {/* <hr className="mt-2 border-[1.5px]" /> */}
    </div>
  );
};

export default TopMarquee;
