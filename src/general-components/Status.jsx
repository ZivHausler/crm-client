import React, { useState } from "react";

const Status = ({ status, statuses, handleAttributeChange }) => {
  const [changeStatus, setChangeStatus] = useState(false);

  const handleStatusChange = (db_status) => {
    handleAttributeChange(db_status, "status");
    setChangeStatus(false);
    // change the status of the task / sub-task
  };

  const chooseColor = (name) => {
    let color = "#";
    switch (name?.toLowerCase()) {
      case "done":
        color += "00c875";
        break;
      case "open":
        color += "0086c0";
        break;
      case "in progress":
        color += "fdab3d";
        break;
      case "stuck":
        color += "e2435c";
        break;

      default:
        color += "000000";
        break;
    }
    return color;
  };

  return (
    <div className="relative select-none w-1/4 flex justify-center">
      {!changeStatus ? (
        <p
          onClick={() => setChangeStatus(!changeStatus)}
          style={{
            backgroundColor:
              status !== null && chooseColor(status?.name.toLowerCase()),
          }}
          className={`${
            status !== null
              ? "text-white"
              : "bg-gray-200 opacity-30 hover:opacity-100"
          } ml-2 w-auto shadow-md text-center whitespace-nowrap px-[5px] py-[1px] text-xs rounded-md font-light cursor-pointer`}
        >
          {status ? status.name : "+ Select status"}
        </p>
      ) : (
        <div className={` relative`}>
          <p
            onClick={() => setChangeStatus(false)}
            className={`cursor-pointer absolute -translate-x-[50%] -translate-y-[20%] flex items-center justify-center text-white rounded-full text-xs w-[15px] h-[15px] top-[2px] left-0 bg-black`}
          >
            &times;
          </p>
          <div
            className={`border max-w-[250px] rounded-[10px] p-1 overflow-x-auto gap-1 flex items-center`}
          >
            {statuses.map((_status, index) => {
              if (_status.name === status?.name) return null;
              return (
                <p
                  key={index}
                  onClick={() => handleStatusChange(_status.id)}
                  style={{
                    backgroundColor: chooseColor(_status.name?.toLowerCase()),
                  }}
                  className={`text-white shadow-md text-center px-[5px] py-[1px] text-xs whitespace-nowrap rounded-md font-light cursor-pointer`}
                >
                  {_status?.name}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
