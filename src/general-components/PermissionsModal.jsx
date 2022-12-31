import React, { useEffect, useState } from "react";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";

const PermissionsModal = ({
  boardId,
  updateUserPermission,
  setShowUserPermissions,
  usersPermissions,
  setUsersPermissions,
}) => {
  const token = useGetTokenFromLocalStorage();

  useEffect(() => {
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
        // setUsersPermissions(
        //   result.data.filter((user) => user.permission !== "ADMIN")
        // );
        setUsersPermissions(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const permissions = ["USER", "LEADER"];

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-200/20 backdrop-blur-lg flex justify-center items-center">
      <div className="relative h-1/2 w-1/2 bg-white rounded-2xl shadow-task p-12">
        <p
          onClick={() => setShowUserPermissions(false)}
          className="p-3 absolute top-2 left-3 cursor-pointer text-white bg-black rounded-full h-7 w-7 items-center justify-center flex"
        >
          &times;
        </p>
        <h2 className="text-center font-bold text-3xl">Users Permissions</h2>
        <div>
          {usersPermissions?.length > 0 ? (
            <div className="mt-6 max-h-40 overflow-y-auto  flex flex-col justify-center">
              {usersPermissions?.map((userPermission, index) => {
                if (userPermission?.permission === "ADMIN") return;
                return (
                  <div
                    key={index}
                    className="flex justify-around items-center py-1 rounded-full shadow bg-gray-200/50 my-1"
                  >
                    <p
                      onClick={() =>
                        updateUserPermission(0, userPermission?.user?.id)
                      }
                      className="bg-black text-white rounded-full h-5 w-5 items-center justify-center flex cursor-pointer"
                    >
                      &times;
                    </p>
                    <p>{userPermission?.user?.fullName}</p>
                    <p>{userPermission?.user?.email}</p>
                    <select
                      onChange={(e) =>
                        updateUserPermission(
                          e.target.value,
                          userPermission?.user?.id
                        )
                      }
                      className="bg-transparent"
                    >
                      {permissions.map((permission, index) => (
                        <option
                          key={index}
                          selected={permission === userPermission.permission}
                          value={index + 1}
                        >
                          {permission}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center mt-10">Your board is currently empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionsModal;
