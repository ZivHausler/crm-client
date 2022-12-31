import React from "react";
import { useHistory } from "react-router-dom";
import logout from "../icons/logout.png";

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to log out?")) return;

    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <img
      onClick={handleLogout}
      src={logout}
      className={`h-7 cursor-pointer absolute top-0 mt-0.5 left-[10px] scale-x-[-1]`}
      alt=""
    />
  );
};

export default LogoutButton;
