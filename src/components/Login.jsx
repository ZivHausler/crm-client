import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginWithGithub from "./LoginWithGithub";
import LoginWithGoogle from "./LoginWithGoogle";
import { LoginWithSlack } from "./LoginWithSlack";

export const Login = ({ email, setEmail }) => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const redirectToRegister = () => {
    setEmail(emailRef.current.value);
    history.push("/register");
  };

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    };

    fetch("http://localhost:8081/user/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode === 400) {
          alert(result.message);
          return;
        }
        const token = result.data.trim();
        if (!token.includes("approve")) {
          setTimeout(() => {
            localStorage.setItem("token", "Bearer " + token);
            setIsLoading(false);
            history.push("/board");
          }, 2000);
        } else {
          alert(
            "Could not log you in, try again later or change the credentials"
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
    // .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="signup-page relative"
      style={{
        backgroundImage: `linear-gradient(to right, #396ee3, #3f7afe, #396ee3)`,
      }}
    >
      {isLoading && (
        <div className="w-full h-[100vh] bg-gray-100/50 backdrop-blur-xl fixed">
          <span className="loader"></span>
          <p className="absolute left-1/2 top-1/2 -translate-y-8 -translate-x-1/2 font-bold">
            Loading...
          </p>
        </div>
      )}
      <div className="login-background-div">
        <h1>Login</h1>
        <form className="login-inputs">
          <input
            required
            ref={emailRef}
            type="email"
            placeholder="Email"
            defaultValue={email}
          />
          <input
            required
            ref={passwordRef}
            placeholder="Password"
            type="password"
          />
          <input
            type={"submit"}
            onClick={login}
            className="login-button login"
          />
        </form>
        <div className="dont-have-account">
          <p>Don't have an account?</p>
          <button
            onClick={redirectToRegister}
            className="login-button register"
          >
            Register
          </button>
        </div>
        <div className="my-5 font-[200] flex flex-col items-center">
          <p>You can also login via</p>
          <div className="flex justify-evenly items-center gap-2 mt-2">
            <LoginWithGoogle setIsLoading={setIsLoading} />
            <LoginWithGithub setIsLoading={setIsLoading} />
            <LoginWithSlack setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
