import React from "react";

const StatusesList = ({
  statuses,
  setFilters,
  filters,
  removeAttribute,
  editAttributes,
}) => {
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

  const handleFilterToggle = (intID) => {
    const id = intID.toString();
    setFilters((prev) => {
      let statuses = prev["status"];
      if (statuses.includes(id))
        statuses = statuses.filter((status) => status !== id);
      else statuses.push(id);
      return {
        ...prev,
        status: statuses,
      };
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Statuses: </p>
      {statuses?.length > 0 ? (
        statuses?.map((_status, index) => {
          return (
            <div className="relative" key={index}>
              {filters["status"].includes(_status?.id.toString()) && (
                <p className="absolute -left-[2px] -top-[2px] border border-white bg-green-300 rounded-full h-2.5 w-2.5"></p>
              )}
              <p
                onClick={() => removeAttribute(_status?.id, "status")}
                className={`transition-all ${
                  editAttributes
                    ? "opacity-100 cursor-pointer"
                    : "opacity-0 select-none cursor-auto -z-10"
                } w-4 h-4 text-xs font-black bg-red-600 absolute right-[2px] top-1/2 -translate-y-1/2 rounded-full text-white flex items-center justify-center border border-white`}
              >
                -
              </p>
              <p
                onClick={() => handleFilterToggle(_status.id)}
                style={{
                  backgroundColor: chooseColor(_status.name?.toLowerCase()),
                }}
                className={`text-white shadow-md text-center transition-all ${
                  editAttributes ? "pl-[6px] pr-[22px]" : "px-[6px]"
                }  py-[1px] text-sm whitespace-nowrap rounded-md font-light cursor-pointer bg-gray-200`}
              >
                {_status?.name}
              </p>
            </div>
          );
        })
      ) : (
        <span className="text-sm font-light pt-0.5">
          You currently have no statuses to filter by
        </span>
      )}
    </div>
  );
};

export default StatusesList;
