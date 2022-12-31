import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import PermissionsModal from "../general-components/PermissionsModal";
import BoardHeader from "./BoardHeader";
import CommentsMenu from "./CommentsMenu";
import MessagesMenu from "./MessagesMenu";
import Section from "./Section";
import UserSettings from "./UserSettings";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import AssignToModal from "../general-components/AssignToModal";
import { v4 as uuidv4 } from "uuid";

let stompClient;

const Board = () => {
  const lastDivRef = useRef();
  const token = useGetTokenFromLocalStorage();
  const history = useHistory();

  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [myPermission, setMyPermission] = useState(1);
  const [showUserPermissions, setShowUserPermissions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showAssignToUser, setShowAssignToUser] = useState(null);

  const [messages, setMessages] = useState([]);
  const [usersPermissions, setUsersPermissions] = useState([]);
  const [showComments, setShowComments] = useState({
    itemId: -1,
    boardId,
  });
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    importance: [],
  });

  useEffect(() => {
    if (!board) return;
    fetchUserPermissionsInBoard();
    connect();
    return () => {
      stompClient.disconnect();
    };
  }, [board]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8081/ws");
    stompClient = over(Sock);
    stompClient.debug = null;
    stompClient.connect({}, onConnected, (error) => {
      console.log("THIS DIDN'T WORK!" + error);
    });
  };

  const onConnected = () => {
    subscribeToFunctions();
  };

  const subscribeToFunctions = () => {
    // subscribe to board changes (e.g. name, description, etc...)
    stompClient.subscribe(`/board/${boardId}`, (response) => {
      console.log(`The board's header has been changed.`);
      fetchWholeBoard();
      fetchNotifications();
    });

    // subscribe to section changes (e.g. name)
    stompClient.subscribe(`/section/${boardId}`, (response) => {
      console.log(`A section was changed -> Either created or updated`);
      fetchWholeBoard();
      fetchNotifications();
    });

    // subscribe to item changes (e.g. name, status, type, etc...)
    stompClient.subscribe(`/item/${boardId}`, (response) => {
      console.log(`A item was changed -> Either created or updated`);
      fetchWholeBoard();
      fetchNotifications();
    });

    // subscribe to attribute changes (e.g. status delete, type creation, etc...)
    stompClient.subscribe(`/attribute/${boardId}`, (response) => {
      console.log(`An attribute was changed -> Either created or updated`);
      fetchWholeBoard();
      fetchNotifications();
    });

    // subscribe to user changes (e.g. status delete, type creation, etc...)
    stompClient.subscribe(`/userPermission/${boardId}`, (response) => {
      console.log(
        `A user permission was changed -> Either added, updated or removed`
      );
      fetchWholeBoard();
      fetchNotifications();
    });

    stompClient.subscribe(`/notification/${boardId}`, (response) => {
      console.log(
        `A notification has been modified -> Either removed or created`
      );
      fetchNotifications();
    });
  };

  useEffect(() => {
    if (
      filters["status"].length <= 0 &&
      filters["importance"].length <= 0 &&
      filters["type"].length <= 0
    ) {
      fetchWholeBoard();
      return;
    }

    console.log("Fetching filtered items!");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(filters);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8081/section/filter-items`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        console.log("filtered sections:", result.data);
        const tempBoard = { ...board };
        tempBoard["sections"] = result.data;
        setBoard(tempBoard);
      })

      .catch((error) => console.log("error", error));
  }, [filters]);

  const deleteItem = (itemId) => {
    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify([itemId]);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8081/item", requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));
  };

  // GET THE BOARD FROM THE DB!
  const fetchWholeBoard = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8081/board`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          history.push("/board");
        }
        setBoard(result.data);
        setMyPermission(result.data?.userPermission);
      })
      .catch((error) => console.log("error", error));
  };

  const colors = [
    "#a25cdc",
    "#0086c0",
    "#fdab3d",
    "#027f4b",
    "#7f5346",
    "#e2435c",
  ];

  const updateUserPermission = (permissionId, userId) => {
    let email;
    if (!userId)
      email = prompt(
        "Which user would you like to add to this board?\nInsert his email address."
      );

    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId,
      email,
      permissionId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/user/update-user-to-board", requestOptions);
    // .then((response) => response.json())
    // .then((result) => {
    //   if (result.statusCode !== 200) {
    //     alert(result.message);
    //     return;
    //   }
    //   console.log("PERMISSION USERS:", result.data);
    //   setUsersPermissions(result.data);
    // })
    // .catch((error) => console.log("error", error));
  };

  const fetchUserPermissionsInBoard = () => {
    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8081/user/getAll-users-permissions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setUsersPermissions(
          result.data.filter((user) => user.permission !== "ADMIN")
        );
      })
      .catch((error) => console.log("error", error));
  };

  const createRandomColor = (index) => {
    return colors[index % colors.length];
  };

  const messagesMenuHandle = () => {
    setShowSettings(false);
    setShowComments({
      itemId: -1,
    });
    setShowMessages(!showMessages);
  };

  const commentsMenuHandle = (taskId, sectionId) => {
    setShowMessages(false);
    setShowSettings(false);

    if (taskId === showComments.itemId)
      setShowComments({
        itemId: -1,
      });
    else setShowComments({ itemId: taskId, sectionId, boardId });
  };

  const settingsMenuHandle = () => {
    setShowComments({
      itemId: -1,
    });
    setShowMessages(false);
    setShowSettings(!showSettings);
  };

  const onBoardChangeHandler = (field, e) => {
    if (e.key === "Enter") {
      editBoardHeader(boardId, e.target.value, field);
      e.target.blur();
    }
  };

  const editBoardHeader = (boardId, content, field) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fieldName: field,
      content,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8081/board/update?field=${field.toUpperCase()}`,
      requestOptions
    )
      // .then((response) => console.log(response))
      // .then((result) => {
      //   console.log(result);
      //   if (result.statusCode !== 200) {
      //     alert(result.message);
      //     return;
      //   }
      //   const tempBoard = { ...board };
      //   tempBoard[field.toLowerCase()] = result.data[field.toLowerCase()];
      //   setBoard(tempBoard);
      // })
      .catch((error) => console.log("error", error));
  };

  const postToDB = (type, name, force) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = `http://localhost:8081/${type}?force=${force}`;
    console.log(url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 409) {
          // eslint-disable-next-line no-restricted-globals
          const toAdd = confirm(
            `I found pretty similar other ${type} to the one you gave me (${name}).\nWere you looking for one of these?\n\n${result.data.map(
              (attribute, index) => "\t" + index + ". " + attribute?.name + "\n"
            )}\nTo abort the action please press "Cancel". To continue, press "OK".`
          );
          if (toAdd) postToDB(type, name, true);
        }
      })
      // .then((response) => response.json())
      // .then((result) => {
      //   // console.log(result);
      //   if (result.statusCode !== 201) {
      //     alert(result.message);
      //     return;
      //   }
      //   const tempBoard = { ...board };

      //   if (type === "section") {
      //     tempBoard["sections"] = [...result.data];
      //     setBoard(tempBoard);
      //     lastDivRef.current.scrollIntoView({ behavior: "smooth" });
      //   } else if (type === "status") {
      //     tempBoard["statuses"] = [...result.data];
      //     setBoard(tempBoard);
      //   } else if (type === "type") {
      //     tempBoard["types"] = [...result.data];
      //     setBoard(tempBoard);
      //   }
      // })
      .catch((error) => console.log("error", error));
  };

  const createNew = (type) => {
    if (board?.userPermission < 3) return;
    const name = prompt("Please insert a name for the new " + type);
    if (!name || name?.length <= 0) return;
    postToDB(type, name, false);
  };

  const editSectionTitle = (sectionId, content) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fieldName: "NAME",
      content,
      objectsIdsRequest: {
        sectionId,
      },
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/section/update?field=NAME", requestOptions)
      // .then((response) => response.json())
      // .then((result) => {
      //   console.log(result);
      //   if (result.statusCode !== 200) {
      //     alert(result.message);
      //     return;
      //   }
      //   const tempBoard = { ...board };
      //   tempBoard["sections"] = tempBoard["sections"].map((section) =>
      //     section.id === result.data.id ? result.data : section
      //   );
      //   setBoard(board);
      // })
      .catch((error) => console.log("error", error));
  };

  const createNewTask = (newTask) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      parentItemId: newTask?.parentItemId,
      name: newTask?.name,
      sectionId: newTask?.sectionId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/item", requestOptions);
    // .then((response) => response.json())
    // .then((result) => {
    //   if (result.statusCode !== 201) {
    //     alert(result.message);
    //     return;
    //   }
    //   console.log("new items in section:", result.data);
    //   const tempBoard = { ...board };
    //   tempBoard.sections = tempBoard.sections.map((section) => {
    //     if (section.id === newTask?.sectionId) {
    //       section.items = [...result.data.items];
    //       return section;
    //     }
    //     return section;
    //   });
    //   setBoard(tempBoard);
    // })
    // .catch((error) => console.log("error", error));
  };

  const editTaskTypeOrStatus = (sectionId, taskId, object, type) => {
    console.log(sectionId, taskId, object, type);
  };

  const fetchNotifications = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8081/notification/getAll-inBoard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setMessages(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  // IT DOESN'T ONLY EDIT THE TITLE!
  const editTaskTitle = (sectionId, taskId, content, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fieldName: type.toUpperCase(),
      content,
      objectsIdsRequest: {
        sectionId,
        updateObjId: taskId,
      },
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8081/item/update?field=${type.toUpperCase()}`,
      requestOptions
    );
    // .then((response) => response.json())
    // .then((result) => {
    //   if (result.statusCode !== 200) {
    //     alert(result.message);
    //     return;
    //   }
    //   const tempBoard = { ...board };
    //   tempBoard["sections"] = tempBoard["sections"].map((section) =>
    //     section.id === result.data.id ? result.data : section
    //   );
    //   setBoard(tempBoard);
    // })
    // .catch((error) => console.log("error", error));
  };

  return (
    <div className="relative">
      {showUserPermissions && (
        <PermissionsModal
          boardId={boardId}
          updateUserPermission={updateUserPermission}
          setShowUserPermissions={setShowUserPermissions}
          usersPermissions={usersPermissions}
          setUsersPermissions={setUsersPermissions}
        />
      )}

      {showAssignToUser && (
        <AssignToModal
          usersPermissions={board?.members}
          setShowAssignToUser={setShowAssignToUser}
          showAssignToUser={showAssignToUser}
        />
      )}

      <BoardHeader
        setShowUserPermissions={setShowUserPermissions}
        updateUserPermission={updateUserPermission}
        userPermission={myPermission}
        settingsMenuHandle={settingsMenuHandle}
        showMessages={showMessages}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
        setFilters={setFilters}
        filters={filters}
        createNew={createNew}
        messagesMenuHandle={messagesMenuHandle}
        board={board}
        messages={messages}
        onBoardChangeHandler={onBoardChangeHandler}
      />

      <UserSettings boardId={boardId} showSettings={showSettings} />

      <MessagesMenu
        messages={messages}
        fetchNotifications={fetchNotifications}
        boardId={boardId}
        setShowMessages={setShowMessages}
        showMessages={showMessages}
      />
      <CommentsMenu
        stompClient={stompClient}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      <div className={`mt-8`}>
        {board?.sections?.length > 0 ? (
          board?.sections?.map((section, index) => (
            <Section
              setShowAssignToUser={setShowAssignToUser}
              showAssignToUser={showAssignToUser}
              deleteItem={deleteItem}
              userPermission={myPermission}
              types={board.types}
              statuses={board.statuses}
              commentsMenuHandle={commentsMenuHandle}
              key={`section-${section?.id}`}
              section={section}
              color={createRandomColor(index)}
              editSectionTitle={editSectionTitle}
              createNewTask={createNewTask}
              editTaskTitle={editTaskTitle}
              editTaskTypeOrStatus={editTaskTypeOrStatus}
            />
          ))
        ) : (
          <div className="w-full h-[40vh] flex flex-col justify-center items-center">
            <p>Your board is empty.</p>
            <p>Maybe consider creating new sections?</p>
          </div>
        )}

        <div className="pt-36" ref={lastDivRef}></div>
      </div>
    </div>
  );
};

export default Board;
