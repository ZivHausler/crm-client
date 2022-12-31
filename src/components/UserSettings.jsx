import React, { useEffect, useState } from "react";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import Toggle from "../general-components/Toggle";

const UserSettings = ({ boardId, showSettings }) => {
  const token = useGetTokenFromLocalStorage();
  const [userSettings, setUserSettings] = useState([]);

  const changeNotificationSetting = (type, userSettingId, bool) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userSettingId,
      [type]: bool,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/settings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setUserSettings(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8081/settings/get-user-settings-in-board`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setUserSettings(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div
      style={{
        top: showSettings ? "32px" : "-150%",
        transition: "all 0.4s ease-in-out",
      }}
      className={`left-1/2 z-40 -translate-x-1/2 fixed bg-gray-100/60 backdrop-blur-md rounded-b-[30px] shadow-lg flex flex-col justify-start items-center py-2 px-40 w-[100%]`}
    >
      <h1 className={`text-5xl font-bold my-8 text-center`}>User settings</h1>
      <div className={`w-full pb-10`}>
        <div className={`flex w-full font-[400] underline`}>
          <p className={`w-1/2`}>Notify me when:</p>
          <p className={`w-1/4 text-center`}>Notify via email</p>
          <p className={`w-1/4 text-center`}>Notify in-app</p>
        </div>
        {userSettings?.map((userSetting) => (
          <div
            key={userSetting?.settingId}
            className={`flex w-full my-2 bg-white/80 p-2 rounded-xl shadow`}
          >
            <p className={`w-1/2 font-thin`}>{userSetting?.setting?.name}</p>
            <Toggle
              changeNotificationSetting={changeNotificationSetting}
              isActive={userSetting?.inEmail}
              type={"inEmail"}
              id={userSetting?.settingId}
            />
            <Toggle
              changeNotificationSetting={changeNotificationSetting}
              isActive={userSetting?.inApp}
              type={"inApp"}
              id={userSetting?.settingId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSettings;
