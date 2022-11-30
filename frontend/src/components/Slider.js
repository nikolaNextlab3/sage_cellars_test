import React, {useEffect} from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/arrows.css'

function SampleNextArrow(props) {
  const { style, onClick } = props;
  
  return (
    <div
      className={'arrows-right'}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    ><i className="bi bi-arrow-right-circle"></i></div>
  );
}

function SamplePrevArrow(props) {
  const {  style, onClick } = props;
  // const handleChange =async()=> {
  //   var divIndex = document.getElementsByClassName('slick-center slick-current');
  //   console.log(divIndex)
  //   let index = divIndex[0].getAttribute('data-index');
  //   // article[data-columns=index-3] {
  //   //   width: 400px;
  //   // }
  //   console.log(index)
  //   let prevEl = document.querySelector(`[data-index="${index}"]`);
  //   console.log(prevEl)
  //   prevEl.classList.add('hidden'); 
  // }
  return (
    <div
      className={'slick-arrow arrows-left'}
      style={{ ...style, display: "block", }}
      onClick={onClick}
      
    ><i className="bi bi-arrow-left-circle" onClick={onClick}></i></div>
  );
}
function WineSlider() {

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    className:"center",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ],
    nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    
  };
  
  const slidesData = [
    {
      id: 1,
    }, {
      id: 2,
    }, {
      id: 3,
    }, {
      id: 4,
    }, {
      id: 5,
    }, {
      id: 6,
    },
  ];
  
  return (
    <div className="sliderApp">

      <div className="slider-wrapper" >

        <Slider {...settings}>

          {slidesData.map((slide) =>

            <div className="slick-slide" key={slide.id}>
              
              <img alt="nft" src={`img/nft${slide.id}.png`} className='slick-slide-image'></img>
              
            </div>

          )}

        </Slider>

      </div>

    </div>
  );
}

export default WineSlider;
