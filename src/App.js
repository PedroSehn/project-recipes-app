import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Provider from './context/Provider';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import ExplorarComidasOuBebidas from './pages/ExplorarComidasOuBebidas';
import BebidasIgredientes from './pages/BebidasIngredientes';
import ComidasIngredientes from './pages/ComidasIngredientes';
import ComidasArea from './pages/ComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import RecipeDetail from './pages/RecipeDetail';
import ReceitasInProgress from './pages/ReceitasInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <RecipeDetail { ...props } type="meals" /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <RecipeDetail { ...props } type="drinks" /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <ReceitasInProgress { ...props } type="meals" /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <ReceitasInProgress { ...props } type="drinks" /> }
        />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidasOuBebidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarComidasOuBebidas } />
        <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasIgredientes }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </Provider>
  );
}

export default App;
