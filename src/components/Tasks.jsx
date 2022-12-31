import React from "react";
import { CreateTask } from "./Create";
import Task from "./Task";

const Tasks = ({
  showAssignToUser,
  setShowAssignToUser,
  deleteItem,
  types,
  statuses,
  section,
  color,
  commentsMenuHandle,
  createNewTask,
  editTaskTitle,
  editTaskTypeOrStatus,
  userPermission,
}) => {
  return (
    <div className={``}>
      {section.items?.map((task, index) => (
        <Task
          setShowAssignToUser={setShowAssignToUser}
          showAssignToUser={showAssignToUser}
          deleteItem={deleteItem}
          userPermission={userPermission}
          types={types}
          statuses={statuses}
          key={`task-${task.id}`}
          task={task}
          color={color}
          commentsMenuHandle={commentsMenuHandle}
          createNewTask={createNewTask}
          editTaskTitle={editTaskTitle}
          editTaskTypeOrStatus={editTaskTypeOrStatus}
        />
      ))}
      {userPermission >= 2 && (
        <CreateTask
          sectionIndex={section.id}
          createNewTask={createNewTask}
          color={color}
        />
      )}
    </div>
  );
};

export default Tasks;
