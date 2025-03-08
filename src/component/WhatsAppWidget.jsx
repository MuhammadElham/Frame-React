import { useEffect } from "react";

const WhatsAppWidget = () => {
  useEffect(() => {
    if (window.Wati) {
      window.Wati.init({
        businessId: "YOUR_WATI_BUSINESS_ID",
        position: "right",
      });
    }
  }, []);

  return null;
};

export default WhatsAppWidget;
