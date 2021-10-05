import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import DrinksPage from './Pages/DrinksPage';
import ProfilePage from './Pages/ProfilePage';
import Login from './Pages/Login';
import ExplorePage from './Pages/ExplorePage';
import ExploreMealsPage from './Pages/ExploreMealsPage';
import ExploreMealsByIngredients from './Pages/ExploreMealsByIngredient';
import ExploreDrinksPage from './Pages/ExploreDrinksPage';
import ExploreDrinksByIngredient from './Pages/ExploreDrinksByIngredient';
import ExploreMealsByArea from './Pages/ExploreMealsByArea';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DrinkDetails from './Pages/DrinkDetails';
import MealDetails from './Pages/MealDetails';
import MealsPage from './Pages/MealsPage';
import ExploreRecipesByIngredient from './Pages/ExploreMealsRecipesByIngredient';
import ExploreDrinksRecipesByIngredient from './Pages/ExploreDrinksRecipesByIngredient';
import NotFound from './Pages/NotFound';
import MealsInProgress from './Pages/MealsInProgress';
import DrinkInProgress from './Pages/DrinkInProgress';

function App() {
  // const { randomMeal } = useContext(RecipesContext);
  // const { idMeal } = randomMeal;
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MealsPage } />
          <Route exact path="/comidas/nome/:nome" component={ MealsPage } />
          <Route
            exact
            path="/comidas/ingrediente/:ingrediente"
            component={ ExploreRecipesByIngredient }
          />
          <Route
            exact
            path="/comidas/primeira-letra/:letra"
            component={ MealsPage }
          />
          <Route exact path="/perfil" component={ ProfilePage } />
          <Route exact path="/bebidas" component={ DrinksPage } />
          <Route
            exact
            path="/bebidas/ingrediente/:ingrediente"
            component={ ExploreDrinksRecipesByIngredient }
          />
          <Route exact path="/explorar" component={ ExplorePage } />
          <Route exact path="/explorar/comidas" component={ ExploreMealsPage } />
          <Route exact path="/comidas/:idMeal" component={ MealDetails } />
          <Route exact path="/bebidas/:idDrink" component={ DrinkDetails } />
          <Route exact path="/bebidas/:idDrink/in-progress" component={ DrinkInProgress } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreMealsByIngredients }
          />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinksPage } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksByIngredient }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreMealsByArea }
          />
          <Route
            exact
            path="/receitas-feitas"
            component={ DoneRecipes }
          />
          <Route
            exact
            path="/receitas-favoritas"
            component={ FavoriteRecipes }
          />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/comidas/:id/in-progress" component={ MealsInProgress } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>

  );
}

export default App;
