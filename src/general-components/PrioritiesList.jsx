import React from "react";

const PrioritiesList = ({ setFilters, filters }) => {
  const priorities = ["Low", "Medium-Low", "Medium", "Medium-High", "High"];

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

  const handleFilterToggle = (intID) => {
    const id = intID.toString();
    setFilters((prev) => {
      let priorities = prev["importance"];
      if (priorities.includes(id))
        priorities = priorities.filter((priority) => priority !== id);
      else priorities.push(id);
      return {
        ...prev,
        importance: priorities,
      };
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Priorities:</p>
      {priorities?.map((_priority, index) => {
        return (
          <div className="relative" key={index}>
            {filters["importance"].includes((index + 1).toString()) && (
              <p className="absolute -left-[2px] -top-[2px] border border-white bg-green-300 rounded-full h-2.5 w-2.5"></p>
            )}
            <p
              key={index}
              onClick={() => handleFilterToggle(index + 1)}
              style={{
                backgroundColor: chooseColor(index + 1),
              }}
              className={` text-center shadow-md px-[10px] py-[1px] text-sm whitespace-nowrap rounded-md font-light cursor-pointer`}
            >
              {_priority}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PrioritiesList;
