import React from "react";

const TypesList = ({
  types,
  setFilters,
  filters,
  removeAttribute,
  editAttributes,
}) => {
  const handleFilterToggle = (intID) => {
    const id = intID.toString();
    setFilters((prev) => {
      let types = prev["type"];
      if (types.includes(id)) types = types.filter((type) => type !== id);
      else types.push(id);
      return {
        ...prev,
        type: types,
      };
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Types: </p>
      {types?.length > 0 ? (
        types?.map((_type, index) => {
          return (
            <div className="relative" key={index}>
              {filters["type"].includes(_type?.id.toString()) && (
                <p className="absolute -left-[2px] -top-[2px] border border-white bg-green-300 rounded-full h-2.5 w-2.5"></p>
              )}
              <p
                onClick={() => removeAttribute(_type?.id, "type")}
                className={`transition-all ${
                  editAttributes
                    ? "opacity-100 cursor-pointer"
                    : "opacity-0 select-none cursor-auto -z-10"
                } w-4 h-4 text-xs font-black bg-red-600 absolute right-[2px] top-1/2 -translate-y-1/2 rounded-full text-white flex items-center justify-center border border-white`}
              >
                -
              </p>
              <p
                key={index}
                onClick={() => handleFilterToggle(_type?.id)}
                className={`text-black shadow-md text-center transition-all ${
                  editAttributes ? "pl-[6px] pr-[20px]" : "px-[6px]"
                }  py-[1px] text-sm whitespace-nowrap rounded-md font-light cursor-pointer bg-gray-200`}
              >
                {_type?.name}
              </p>
            </div>
          );
        })
      ) : (
        <span className="text-sm font-light pt-0.5">
          You currently have no types to filter by
        </span>
      )}
    </div>
  );
};

export default TypesList;
