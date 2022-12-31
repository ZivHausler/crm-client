import React, { useState } from "react";

const Priority = ({ priority, handleAttributeChange }) => {
  const [changePriority, setChangePriority] = useState(false);
  const priorities = ["Low", "Medium-Low", "Medium", "Medium-High", "High"];

  const handlePriorityChange = (db_priority) => {
    handleAttributeChange(db_priority, "importance");
    setChangePriority(false);
  };

  const chooseColor = (number) => {
    let color = "#";
    switch (number) {
      case 1:
        color += "CCCCFF";
        break;
      case 2:
        color += "CCFFCC";
        break;
      case 3:
        color += "FFFFCC";
        break;
      case 4:
        color += "FFE5CC";
        break;
      case 5:
        color += "FFCCCC";
        break;

      default:
        color += "000000";
        break;
    }
    return color;
  };

  const numberToString = (number) => {
    return priorities[number - 1];
  };

  return (
    <div className="relative select-none w-1/4 flex justify-center">
      {!changePriority ? (
        <p
          onClick={() => setChangePriority(!changePriority)}
          style={{
            backgroundColor: priority !== null && chooseColor(priority),
          }}
          className={`${
            priority !== null ? "" : "bg-gray-200 opacity-30 hover:opacity-100"
          } ml-2 w-auto shadow-md whitespace-nowrap text-center px-[5px] py-[1px] text-xs rounded-md font-light cursor-pointer`}
        >
          {priority ? numberToString(priority) : "+ Select priority"}
        </p>
      ) : (
        <div className={` relative`}>
          <p
            onClick={() => setChangePriority(false)}
            className={`cursor-pointer absolute -translate-x-[50%] -translate-y-[20%] flex items-center justify-center text-white rounded-full text-xs w-[15px] h-[15px] top-[2px] left-0 bg-black`}
          >
            &times;
          </p>
          <div
            className={`border max-w-[250px] rounded-[10px] p-1 overflow-x-auto gap-1 flex items-center`}
          >
            {priorities.map((_priority, index) => {
              if (_priority === numberToString(priority)) return null;
              return (
                <p
                  key={index}
                  onClick={() => handlePriorityChange(index + 1)}
                  style={{
                    backgroundColor: chooseColor(index + 1),
                  }}
                  className={` text-center shadow-md px-[5px] py-[1px] text-xs whitespace-nowrap rounded-md font-light cursor-pointer`}
                >
                  {_priority}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Priority;
