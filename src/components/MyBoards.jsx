import React from "react";
import { useHistory } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import BoardTemplate from "../general-components/BoardTemplate";

const MyBoards = ({ boards, head }) => {
  const history = useHistory();
  const token = useGetTokenFromLocalStorage();

  const insertBoardInput = () => {
    const boardName = prompt("Enter a name for the new board");
    if (boardName?.length <= 0) return;
    const boardDescription = prompt("Enter a description for the new board");
    createBoard(boardName, boardDescription);
  };

  const createBoard = (name, description = "") => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
      description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/board/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.id);
        if (result.statusCode !== 201) {
          alert(result.message);
          return;
        }
        history.push(`/board/${result.data.id}`);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className={`bg-white/60 p-3 m-5 w-5/6 rounded-2xl shadow-task`}>
      <h2 className={`text-center font-bold text-3xl underline my-4`}>
        {head}
      </h2>
      <div className={`flex flex-wrap justify-center items-center`}>
        {boards.length > 0 ? (
          boards.map((board) => (
            <BoardTemplate key={board.id} board={board} head={head} />
          ))
        ) : (
          <div>There are currently no boards in this list</div>
        )}
      </div>
      {head !== "Shared Boards" && (
        <div className={`w-full flex justify-center items-center mt-3`}>
          <button
            onClick={insertBoardInput}
            className={`px-3 py-2 border shadow rounded-lg m-2`}
          >
            + Create Board
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBoards;
