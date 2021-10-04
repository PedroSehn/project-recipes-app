import React from 'react';
import PropTypes from 'prop-types';

function FrameVideo({ type, recipe }) {
  if (type === 'meals' && recipe) {
    return (
      <iframe
        data-testid="video"
        width="320"
        height="180"
        title="video"
        src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
      />
    );
  }
  return null;
}

export default FrameVideo;

FrameVideo.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.array,
}.isRequired;
