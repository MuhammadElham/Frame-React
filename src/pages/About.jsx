import React from "react";
import Title from "../component/Title";
import NewsLetter from "../component/NewsLetter";

const About = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>
      {/* Container */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px] rounded-lg" src="https://res.cloudinary.com/dmmz8ldz9/image/upload/f_auto,q_auto/v1747247780/ezx8no1ldthlotiueq1v.png" loading="lazy" alt="About Image" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      {/* Heading */}
      <div className="text-xl py-4 text-center sm:text-left">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>
      {/* Boxes */}
      <div className="flex flex-col lg:flex-row text-sm md:text-base gap-10 mb-20 mt-8">
        <div className="border px-10 py-8 md:px-12 md:py-14 lg:px-16 lg:py-20 flex flex-col gap-5">
          <b className="text-base md:text-xl text-gray-800">Quality Assurance:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border px-10 py-8 md:px-12 md:py-14 lg:px-16 lg:py-20 flex flex-col gap-5">
          <b className="text-base md:text-xl text-gray-800">Convenience:</b>
          <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 py-8 md:px-12 md:py-14 lg:px-16 lg:py-20 flex flex-col gap-5">
          <b className="text-base md:text-xl text-gray-800">Exceptional Customer Service:</b>
          <p className="text-gray-600">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
