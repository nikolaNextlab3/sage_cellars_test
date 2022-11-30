import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import '../css/gallerie.css'

const Gallerie = () => {
  const images = [1, 2, 3,4,5,6,7,8].map((number) => ({
    src: `img/${number}.png`,
    
    alt: `wine bottle`,
    width:'30px',
    height:'60px',
    
    
  
  }));

  return (

    <Carousel className={'gallerieComponent'} images={images}  hasMediaButton={false} hasIndexBoard={false} hasSizeButton={false} style={{ height: 600, width: 350 }} />
  );
};

export default Gallerie;