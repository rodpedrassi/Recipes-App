import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Recipes from './Components/Recipes';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <main className="">
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </main>

  );
}

export default App;
