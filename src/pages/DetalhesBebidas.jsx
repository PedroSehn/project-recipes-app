import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import fetchIdBebidas from '../services/fetchIdBebidas';
import shareIcon from '../images/shareIcon.svg';
import getSixCards from '../services/functionsForDetails';
import { fetchRecomendationsMeals } from '../services/fetchIdComidas';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { sendRecipeToGlobalDrinks } from '../redux/actions';
import CardsRecomendations from '../components/CardsRecomendations';

function DetalhesBebidas({ match: { params: { id } }, sendObjToGlobal }) {
  const [objIdReceita, setObjIdReceita] = useState();
  const [objIdRecomentations, setObjRecomentations] = useState();
  const fetchId = async () => {
    setObjIdReceita(await fetchIdBebidas(id));
    setObjRecomentations(await fetchRecomendationsMeals());
  };

  useEffect(() => {
    fetchId();
  }, []);
  console.log(objIdRecomentations);
  useEffect(() => {
    sendObjToGlobal(objIdReceita);
  }, [objIdReceita]);

  const getIngredient = () => {
    if (objIdReceita !== undefined) {
      const entries = Object.entries(objIdReceita);
      const arrayFilteredIngredients = entries
        .filter((ingredientes) => ingredientes[0].includes('strIngredient'))
        .filter((ingredientes2) => ingredientes2[1] !== '')
        .map((ingredientes3) => ingredientes3[1]);
      return arrayFilteredIngredients;
    }
  };

  const getMeasure = () => {
    if (objIdReceita !== undefined) {
      const entries = Object.entries(objIdReceita);
      const measure = entries.filter((measures) => measures[0].includes('strMeasure'))
        .filter((measures2) => measures2[1] !== ' ')
        .map((measures3) => measures3[1]);
      return measure;
    }
  };
  const getIngredientAndMeasure = () => {
    const array = [];
    if (getMeasure() !== undefined && getIngredient() !== undefined) {
      const measure = getMeasure();
      const ingredient = getIngredient();
      const mix = [{
        ingredient,
        measure,
      }];
      for (let i = 0; i < mix[0].ingredient.length; i += 1) {
        array.push(`${mix[0].ingredient[i]} - ${mix[0].measure[i]}`);
      }
      return array;
    }
  };

  const fixDrinks = () => {
    if (getIngredientAndMeasure() !== undefined) {
      const drinks = getIngredientAndMeasure();
      const drinksFilterNull = drinks.filter((drink) => drink !== 'null-null');
      return drinksFilterNull;
    }
  };

  if (objIdReceita === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {console.log(objIdReceita)}
      Detalhes das bebidas
      <img
        width="180px"
        data-testid="recipe-photo"
        src={ objIdReceita.strDrinkThumb }
        alt="recipeFoto"
      />
      <h3 data-testid="recipe-title">{ objIdReceita.strDrink }</h3>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="iconHeard" />
      </button>
      <p data-testid="recipe-category">{objIdReceita.strAlcoholic}</p>
      {fixDrinks().map((element, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
        </div>
      ))}
      <p data-testid="instructions">{ objIdReceita.strInstructions }</p>
      <p data-testid="video">Video</p>
      {getSixCards(objIdRecomentations) !== undefined && getSixCards(objIdRecomentations)
        .map((element, ind) => {
          const { strMeal, strMealThumb } = element;
          const obj = {
            title: strMeal,
            image: strMealThumb,
          };
          return (
            <div key={ ind } data-testid={ `${ind}-recomendation-card` }>
              <CardsRecomendations recomendations={ obj } />
            </div>
          );
        })}
      <button type="button" data-testid="start-recipe-btn">Start recipe</button>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})).isRequired,
  sendObjToGlobal: PropTypes.shape(PropTypes.shape({})).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendObjToGlobal: (drinks) => dispatch(sendRecipeToGlobalDrinks(drinks)),
});

export default connect(null, mapDispatchToProps)(DetalhesBebidas);
