import React from "react";

const Title = ({ text1, text2, lineWidth = "w-6 sm:w-12" , forLatestCollection }) => {
  return (
    // Latest Collection
    <div className="inline-flex gap-2 items-center mb-3">
      <p className={`text-gray-500 ${forLatestCollection}`}  >
        {text1}
        <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      {/* Dashed */}
      <p className={`${lineWidth} h-[1px] sm:h-[2px] bg-gray-700`}></p>
    </div>
  );
};

export default Title;
