import React from "react";
import { NameBubble } from "./NameBubble";

const AssignToUser = ({
  item,
  itemId,
  sectionId,
  setShowAssignToUser,
  userPermission,
}) => {
  const handleChangeAssignedUser = () => {
    const task = { itemId, sectionId };
    if (userPermission >= 2) setShowAssignToUser(task);
  };

  return (
    <div onClick={handleChangeAssignedUser} className="w-1/4 flex justify-end">
      <div className="cursor-pointer">
        {item?.assignedToUser === null ? (
          <span className="bg-gray-200 px-1.5 rounded-md font-light text-xs text-center">
            + Assign
          </span>
        ) : (
          <NameBubble user={item?.assignedToUser} />
        )}
      </div>
    </div>
  );
};

export default AssignToUser;
