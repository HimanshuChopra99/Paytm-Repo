import React from "react";
import { useNavigate } from "react-router-dom"; 

function BottomWarning({ label, buttonText, to }) {

    const navigate = useNavigate()

  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <div className="pointer underline pl-1 cursor-pointer text-blue-700" onClick={() => {
        navigate(to)
      }}>
        {buttonText}
      </div>
      </div>
  );
}

export default BottomWarning;
