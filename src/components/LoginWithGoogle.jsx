import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import googleLogo from "../icons/google.png";

const LoginWithGoogle = () => {
  const history = useHistory();

  const handleSignIn = () => {
    // Redirect the user to the Slack OAuth2 authorization URL
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_HOMEPAGE_URI}&scope=user`;
  };

  useEffect(() => {}, []);

  return (
    <div className="cursor-pointer" onClick={handleSignIn}>
      <img
        className={`h-10 bg-white rounded-full p-[5px] shadow-lg`}
        src={googleLogo}
        alt="github-logo"
      />
    </div>
  );
};

export default LoginWithGoogle;
