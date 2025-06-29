import React from "react";
import Title from "../component/Title";
import NewsLetter from "../component/NewsLetter";
const Contact = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT "} text2={"US"} />
      </div>
      {/* Container */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-16 mb-28 ">
        <img className="w-full md:max-w-[450px] rounded-lg" src="https://res.cloudinary.com/dmmz8ldz9/image/upload/f_auto,q_auto/v1751197871/469039700_17855745315325260_8172388694619360456_n.jpg_zgey8t.jpg" loading="lazy" alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <a className="text-gray-500" href="mailto:elhamwaheed777@gmail.com">
            Tel: (+92) 333-3003310 <br /> elhamwaheed777@gmail.com
          </a>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
