import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import RecipesProvider from './context/RecipesProvider';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import DrinksInProgress from './pages/DrinksInProgress';
import MealRecipe from './pages/MealRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import MealInProgress from './pages/MealInProgress';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorites from './pages/Favorites';

function App() {
  return (
    <main className="">
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ MealRecipe } />
          <Route exact path="/drinks/:id" component={ DrinkRecipe } />
          <Route exact path="/drinks/:id/progress" component={ DrinksInProgress } />
          <Route exact path="/meals/:id/progress" component={ MealInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </RecipesProvider>
    </main>
  );
}
export default App;
