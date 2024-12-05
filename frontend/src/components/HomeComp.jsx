import React from 'react';
import Slider from 'react-slick';

// Import images from the assets folder
import slide1 from '../assets/images/Untitled Design (29).jpg';
import slide2 from '../assets/images/img5.jpg';
import slide3 from '../assets/images/img3.jpg';

// Tailwind CSS styles are applied here
const HomeComp= () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image: slide1,
      heading: 'LMM Zambia Gift Exchange',
      subHeading: 'Spread Love, Share Joy'
    },
    {
      image: slide2,
      heading: 'Unwrap the fun, Share the Joy',
    //   subHeading: 'Discover more with us'
    },
    {
      image: slide3,
      heading: 'Compliments of the Season',
    //   subHeading: 'Let\'s build something amazing together'
    }
  ];

  return (
    <div className="relative w-full">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[100vh] object-cover filter brightness-75" // Adjusting image brightness for readability
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="text-white bg-black bg-opacity-50 p-8 rounded-md">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.heading}
                </h1>
                <p className="text-xl sm:text-2xl drop-shadow-lg">
                  {slide.subHeading}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeComp;
