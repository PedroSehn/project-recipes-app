import React, { useState } from 'react';
import DoneRecipesFilter from '../components/DoneRecipesFilters';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

function ReceitasFeitas() {
  const [actualFilter, setActualFilter] = useState(false);
  let doneRecipesStorage = localStorage.getItem('doneRecipes');
  doneRecipesStorage = JSON.parse(doneRecipesStorage);

  const handleFilter = (filterFactor) => {
    if (!filterFactor) return doneRecipesStorage;
    const filteredRecipes = doneRecipesStorage.filter(({ type }) => (
      type === filterFactor
    ));
    return filteredRecipes;
  };

  return (
    <div>
      <Header pageTitle="Receitas Feitas" haveHeader={ false } />
      <DoneRecipesFilter setActualFilter={ setActualFilter } />
      { doneRecipesStorage && <DoneCard
        filteredRecipes={ handleFilter(actualFilter) }
      /> }
    </div>
  );
}

export default ReceitasFeitas;
