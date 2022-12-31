import React, { useState, useEffect } from "react";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import LogoutButton from "../general-components/LogoutButton";
import arrow from "../icons/arrow.png";

const Nav = ({
  openMessagesMap,
  showSettings,
  messages,
  settingsMenuHandle,
}) => {
  const [user, setUser] = useState(null);
  const token = useGetTokenFromLocalStorage();
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8081/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUser(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="h-8 w-full bg-black relative z-50">
      <LogoutButton />
      <div className="m-auto w-[90%] h-full flex items-center justify-between ">
        <div className="flex gap-1">
          <span className="text-white font-black">SHZ</span>
          <span className="text-white">Project Manager</span>
        </div>
        <div
          onClick={settingsMenuHandle}
          className="cursor-pointer relative flex gap-1 items-center justify-center"
        >
          <p className="text-white">Notification Settings</p>
          {/* <p
            style={{
              rotate: showSettings ? "180deg" : "0deg",
              transition: "all 0.2s ease-in-out",
            }}
            className=""
          >
            ^
          </p> */}
          <img
            style={{
              rotate: showSettings ? "180deg" : "0deg",
              transition: "all 0.2s ease-in-out",
            }}
            className="p-[3px] bg-white rounded-full w-4 select-none -right-[20px] top-0 text-white"
            src={arrow}
            alt=""
          />
        </div>
        <div className="flex gap-5">
          {user && <span className="text-white">{user?.email}</span>}
          {messages?.length > 0 ? (
            <div className="relative">
              <span className="flex items-center justify-center h-[22px] w-[22px] shadow-xl">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50"></span>
                <span
                  onClick={openMessagesMap}
                  className="relative inline-flex rounded-full h-[22px] w-[22px] bg-red-500/80 justify-center items-center font-bold cursor-pointer select-none text-gray-900/"
                >
                  {messages.length}
                </span>
              </span>
            </div>
          ) : (
            <div className="relative">
              <span className="flex items-center justify-center h-[22px] w-[22px] shadow-xl">
                <span
                  onClick={openMessagesMap}
                  className="relative inline-flex rounded-full h-[22px] w-[22px] bg-green-500 justify-center items-center font-bold cursor-pointer select-none text-gray-900/"
                >
                  {0}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
