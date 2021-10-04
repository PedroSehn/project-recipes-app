import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './AuthContext';
import { SearchBarProvider } from './SearchBarContext';
import { RecipesProvider } from './RecipesContext';
import { ExploreProvider } from './ExploreContext';
import { DetailsProvider } from './DetailsContext';

const Provider = ({ children }) => (
  <AuthProvider>
    <RecipesProvider>
      <SearchBarProvider>
        <DetailsProvider>
          <ExploreProvider>
            { children }
          </ExploreProvider>
        </DetailsProvider>
      </SearchBarProvider>
    </RecipesProvider>
  </AuthProvider>
);

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;

export { useAuth } from './AuthContext';
export { useSearch } from './SearchBarContext';
export { useRecipes } from './RecipesContext';
export { useExplore } from './ExploreContext';
export { useDetails } from './DetailsContext';
