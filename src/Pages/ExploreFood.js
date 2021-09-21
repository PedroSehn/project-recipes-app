import React from 'react';

export default function ExploreFood() {
  return (
    <div>
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
      <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </div>
  );
}
