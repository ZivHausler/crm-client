import React from "react";
import { useHistory } from "react-router-dom";

const BoardTemplate = ({ board, head }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(`/board/${board.id}`)}
      className={`cursor-pointer border rounded-lg text-center p-3 m-2 w-60 h-32 flex flex-col items-center justify-center`}
    >
      <h3 className={`text-xl`}>{board.name}</h3>
      <p className={`font-thin text-sm`}>{board.description}</p>
      {head === "Shared Boards" && (
        <p className="mt-5 text-sm">{board?.creatorUser.email}</p>
      )}
    </div>
  );
};

export default BoardTemplate;
