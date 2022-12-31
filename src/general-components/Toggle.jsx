import React from "react";

const Toggle = ({ isActive, changeNotificationSetting, type, id }) => {
  return (
    <div className={`flex justify-center items-center w-1/4`}>
      <div
        style={{
          background: isActive ? "#22c55e" : "gray",
          transition: "all 0.2s ease-in-out",
        }}
        className={`w-12 h-6 relative shadow-md rounded-full flex items-center px-0.5`}
      >
        <div
          style={{
            left: isActive ? "2px" : "26px",
            transition: "all 0.15s ease-in-out",
          }}
          onClick={() => changeNotificationSetting(type, id, !isActive)}
          className={`h-5 w-5 absolute  bg-white shadow rounded-full cursor-pointer`}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
