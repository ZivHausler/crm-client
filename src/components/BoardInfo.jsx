import React from "react";

const BoardInfo = ({ onBoardChangeHandler, board, userPermission }) => {
  return (
    <div className="flex-1 flex flex-col">
      <input
        disabled={userPermission < 3}
        onKeyDown={(e) => onBoardChangeHandler("NAME", e)}
        className={`px-2 mb-1 font-bold text-3xl font-sans w-full z-50`}
        defaultValue={board?.name}
      />
      <input
        disabled={userPermission < 3}
        onKeyDown={(e) => onBoardChangeHandler("DESCRIPTION", e)}
        className={`px-2 font-light text-md font-sans w-full z-50`}
        defaultValue={board?.description}
        placeholder="Insert a description that describes best your board's purpose"
      />
    </div>
  );
};

export default BoardInfo;
