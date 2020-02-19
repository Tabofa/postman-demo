import React from 'react';
import './App.css';
import ContentTable from './Components/ContentTable';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EditPage from './Components/EditPage';
import { setUser } from './Tools/Utils';

function App() {
  setUser()
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/edit/:id' component={EditPage} />
          <Route path='/' component={ContentTable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
