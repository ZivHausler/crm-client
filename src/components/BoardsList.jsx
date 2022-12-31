import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import LogoutButton from "../general-components/LogoutButton";
import boards from "../utils/boards.json";
import MyBoards from "./MyBoards";

const BoardsList = () => {
  const [myBoards, setMyBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const token = useGetTokenFromLocalStorage();
  const history = useHistory();

  useEffect(() => {
    // function to get all the boards on this page load
    if (!token) history.push("/login");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8081/user/getAll", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setMyBoards(result.data["My_Boards"]);
        setSharedBoards(result.data["Shared_Boards"]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div
      className={`min-h-[100vh] w-full bg-gray-100 flex flex-col justify-center items-center`}
    >
      <LogoutButton />
      <MyBoards boards={myBoards} head={"My Boards"} />
      <MyBoards boards={sharedBoards} head={"Shared Boards"} />
    </div>
  );
};

export default BoardsList;
