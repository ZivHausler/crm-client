import React, { useState } from "react";
import Arrow from "../general-components/Arrow";
import deleteImg from "../icons/deleteImg.png";
import { CreateSubTask } from "./Create";
import { SubTask } from "./SubTask";
import comments from "../icons/comments.png";
import Status from "../general-components/Status";
import Type from "../general-components/Type";
import Priority from "../general-components/Priority";
import AssignToUser from "../general-components/AssignToUser";

const Task = ({
  showAssignToUser,
  setShowAssignToUser,
  deleteItem,
  types,
  statuses,
  task,
  color,
  commentsMenuHandle,
  editTaskTitle,
  createNewTask,
  editTaskTypeOrStatus,
  userPermission,
}) => {
  const [hideSubtasks, setHideSubtasks] = useState(true);

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      editTaskTitle(task?.sectionId, task?.id, e.target.value, "name");
      e.target.blur();
    }
  };

  const handleAttributeChange = (attributeId, type) => {
    editTaskTitle(task?.sectionId, task?.id, attributeId, type);
  };

  return (
    <div className={`relative`}>
      <div
        className={`flex gap-2 relative py-1 items-center px-2 hover:bg-gray-100`}
      >
        <div
          style={{ background: color }}
          className={`w-[6px] absolute top-0 left-0 h-full`}
        ></div>
        <div className="flex justify-between">
          <div className="flex">
            <div className={`w-7 flex items-center justify-end`}>
              {(task?.subItems?.length > 0 || userPermission >= 2) && (
                <Arrow show={hideSubtasks} display={setHideSubtasks} />
              )}
            </div>
            {userPermission >= 3 ? (
              <input
                disabled={userPermission < 3}
                onKeyDown={handleInputChange}
                defaultValue={task?.title}
                className={`rounded-md py-1 pl-1 bg-transparent w-[290px]`}
              />
            ) : (
              <p className="rounded-md py-1 pl-1 bg-transparent w-[290px]">
                {task?.title}
              </p>
            )}
          </div>
          <div className={`flex w-20 gap-1 items-center`}>
            {userPermission >= 3 && (
              <img
                onClick={() => deleteItem(task?.id)}
                className={`h-5 cursor-pointer`}
                src={deleteImg}
                alt=""
              />
            )}
            <img
              className={`h-5 cursor-pointer`}
              onClick={() => commentsMenuHandle(task?.id, task?.sectionId)}
              src={comments}
              alt={"comment"}
            />
          </div>
        </div>
        <div className="flex w-2/3 justify-between items-center">
          {types?.length > 0 && (
            <Type
              type={task?.type}
              types={types}
              handleAttributeChange={handleAttributeChange}
            />
          )}

          {statuses?.length > 0 && (
            <Status
              status={task?.status}
              statuses={statuses}
              handleAttributeChange={handleAttributeChange}
            />
          )}
          <Priority
            priority={task?.importance}
            handleAttributeChange={handleAttributeChange}
          />
          <AssignToUser
            userPermission={userPermission}
            item={task}
            itemId={task.id}
            sectionId={task.sectionId}
            setShowAssignToUser={setShowAssignToUser}
            showAssignToUser={showAssignToUser}
          />
        </div>
      </div>
      <hr className={`absolute top-[-0.5px] w-full h-1 left-0 -z-10`}></hr>
      {!hideSubtasks && (
        <div className={`px-7 mt-3`}>
          <div className={`mb-4 shadow-task rounded-[10px] relative`}>
            {task?.subItems?.map((subItem, index) => (
              <SubTask
                deleteItem={deleteItem}
                types={types}
                statuses={statuses}
                index={index}
                commentsMenuHandle={commentsMenuHandle}
                key={`subtask-${subItem?.id}`}
                sub_task={subItem}
                color={color}
                editTaskTitle={editTaskTitle}
                editTaskTypeOrStatus={editTaskTypeOrStatus}
                userPermission={userPermission}
                setShowAssignToUser={setShowAssignToUser}
                showAssignToUser={showAssignToUser}
              />
            ))}
            {userPermission >= 2 && (
              <CreateSubTask
                createNewTask={createNewTask}
                sectionIndex={task.sectionId}
                taskIndex={task.id}
                color={color}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
