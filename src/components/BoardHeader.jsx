import React from "react";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import BoardInfo from "./BoardInfo";
import CreateAttributes from "./CreateAttributes";
import Filter from "./Filter";
import Nav from "./Nav";

const BoardHeader = ({
  userPermission,
  settingsMenuHandle,
  messages,
  showMessages,
  showSettings,
  filters,
  setFilters,
  createNew,
  messagesMenuHandle,
  board,
  onBoardChangeHandler,
  updateUserPermission,
  setShowUserPermissions,
}) => {
  return (
    <div
      className={`sticky top-0 z-30 bg-white w-full shadow-md rounded-b-2xl overflow-hidden`}
    >
      <Nav
        settingsMenuHandle={settingsMenuHandle}
        messages={messages}
        showMessages={showMessages}
        boardId={board?.id}
        openMessagesMap={messagesMenuHandle}
        showSettings={showSettings}
      />

      <div
        className={`py-1 w-full flex gap-1 items-center justify-between px-1`}
      >
        <BoardInfo
          userPermission={userPermission}
          onBoardChangeHandler={onBoardChangeHandler}
          board={board}
        />
        <Filter
          userPermission={userPermission}
          filters={filters}
          setFilters={setFilters}
          types={board?.types}
          statuses={board?.statuses}
        />

        {userPermission >= 3 && (
          <CreateAttributes
            createNew={createNew}
            setShowUserPermissions={setShowUserPermissions}
            updateUserPermission={updateUserPermission}
          />
        )}
      </div>
    </div>
  );
};

export default BoardHeader;
