import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodDetailCard from '../component/FoodDetailCard';
import Context from '../context/Context';

function FoodDetails(props) {
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
    async function fetchMealID() {
      const responseResolve = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      setRecipeID(...responseResolve.meals);
    }
    fetchMealID();
  }, []);

  return (
    <div>
      {recipeID !== '' ? <FoodDetailCard /> : <p>Loading...</p> }
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodDetails;
