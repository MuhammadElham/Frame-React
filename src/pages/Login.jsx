import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {/* --- Field --- */}
      <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-gray-800" />
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-800" />
      <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-800" />
    </form>
  );
};

export default Login;
