import React from "react";

const WhatsAppChatButton = () => {
  const phoneNumber = "923333003310"; 
  const message = "Hello! I need help."; // Default message

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        fontSize: "25px",
        border: "none",
        cursor: "pointer",
      }}
    >
      💬
    </button>
  );
};

export default WhatsAppChatButton;
