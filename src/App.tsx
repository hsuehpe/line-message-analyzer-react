import './App.css';
import Home from './views/Home'
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
        <Route path="/analyze">
          analyze
        </Route>
      </Switch>
    </div>
  );
}

export default App;
