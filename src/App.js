import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import ApplicationBar from './ApplicationBar';
import { Slide } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import { useState } from 'react';
import { ReactSession } from "react-client-session";
import ServiceDetails from './ServiceDetails';
import AccountPage from './AccountPage';

function App() {
  ReactSession.setStoreType("localStorage");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ApplicationBar />
            <Home />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          <Route path="/services/:serviceid">
            <ApplicationBar />
            <ServiceDetails />
          </Route>
          <Route path="/:username">
            <ApplicationBar />
            <AccountPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
