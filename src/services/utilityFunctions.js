export function handleToShareBtn(target, Id, type) {
  const initialLink = 'http://localhost:3000/';
  const copyText = `${initialLink}${type}/${Id}`;
  navigator.clipboard.writeText(copyText);
  if (target.parentNode.innerHTML === '<div>Link copiado!</div>') {
    // empty
  } else {
    target.parentNode.innerHTML = '<div>Link copiado!<div>';
  }
}

export function favoritedItem(id) {
  const favoritedStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoritedStorage !== undefined && favoritedStorage !== null) {
    const isFavorited = favoritedStorage.some((recipe) => recipe.id === id);
    return isFavorited;
  }
}

export function handleFavoritedBtn(recipeID, Id, type, func) {
  const favoriteRecipe = {
    id: recipeID.idDrink || recipeID.idMeal,
    type,
    area: recipeID.strArea || '',
    category: recipeID.strCategory || '',
    alcoholicOrNot: recipeID.strAlcoholic || '',
    name: recipeID.strDrink || recipeID.strMeal,
    image: recipeID.strDrinkThumb || recipeID.strMealThumb,
  };
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const isRecipeFavorited = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .some((recipe) => recipe.id === Id);
  if (isRecipeFavorited) {
    const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = localRecipes.filter((recipe) => recipe.id !== Id);
    func(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  } else {
    const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localRecipes.push(favoriteRecipe);
    func(localRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localRecipes));
  }
}
