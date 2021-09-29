import React from 'react';

const inputChecker = (ingredient, index, { checkedArray, setCheckArray, itemId }) => (
  <div>
    {!checkedArray[index] && <input
      type="checkbox"
      name={ ingredient }
      id={ `checkbox${index}` }
      onChange={ (e) => {
        localStorage.setItem(`${ingredient}`, JSON
          .stringify(e.target.checked));
        const bingo = localStorage
          .getItem('inProgressRecipesTest')
          ? JSON.parse(localStorage
            .getItem('inProgressRecipesTest')).cocktails[itemId[2]] : {};
        localStorage.removeItem('inProgressRecipesTest');
        localStorage.setItem('inProgressRecipesTest', JSON
          .stringify({
            cocktails: {
              [itemId[2]]: {
                ...bingo,
                [ingredient]: e.target.checked,
              },
            },
            meals: {} }));
        checkedArray[index] = false;
        setCheckArray(checkedArray);
      } }
    />}
    {checkedArray[index] && <input
      type="checkbox"
      name={ ingredient }
      id={ `checkbox${index}` }
      checked
      onChange={ (a) => {
        localStorage.setItem(`${ingredient}`, JSON
          .stringify(a.target.checked));
        const bing = localStorage
          .getItem('inProgressRecipesTest')
          ? JSON.parse(localStorage
            .getItem('inProgressRecipesTest')).cocktails[itemId[2]] : {};
        localStorage.removeItem('inProgressRecipesTest');
        localStorage.setItem('inProgressRecipesTest', JSON
          .stringify({
            cocktails: {
              [itemId[2]]: {
                ...bing,
                [ingredient]: a.target.checked,
              },
            },
            meals: {} }));
        checkedArray[index] = true;
        setCheckArray(checkedArray);
      } }
    />}
  </div>);

const utils = {
  inputChecker,
};

export default utils;
