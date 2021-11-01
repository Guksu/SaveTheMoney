import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Account from "../routers/Account";
import Home from "../routers/Home";
import Login from "../routers/Login";
import RegisterUser from "../routers/RegisterUser";
import ShowAll from "../routers/ShowAll";

const AppRouter = () => {
  const [islogin, setIslogin] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) {
      setIslogin(true);
    }
  }, [islogin]);
  return (
    <Router>
      <Switch>
        {islogin ? (
          <>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/account" component={Account}></Route>
            <Route exact path="/showall" component={ShowAll}></Route>
          </>
        ) : (
          <>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/register" component={RegisterUser}></Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
