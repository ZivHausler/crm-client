import { useEffect, useState } from "react";

const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET;
const SLACK_REDIRECT_URI = process.env.REACT_APP_SLACK_REDIRECT_URI;

export const LoginWithSlack = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    // Redirect the user to the Slack OAuth2 authorization URL
    window.location.href = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_REDIRECT_URI}&scope=channels:history,channels:read`;
  };

  useEffect(() => {
    // If the user was redirected back to the callback URL with an authorization code,
    // exchange the code for an access token
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      setLoading(true);
      fetch("https://slack.com/api/oauth.v2.access", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: SLACK_CLIENT_ID,
          client_secret: SLACK_CLIENT_SECRET,
          code,
          redirect_uri: SLACK_REDIRECT_URI,
        }).toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          // Save the access token in the browser's local storage
          localStorage.setItem("slackAccessToken", data.access_token);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <div
        onClick={handleSignIn}
        className={`cursor-pointer shadow-lg items-center color-black bg-white rounded-full flex font-sans text-xl w-[40px] h-[40px] justify-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-[24px] w-[24px]`}
          viewBox="0 0 122.8 122.8"
        >
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          ></path>
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          ></path>
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          ></path>
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          ></path>
        </svg>
      </div>
    </div>
  );
};
