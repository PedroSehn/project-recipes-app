import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';

export default function MealsInProgress() {
  const [mealDetails, setMealDetails] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

  // id => API
  const { id } = useParams();

  // ref: Lucas Caribé
  const TWENTY = 20;

  useEffect(() => {
    const fetchMealIdAPi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json());
      setMealDetails(response.meals[0]);
    };
    if (id) {
      fetchMealIdAPi();
    }

    const lsValue = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lsValue) {
      setIngredientList(lsValue.meals[id]);
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ drinks: {}, meals: { [id]: [] } }));
    }
  }, [id]);

  useEffect(() => {
    if (mealDetails && ingredientList.length < 1) {
      const ingredientes = [];

      for (let index = 1; index <= TWENTY; index += 1) {
        if (mealDetails[`strIngredient${index}`]) {
          ingredientes.push({
            [`ingredients${index}`]: mealDetails[`strIngredient${index}`],
            [`measure${index}`]: mealDetails[`strMeasure${index}`],
            checked: false,
          });
        }
      }
      setIngredientList(ingredientes);
    }
  }, [mealDetails, ingredientList]);

  useEffect(() => {
    const lsValue = localStorage.getItem('inProgressRecipes')
        || JSON.stringify({ drinks: {}, meals: {} });

    const oldValue = JSON.parse(lsValue);

    const value = {
      [id]: [...ingredientList],
    };
    const newValue = { ...oldValue, meals: value };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newValue));
  }, [ingredientList, id]);

  const onCheckboxClick = (index) => {
    const newValue = [...ingredientList];
    newValue[index].checked = !newValue[index].checked;
    setIngredientList(newValue);
  };

  // if (!mealDetails) { return <h1>Loading...</h1>; }

  return (
    <>
      <img
        src={ mealDetails.strMealThumb }
        alt="img-Details"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{mealDetails.strMeal}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{mealDetails.strCategory}</p>
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
      <p data-testid="instructions">{mealDetails.strInstructions}</p>
      <div>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="startRecipeButton"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </>
  );
}
