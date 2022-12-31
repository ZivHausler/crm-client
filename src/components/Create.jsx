import React from "react";
import Status from "../general-components/Status";
import Type from "../general-components/Type";

export const CreateSubTask = ({
  createNewTask,
  sectionIndex,
  taskIndex,
  color,
}) => {
  const onNewSubTaskTitleChangeHandler = (e) => {
    if (e.key === "Enter") {
      const newTask = {
        name: e.target.value,
        sectionId: sectionIndex,
        parentItemId: taskIndex,
      };
      createNewTask(newTask);
      e.target.value = "";
      e.target.blur();
    }
  };

  return (
    <div className={`flex hover:bg-gray-100 relative py-1 items-center pl-2`}>
      <div className={`relative pl-1 flex items-center justify-between`}>
        <input
          onKeyDown={onNewSubTaskTitleChangeHandler}
          className={`rounded-md py-1 pl-1 bg-transparent w-[650px]`}
          placeholder="+ Add sub-item"
        />
        {/* <div className="flex items-center gap-5">
          <Type type={null} />
          <Status status={null} />
        </div> */}
      </div>
      <div
        style={{ borderBottom: `1px solid ${color}`, opacity: 0.4 }}
        className={`absolute right-[100%] top-0 h-1/2 w-[23px] rounded-bl-xl -z-10`}
      ></div>
      <div
        style={{
          background: color,
          opacity: 0.4,
          borderBottomLeftRadius: "10px",
        }}
        className={`w-[6px] absolute top-0 left-0 h-full`}
      ></div>
    </div>
  );
};

export const CreateTask = ({ createNewTask, sectionIndex, color }) => {
  const onNewTaskTitleChangeHandler = (e) => {
    if (e.key === "Enter") {
      const newTask = {
        name: e.target.value,
        sectionId: sectionIndex,
      };
      createNewTask(newTask);
      e.target.value = "";
      e.target.blur();
    }
  };

  return (
    <div className={`flex hover:bg-gray-100 relative py-1 pl-7 items-center`}>
      <div className={``}>
        <div
          style={{ background: color, opacity: 0.4 }}
          className={`w-[6px] absolute top-0 left-0 h-full`}
        ></div>
        <div className={`flex items-center`}>
          <input
            onKeyDown={onNewTaskTitleChangeHandler}
            className={`rounded-md ml-1 py-1 pl-1 bg-transparent w-[650px]`}
            placeholder="+ Add task"
          />
          {/* <div className="flex items-center gap-5">
            <Type type={null} />
            <Status status={null} />
          </div> */}
        </div>
        <hr className="absolute top-[-0.5px] w-full h-1 left-0 -z-10"></hr>
      </div>
    </div>
  );
};
