import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import DrinkDetailCard from '../component/DrinkDetailCard';

function DrinkDetails(props) {
  const {
    setShowHeader,
    setShowFooter,
    recipeID,
    setRecipeID,
    setID } = useContext(Context);
  const { match } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    function handleHeader() {
      setShowHeader(false);
      setShowFooter(false);
      setID(id);
    }
    handleHeader();
  }, []);

  useEffect(() => {
    async function fetchDrinkID() {
      const responseResolve = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      setRecipeID(...responseResolve.drinks);
    }
    fetchDrinkID();
  }, []);

  return (
    <div>
      {recipeID !== '' ? <DrinkDetailCard /> : <p>Loading...</p> }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
