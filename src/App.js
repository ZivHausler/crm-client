import { useState } from "react";
import Board from "./components/Board";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "./customHooks/useGetTokenFromLocalStorage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import BoardsList from "./components/BoardsList";

function App() {
  const token = useGetTokenFromLocalStorage();
  const [email, setEmail] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/board/:boardId">
          <Board />
        </Route>
        <Route path="/board">
          <BoardsList />
        </Route>
        <Route path="/register">
          <Register email={email} setEmail={setEmail} />
        </Route>
        <Route path="/login">
          <Login email={email} setEmail={setEmail} />
        </Route>
        <Route path="/">
          {token !== null && token.length > 120 ? (
            <Redirect to={`/board`} />
          ) : (
            <Redirect to={"/login"} />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
