import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

export default function DrinkInProgress() {
  const [drinkDetails, setDrinkDetails] = useState(null);
  const [ingredientList, setIngredientList] = useState([]);

  // id => API
  const { idDrink } = useParams();

  // ref: Lucas Caribé
  const TWENTY = 20;

  useEffect(() => {
    const fetchDrinkIdAPi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`).then((res) => res.json());
      setDrinkDetails(response.drinks[0]);
    };
    if (idDrink) {
      fetchDrinkIdAPi();
    }
  }, [idDrink]);

  useEffect(() => {
    const lsValue = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lsValue) {
      setIngredientList(lsValue.drinks[idDrink]);
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ drinks: { [idDrink]: [] }, meals: {} }));
    }
  }, [idDrink]);

  useEffect(() => {
    if (drinkDetails && ingredientList.length < 1) {
      const ingredientes = [];
      console.log(ingredientList.length);

      for (let index = 1; index <= TWENTY; index += 1) {
        if (drinkDetails[`strIngredient${index}`]) {
          ingredientes.push({
            [`ingredients${index}`]: drinkDetails[`strIngredient${index}`],
            [`measure${index}`]: drinkDetails[`strMeasure${index}`],
            checked: false,
          });
        }
      }
      setIngredientList(ingredientes);
    }
  }, [drinkDetails, ingredientList]);

  useEffect(() => {
    const lsValue = localStorage.getItem('inProgressRecipes')
        || JSON.stringify({ drinks: {}, meals: {} });

    const oldValue = JSON.parse(lsValue);

    const value = {
      [idDrink]: [...ingredientList],
    };
    const newValue = { ...oldValue, drinks: value };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newValue));
  }, [ingredientList, idDrink]);

  const onCheckboxClick = (index) => {
    const newValue = [...ingredientList];
    newValue[index].checked = !newValue[index].checked;
    setIngredientList(newValue);
  };

  if (!drinkDetails) { return <h1>Loading...</h1>; }

  return (
    <>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="img-Details"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{drinkDetails.strDrink}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{drinkDetails.strCategory}</p>
      {ingredientList.map((ingredient, index) => (
        <label
          key={ index }
          htmlFor={ `ingredient${index + 1}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `ingredient${index + 1}` }
            checked={ ingredient.checked }
            onChange={ () => onCheckboxClick(index) }
          />
          {
            `${ingredient[`ingredients${index + 1}`]} 
                - ${ingredient[`measure${index + 1}`]}`
          }
        </label>
      ))}
      <h3>Instruções</h3>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="startRecipeButton"
        >
          Finalizar Receita
        </button>
      </div>
    </>
  );
}
