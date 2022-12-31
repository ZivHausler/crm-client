import React, { useState } from "react";

const Type = ({ type, types, handleAttributeChange }) => {
  const [changeType, setChangType] = useState(false);

  const handleTypeChange = (typeId) => {
    handleAttributeChange(typeId, "type");
    setChangType(false);
    // change the type of the task / sub-task
  };

  return (
    <div className="ml-2 relative select-none w-1/4 flex justify-start">
      {!changeType ? (
        <p
          onClick={() => setChangType(!changeType)}
          className={`${
            !type && "opacity-30 hover:opacity-100"
          } bg-gray-200 w-auto whitespace-nowrap shadow-md text-center px-[5px] py-[1px] text-xs rounded-md font-light cursor-pointer`}
        >
          {type?.name ? type.name : "+ Select type"}
        </p>
      ) : (
        <div className={` relative`}>
          <p
            onClick={() => setChangType(false)}
            className={`cursor-pointer absolute -translate-x-[50%] -translate-y-[20%] flex items-center justify-center text-white rounded-full text-xs w-[15px] h-[15px] top-[2px] left-0 bg-black`}
          >
            &times;
          </p>
          <div
            className={`border max-w-[250px] rounded-[10px] p-1 overflow-x-auto gap-1 flex w-full items-center`}
          >
            {types.map((_type, index) => {
              if (_type?.name === type?.name) return null;
              return (
                <p
                  key={index}
                  onClick={() => handleTypeChange(_type?.id)}
                  className={`text-black shadow-md text-center px-[5px] py-[1px] text-xs whitespace-nowrap rounded-md font-light cursor-pointer bg-gray-200`}
                >
                  {_type?.name}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Type;
