// useEffect(() => {
//   const checkMealsInProgress = Object.keys(meals.inProgress).length;
//   console.log(meals.inProgress, checkMealsInProgress);
//   const checkCocktailsInProgress = Object.keys(cocktails.inProgress).length;
//   console.log(cocktails.inProgress, checkCocktailsInProgress);
//   if (checkMealsInProgress === 0 && checkCocktailsInProgress === 0) {
//     localStorage.setItem('inProgress', '{}');
//   } else {
//     localStorage.setItem('inProgressRecipes', JSON.stringify({
//       meals: meals.inProgress,
//       cocktails: cocktails.inProgress,
//     }));
//   }
// }, [meals, cocktails]);
