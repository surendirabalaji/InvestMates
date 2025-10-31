import React, { useEffect, useRef,useState} from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Assetslider.css';
import { IoIosArrowRoundForward } from "react-icons/io";
import Assetwidget from './Assetwidget';
import { NavLink } from 'react-router-dom';

const Assetslider = ({holdings}) => {
  const swiperRef = useRef(null);

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const transformedData = holdings.map(holding => ({
      symbol: `NASDAQ:${holding.tickerSymbol}`,  
      quantity: holding.quantity,
     
    }));
    
    setCardData(transformedData);
  }, [holdings]);

  useEffect(() => {
    swiperRef.current = new Swiper(".card__content", {
      modules: [Navigation, Pagination],
      loop: true,
      spaceBetween: 32,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
        },
        968: {
          slidesPerView: 4,
        },
      },
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);


  return (
    <section className="assets-container">
      <div className='header'>
        <h6 style={{ fontFamily: 'Poppins',fontSize:'1.2em'}}>Assets</h6>
        <NavLink to='/Assets' style={{ textDecoration: 'none' }}>
        <span  style={{ fontFamily: 'Poppins', fontWeight: "500",color:'#5c31ff',letterSpacing:'0.07em',fontSize:'0.8em'}}>more<IoIosArrowRoundForward size={36} />
        </span>
        </NavLink>
      </div>
      <div className="card__container swiper">
        <div className="card__content">
          <div className="swiper-wrapper">
            {cardData.map((card, index) => (
              <article key={index} className="card__article swiper-slide">
                <Assetwidget symbol={card.symbol} />
              </article>
            ))}
          </div>
        </div>

        <div className="swiper-button-next">
          <i className="ri-arrow-right-s-line"></i>
        </div>

        <div className="swiper-button-prev">
          <i className="ri-arrow-left-s-line"></i>
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}

export default Assetslider;
