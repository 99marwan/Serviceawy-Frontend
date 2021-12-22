import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import ApplicationBar from './ApplicationBar';
import { Slide } from '@mui/material';
import Login from './Login';

function App() {
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
