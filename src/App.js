import {BrowserRouter, Switch,Route} from "react-router-dom";
import './App.css';
import Create from './views/Create'
import Dashboard from "./views/Dashboard";
import Update from "./views/Update";
function App() {
  return (
    <div>
      <BrowserRouter>
      <fieldset>
        <legend>App.jsx</legend>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/authors/:id/edit">
            <Update />
          </Route>
        </Switch>
      </fieldset>
      </BrowserRouter>
    </div>
  );
}

export default App;
