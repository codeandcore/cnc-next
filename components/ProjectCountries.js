import React, { useState, useRef, useEffect, useMemo } from 'react';
import ArrowsIcon from '../public/images/arrow_ss1.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const ProjectCountries = React.memo(({ countries_title, countries_list }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  
  const mainCarouselRef = useRef(null);
  const thumbsCarouselRef = useRef(null);
  const [thumbsIndex, setThumbsIndex] = useState(0);

  const handleTranslated = () => {
    if (thumbsCarouselRef.current && thumbsCarouselRef.current.props) {
      const itemCount = thumbsCarouselRef.current.props.children.length - 1;
      const currentIndex = thumbsCarouselRef.current.currentPosition;

      setIsPrevDisabled(currentIndex === 0);
      setIsNextDisabled(currentIndex === itemCount);
    }
  };

  const mainOptions = useMemo(() => ({
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    animateOut: 'fadeOut',
    touchDrag: false,
    mouseDrag: false,
    onChanged: (event) => setMainIndex(event.item.index),
    onTranslated: handleTranslated,
  }), []);

  const thumbsOptions = useMemo(() => ({
    items: 4,
    margin: 10,
    dots: false,
    nav: false,
    center: true,
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: { items: 2 },
      768: { items: 3 },
      1024: { items: 5 },
      1280: { items: 6 },
    },
  }), []);

  const syncPosition = (index) => {
    setMainIndex(index);
    setThumbsIndex(index);
    if (mainCarouselRef.current) {
      mainCarouselRef.current.goTo(index);
    }
    if (thumbsCarouselRef.current) {
      thumbsCarouselRef.current.goTo(index);
    }
    handleTranslated();
  };

  const handleNextClick = () => {
    let nextIndex = thumbsIndex + 1;
    if (nextIndex >= countries_list.length) {
      nextIndex = 0;
    }
    syncPosition(nextIndex);
    handleTranslated();
  };

  const handlePrevClick = () => {
    let prevIndex = thumbsIndex - 1;
    if (prevIndex < 0) {
      prevIndex = countries_list.length - 1;
    }
    syncPosition(prevIndex);
    handleTranslated();
  };

  useEffect(() => {
    handleTranslated();
  }, [mainCarouselRef]);

 
  return (
    <div className="project_contries">
      <div className="wrapper d_flex d_flex_jc">
        {countries_title && (<h2 dangerouslySetInnerHTML={{ __html: countries_title }}></h2>)}
        <div className='nextprev_sec d_flex'>
          <div 
            className={`prev ${isPrevDisabled ? 'hide' : ''}`} 
            onClick={handlePrevClick}
          >
            <Image height={20} width={20} src={ArrowsIcon} alt="previous"/>
          </div>
          <div 
            className={`next ${isNextDisabled ? 'hide' : ''}`} 
            onClick={handleNextClick}
          >
            <Image height={20} width={20} src={ArrowsIcon} alt="next"/> 
          </div>
        </div>
        <div className='inner'>
          <div className='contries_wrap'>
            <div className='contries_title'>
              <OwlCarousel ref={thumbsCarouselRef} {...thumbsOptions}>
                {countries_list.map((country, index) => (
                  <div
                    className="col"
                    key={index} onClick={() => syncPosition(index)}
                  >
                    {country.country_map && (
                      <span><img src={country.country_map.url} alt={country.country_title}/></span>
                    )}
                    {country.country_title && (<h3>{country.country_title}</h3>)}
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          <div className='contries_contain'>
            <OwlCarousel ref={mainCarouselRef} {...mainOptions}>
              {countries_list.map((country, index) => (
                <div key={index} className="colin d_flex">
                  <div className='left_col'>
                    <div className='top_col d_flex d_flex_at'>
                      {country.country_flag && (
                        <div className='img'>
                          <img src={country.country_flag.url} alt="country flag"/>
                        </div>
                      )}
                      {country.country_content && (
                        <p dangerouslySetInnerHTML={{ __html: country.country_content }}></p>
                      )}
                    </div>
                    {country.country_big_map && (
                      <div className='map'>
                        <img src={country.country_big_map.url} alt={country.country_title}/>
                      </div>
                    )}
                  </div>
                  {country.country_content_list && (
                    <div className='right_col'>
                      {country.country_content_list.map((list, index) => (
                        <div className='coltext d_flex d_flex_at' key={index}>
                          <h4>{list.title}</h4>
                          <p>{list.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectCountries;
