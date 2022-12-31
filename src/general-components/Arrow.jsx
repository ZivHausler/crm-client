import React from "react";
import arrow from "../icons/arrow.png";

const Arrow = ({ show, display }) => {
  return (
    <img
      onClick={() => display(!show)}
      className={`${
        show ? "rotate-90" : "rotate-180"
      } h-5 p-1 rounded-full cursor-pointer`}
      src={arrow}
      alt=""
    />
  );
};

export default Arrow;
