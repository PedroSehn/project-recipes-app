import React from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({ item, type, property }) {
  const VIDEO_ID = 32;
  return (
    item[type][0].strYoutube
      && <iframe
        data-testid="video"
        src={ `http://www.youtube.com/embed/${item[type][0].strYoutube.slice(VIDEO_ID)}` }
        title={ item[type][0][`str${property}`] }
        frameBorder="0"
      />
  );
}

VideoPlayer.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
};

export default VideoPlayer;
