import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { RocketsContextProvider } from "./contexts/RocketsContext";
import Loader from "./components/Interface/Loader";
const Launches = React.lazy(() => import("./Screen/Launches"));
const LaunchDetail = React.lazy(() => import("./Screen/LaunchDetail"));
const Auth =React.lazy(()=>import('./Screen/Auth'))

const App = () => {
  const routes = (
       
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("loggedIn") == "true" ? <Redirect to="/login" /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Auth />
          </Route>

          <Route path="/dashboard">
            {localStorage.getItem("loggedIn") == "true" ? <Launches /> : <Redirect to="/launches" />}
          </Route>
      <Route path="/launches" exact render={() => <Launches />} />
      <Route path="/launches/:flightNumber" render={() => <LaunchDetail />} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );

  const fallback = (
    <div className="flex w-screen h-screen justify-center items-center ">
      <Loader />
    </div>
  );

  return (
    <RocketsContextProvider>
      <Suspense fallback={fallback}>
        <Router basename={process.env.PUBLIC_URL}>
          {routes}
        </Router>
      </Suspense>
    </RocketsContextProvider>
  );
};

export default App;
