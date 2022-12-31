import React from "react";
import AssignToUser from "../general-components/AssignToUser";
import Priority from "../general-components/Priority";
import Status from "../general-components/Status";
import Type from "../general-components/Type";
import comments from "../icons/comments.png";
import deleteImg from "../icons/deleteImg.png";

export const SubTask = ({
  deleteItem,
  types,
  statuses,
  sub_task,
  index,
  color,
  commentsMenuHandle,
  editTaskTitle,
  userPermission,
  showAssignToUser,
  setShowAssignToUser,
}) => {
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      editTaskTitle(sub_task?.sectionId, sub_task?.id, e.target.value, "name");
      e.target.blur();
    }
  };

  const handleAttributeChange = (attributeId, type) => {
    editTaskTitle(sub_task?.sectionId, sub_task?.id, attributeId, type);
  };

  return (
    <div
      className={`flex hover:bg-gray-100 relative py-1 items-center justify-between`}
    >
      <div className={`w-[32%] pl-2 flex items-center justify-between`}>
        <input
          disabled={userPermission < 3}
          onKeyDown={handleInputChange}
          defaultValue={sub_task?.title}
          className={`rounded-md py-1 ml-1 pl-2 bg-transparent w-[270px]`}
        />
        {userPermission >= 3 && (
          <img
            onClick={() => deleteItem(sub_task?.id)}
            className={`h-5 cursor-pointer`}
            src={deleteImg}
            alt=""
          />
        )}

        <img
          className={`h-5 cursor-pointer ml-2`}
          onClick={() => commentsMenuHandle(sub_task?.id, sub_task?.sectionId)}
          src={comments}
          alt={"comment"}
        />
      </div>
      <div className="flex w-[68%] gap-2 px-2 justify-between items-center">
        {types?.length > 0 && (
          <Type
            type={sub_task?.type}
            types={types}
            handleAttributeChange={handleAttributeChange}
          />
        )}
        {statuses?.length > 0 && (
          <Status
            status={sub_task?.status}
            statuses={statuses}
            handleAttributeChange={handleAttributeChange}
          />
        )}
        <Priority
          priority={sub_task.importance}
          handleAttributeChange={handleAttributeChange}
        />
        <AssignToUser
          userPermission={userPermission}
          item={sub_task}
          itemId={sub_task.id}
          sectionId={sub_task.sectionId}
          setShowAssignToUser={setShowAssignToUser}
          showAssignToUser={showAssignToUser}
        />
      </div>
      <div
        style={{ borderBottom: `1px solid ${color}` }}
        className={`absolute right-[100%] top-0 h-1/2 w-[23px] rounded-bl-xl`}
      ></div>
      <div
        style={{ background: color }}
        className={`w-[6px] ${
          index === 0 && "rounded-tl-xl"
        } absolute top-0 left-0 h-full`}
      ></div>
      <hr className={`absolute bottom-[-3.5px] w-full h-1 left-0 -z-10`}></hr>
    </div>
  );
};
