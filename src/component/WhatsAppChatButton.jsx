import React from "react";

const WhatsAppChatButton = () => {
  const phoneNumber = "923333003310";
  const message = "Hello! I need help."; // Default message

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button onClick={handleClick} className="fixed bg-[#25D366] text-white rounded-full bottom-5 right-5 w-14 h-14 text-2xl lg:bottom-[25px] lg:right-[25px] lg:w-[70px] lg:h-[70px] lg:text-[25px] border-none cursor-pointer">
      💬
    </button>
  );
};

export default WhatsAppChatButton;
