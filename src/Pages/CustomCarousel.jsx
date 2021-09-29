import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../App.css';

export default function CustomCarousel(
  { props: { firstCarousel, secondCarousel } },
) {
  let count1 = 0;
  let count2 = 1;

  return (
    <>
      <Carousel>
        {firstCarousel.map((drink, index) => {
          if (index > 0) count1 += 2;
          return (
            <CarouselItem
              key={ `drink${index}` }
              data-testid={ `${count1}-recomendation-card` }
            >
              <img className="d-block w-100" src={ drink.strDrinkThumb } alt="drink" />
              <Carousel.Caption>
                <p>{drink.strCategory}</p>
                <p data-testid={ `${count1}-recomendation-title` }>{drink.strDrink}</p>
              </Carousel.Caption>
            </CarouselItem>);
        })}
      </Carousel>
      <Carousel style={ { marginBottom: '100px' } }>
        {secondCarousel.map((drink, index) => {
          if (index > 0) count2 += 2;
          return (
            <CarouselItem
              key={ `drink${index}` }
              data-testid={ `${count2}-recomendation-card` }
            >
              {/* Comment */}
              <img className="d-block w-100" src={ drink.strDrinkThumb } alt="Meal" />
              <Carousel.Caption>
                <p>{drink.strCategory}</p>
                <p data-testid={ `${count2}-recomendation-title` }>{drink.strDrink}</p>
              </Carousel.Caption>
            </CarouselItem>);
        })}
      </Carousel>
    </>
  );
}

CustomCarousel.propTypes = {
  props: {
    firstCarousel: PropTypes.string.isRequired,
    secondCarousel: PropTypes.string.isRequired,
  }.isRequired,
};
