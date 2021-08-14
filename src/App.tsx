import './App.css';
import Home from './views/Home'
import {
  Switch,
  Route
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/analyze">
            analyze
          </Route>
        </Switch>
      </RecoilRoot>
    </div>
  );
}

export default App;
