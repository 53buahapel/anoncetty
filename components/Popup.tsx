import React from "react";

interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#144949] text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

export default Popup;
