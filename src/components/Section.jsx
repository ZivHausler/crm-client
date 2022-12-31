import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";

const Subject = ({
  setShowAssignToUser,
  showAssignToUser,
  deleteItem,
  types,
  statuses,
  section,
  color,
  commentsMenuHandle,
  editSectionTitle,
  createNewTask,
  editTaskTitle,
  editTaskTypeOrStatus,
  userPermission,
}) => {
  const onSectionNameChangeHandler = (e) => {
    if (e.key === "Enter") {
      editSectionTitle(section?.id, e.target.value);
      e.target.blur();
    }
  };

  return (
    <div className={`mb-10`}>
      <div
        className={`w-full px-8 pt-5 bg-white/50 backdrop-blur-md shadow mb-4 sticky top-[100px] z-20`}
      >
        {userPermission >= 3 ? (
          <input
            disabled={userPermission < 3}
            onKeyDown={onSectionNameChangeHandler}
            style={{ color }}
            className={`px-1 bg-transparent font-bold text-3xl font-sans mb-[2px] w-full`}
            defaultValue={section?.name || ""}
          />
        ) : (
          <p
            style={{ color }}
            className="px-1 bg-transparent font-bold text-3xl font-sans mb-[5px] w-full"
          >
            {section?.name}
          </p>
        )}
      </div>
      <div
        className={`mx-8 shadow-task rounded-[10px] overflow-hidden relative`}
      >
        <Tasks
          showAssignToUser={showAssignToUser}
          setShowAssignToUser={setShowAssignToUser}
          deleteItem={deleteItem}
          userPermission={userPermission}
          statuses={statuses}
          types={types}
          section={section}
          color={color}
          commentsMenuHandle={commentsMenuHandle}
          createNewTask={createNewTask}
          editTaskTitle={editTaskTitle}
          editTaskTypeOrStatus={editTaskTypeOrStatus}
        />
        <div
          style={{ background: color }}
          className={`w-[1px] h-full absolute left-[5px] top-0`}
        ></div>
      </div>
    </div>
  );
};

export default Subject;
