import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";

const AssignToModal = ({
  usersPermissions,
  setShowAssignToUser,
  showAssignToUser,
}) => {
  const token = useGetTokenFromLocalStorage();
  const { boardId } = useParams();

  const assignToUser = (userId) => {
    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      sectionId: showAssignToUser?.sectionId,
      updateObjId: showAssignToUser?.itemId,
      assignedUserId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8081/item/assign-to-user", requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));
    setShowAssignToUser(null);
  };

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-200/20 backdrop-blur-lg flex justify-center items-center">
      <div className="relative max-w-[1000px] w-2/3 bg-white rounded-2xl shadow-task p-12">
        <p
          onClick={() => setShowAssignToUser(null)}
          className="p-3 absolute top-2 left-3 cursor-pointer text-white bg-black rounded-full h-7 w-7 items-center justify-center flex"
        >
          &times;
        </p>
        <h2 className="text-center font-bold text-3xl">Assign To User</h2>
        <div>
          {usersPermissions?.length > 0 ? (
            <div className="mt-6 max-h-32 overflow-x-auto flex justify-center">
              {usersPermissions?.map((userPermission, index) => (
                <div
                  key={index}
                  onClick={() => assignToUser(userPermission?.id)}
                  className="cursor-pointer hover:scale-105 hover:bg-[#f3c5c5]/30 transition-all duration-75 flex flex-col justify-center items-center rounded-lg m-2 shadow bg-gray-200/50 w-40 px-5 h-20"
                >
                  <p className="font-bold">{userPermission?.fullName}</p>
                  <p className="font-thin">{userPermission?.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-10">Your board is currently empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignToModal;
