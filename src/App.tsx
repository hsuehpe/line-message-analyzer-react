import './App.css';
import Home from './views/Home'
import Analytics from './views/Analytics';
import {
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/analytics">
          <Analytics />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
