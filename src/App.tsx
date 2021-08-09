import './App.css';
import Home from './views/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/analyze">
            analyze
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
