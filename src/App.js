import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import ApplicationBar from './ApplicationBar';
import { Slide } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App" style={{ background: "#222831" }}>
          <ApplicationBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
