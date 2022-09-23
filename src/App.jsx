import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Recipes from './Components/Recipes';

function App() {
  return (
    <main className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
        </Switch>
      </BrowserRouter>
    </main>

  );
}

export default App;
