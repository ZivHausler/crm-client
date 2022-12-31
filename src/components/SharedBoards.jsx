import React from "react";
import BoardTemplate from "../general-components/BoardTemplate";

const SharedBoards = ({ boards }) => {
  return (
    <div className={`bg-white/60 p-5 w-4/5`}>
      {boards.map((board, index) => (
        <BoardTemplate key={index} board={board} />
      ))}
    </div>
  );
};

export default SharedBoards;
