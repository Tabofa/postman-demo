import React from 'react';
import './App.css';
import ContentTable from './Components/ContentTable';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EditPage from './Components/EditPage';
import { setUser } from './Tools/Utils';
import SendFeedback from './Components/SendFeedback';
import ViewFeedback from './Components/ViewFeedback';
import ThankYou from './Components/ThankYou';

function App() {
  setUser()
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/edit/:id' component={EditPage} />
          <Route path='/feedback/view' component={ViewFeedback} />
          <Route path='/feedback' component={SendFeedback} />
          <Route path='/thankyou' component={ThankYou} />
          <Route path='/' component={ContentTable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
