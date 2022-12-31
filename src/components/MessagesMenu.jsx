import React, { useEffect } from "react";
import deleteImg from "../icons/deleteImg.png";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import emptyNotificationsList from "../icons/empty-notifications-list.png";

const MessagesMenu = ({
  showMessages,
  boardId,
  messages,
  fetchNotifications,
}) => {
  const token = useGetTokenFromLocalStorage();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const convertDates = (dateString) => {
    const date = new Date(dateString);

    const timeOptions = {
      timeZone: "Asia/Jerusalem",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    const dateOptions = {
      timeZone: "Asia/Jerusalem",
      hour12: false,
    };

    const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
    const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
    return dateFormatter.format(date) + " " + timeFormatter.format(date);
  };

  const deleteNotification = (ids) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(ids);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8081/notification/delete", requestOptions);
    // .then((response) => response.json())
    // .then((result) => {
    //   if (result.statusCode !== 204) {
    //     alert(result.message);
    //     return;
    //   }
    //   setMessages(result.data);
    // })
    // .catch((error) => console.log("error", error));
  };

  return (
    <div
      style={{
        transition: "all 0.4s ease-in-out",
        right: showMessages ? "-1px" : "-60%",
      }}
      className={`min-w-[300px] w-1/3 h-[100vh] fixed top-8 z-40`}
    >
      <div className={`p-2 overflow-auto h-full pb-14 bg-black text-white`}>
        {messages?.length > 0 && (
          <button
            onClick={() =>
              deleteNotification(messages.map((message) => message?.id))
            }
          >
            Delete all messages
          </button>
        )}
        {messages?.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center justify-between m-2 shadow rounded-xl p-2 bg-gray-900`}
            >
              <div className="pr-4">
                <p className={`underline text-md font-bold`}>{message?.name}</p>
                <p className={`font-light mt-1`}>{message?.description}</p>
                <p className={`font-thin text-sm mt-2 text-right`}>
                  {convertDates(message?.notificationDateTime)}
                </p>
              </div>
              <div
                onClick={() => deleteNotification([message?.id])}
                className="w-10 shadow bg-white rounded-full p-1 cursor-pointer"
              >
                <img className="w-10" src={deleteImg} alt="delete" />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full mt-10 text-center items-center font-light px-2 flex flex-col gap-2">
            <p>You currently have no new notifications.</p>
            <p>
              But don't worry... I will keep you up to date if anything changes!
            </p>
            <img
              className="max-w-[300px] mt-10 opacity-50"
              src={emptyNotificationsList}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesMenu;
