import React from "react";
import contactInfo from "./utils/contact";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open(contactInfo.buildWhatsAppUrl(), "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="animate-pulse-whatsapp fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center justify-center group"
      aria-label="Abrir WhatsApp"
    >
      {/* Ícone WhatsApp */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 mr-0 fill-current group-hover:scale-110 transition-transform"
      >        
        <path d="M16 2.938c-7.27 0-13.161 5.891-13.161 13.161 0 2.324.603 4.521 1.744 6.484L2 30l7.618-2.557c1.901 1.039 4.055 1.589 6.382 1.589 7.27 0 13.161-5.891 13.161-13.161S23.27 2.938 16 2.938zm0 23.971c-2.002 0-3.95-.537-5.648-1.554l-.403-.239-4.527 1.518 1.495-4.422-.262-.414a10.824 10.824 0 01-1.679-5.832c0-5.982 4.869-10.852 10.852-10.852 5.983 0 10.852 4.87 10.852 10.852S21.983 26.909 16 26.909zm5.984-8.134c-.327-.164-1.936-.957-2.236-1.067-.299-.109-.518-.164-.737.164-.219.327-.848 1.067-1.04 1.286-.191.219-.382.246-.709.082-.327-.164-1.381-.508-2.632-1.622-.972-.868-1.628-1.938-1.817-2.265-.191-.327-.021-.503.145-.667.149-.148.327-.382.491-.572.164-.191.219-.327.327-.546.109-.219.055-.409-.027-.572-.082-.164-.737-1.777-1.009-2.431-.266-.64-.538-.554-.737-.563-.191-.009-.409-.009-.628-.009-.219 0-.572.082-.872.382-.299.299-1.144 1.117-1.144 2.726 0 1.609 1.171 3.167 1.332 3.385.164.219 2.306 3.522 5.589 4.938.782.338 1.391.541 1.867.693.784.25 1.497.214 2.06.13.63-.094 1.936-.787 2.212-1.546.273-.759.273-1.411.191-1.546-.082-.137-.299-.218-.628-.382z"/>
      </svg>
    </button>
  );
}