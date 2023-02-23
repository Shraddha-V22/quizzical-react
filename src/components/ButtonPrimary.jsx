import React from "react";

export default function ButtonPrimary({
  children,
  type,
  onClick,
  classStyles,
}) {
  return (
    <button
      type={type}
      className={`${classStyles} w-[fit-content] rounded-[15px] bg-lightBlue px-[30px] py-[10px] text-offWhite`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
