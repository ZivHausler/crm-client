import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import githubLogo from "../icons/github.png";

const LoginWithGithub = ({ setIsLoading }) => {
  const history = useHistory();

  const handleSignIn = () => {
    // Redirect the user to the Slack OAuth2 authorization URL
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_HOMEPAGE_URI}&scope=user`;
  };

  useEffect(() => {
    // If the user was redirected back to the callback URL with an authorization code,
    // exchange the code for an access token
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      setIsLoading(true);

      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `http://localhost:8081/user/auth/third-party-login?code=${code}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.statusCode === 200) {
            setTimeout(() => {
              localStorage.setItem("token", "Bearer " + result.data);
              setIsLoading(false);
              history.push("/board");
            }, 2500);
          }
        })
        .catch((error) => {});
    }
  }, []);

  return (
    <div className="cursor-pointer" onClick={handleSignIn}>
      <img
        className={`h-10 bg-white rounded-full p-[3px] shadow-lg`}
        src={githubLogo}
        alt="github-logo"
      />
    </div>
  );
};

export default LoginWithGithub;
