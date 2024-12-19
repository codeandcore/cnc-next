import React, { useState, useRef } from 'react';
import Image from 'next/image';
// import OwlCarousel from "react-owl-carousel2";
// import "react-owl-carousel2/src/owl.carousel.css";
import EllipseIcon from '../public/images/ellipse_c.png';
import Sarrow from '../public/images/arrow_ss1.svg';


const CustomDots = ({ year_of_growing, activeIndex, handleClick }) => {
    return (
        <>
        {year_of_growing &&
        <div className='custom-dots year d_flex d_flex_at'>
            {year_of_growing.map((item, index) => (
                <div 
                    key={index} 
                    className={`col ${index === activeIndex ? 'active' : ''}`} 
                    onClick={() => handleClick(index)}
                >
                    <span>{item.a_yog_year}</span>
                </div>
            ))}
        </div>
        }
        </>
    );
};

const YearOfGrowing = React.memo(({
    a_y_left_side_title,
    a_y_right_side_description,
    year_of_growing,
    a_y_codeandcore_highlights
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
   
    const handleDotClick = (index) => {
        setActiveIndex(index);
        if (carouselRef.current) {
            carouselRef.current.goTo(index);
        }
    };
    
    const handlePrevClick = () => {
        if (activeIndex > 0) {
            carouselRef.current.prev();
            setActiveIndex((activeIndex - 1 + year_of_growing.length) % year_of_growing.length);
        }
    };

    const handleNextClick = () => {
        if (activeIndex < year_of_growing.length - options.items) {
            carouselRef.current.next();
            setActiveIndex((activeIndex + 1) % year_of_growing.length);
        }
    };

    const handleSliderDrag = (event) => {
        setActiveIndex(event.page.index);
    };

    const options = {
        items: 1,
        nav: false,
        loop: false,
        dots: false,
        autoHeight: true,
        onDragged: handleSliderDrag,
    };

    const liferenderMarquee = () => {
        if (a_y_codeandcore_highlights && a_y_codeandcore_highlights.length > 0) {
            return (
                <div className="marquee" style={{ animationDuration: "50s" }}>
                    {a_y_codeandcore_highlights.map((item, idx) => (
                        <div className="item" key={idx}>
                            <Image 
                                src={EllipseIcon}
                                alt="circle" 
                                width={20} 
                                height={20} 
                            />
                            {item.a_y_h_label}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className='year_of_growing'>
            <div className='wrapper'>
                <div className='top_col d_flex d_flex_at'>
                    {a_y_left_side_title && <h2>{a_y_left_side_title}</h2>}
                    {a_y_right_side_description && <p>{a_y_right_side_description}</p>}
                </div>
                <div className='client_slider'>
                    <CustomDots 
                        year_of_growing={year_of_growing} 
                        activeIndex={activeIndex} 
                        handleClick={handleDotClick} 
                    />
                    <div className='nextprev_sec d_flex'>
                        <div 
                            className={`prev ${activeIndex === 0 ? 'hide' : ''}`} 
                            onClick={handlePrevClick}
                        >
                            <Image 
                                src={Sarrow}
                                alt="Previous" 
                                width={24} 
                                height={24} 
                            />
                        </div>
                        <div 
                            className={`next ${activeIndex === year_of_growing.length - 1 ? 'hide' : ''}`}
                            onClick={handleNextClick}
                        >
                            <Image 
                                src={Sarrow}
                                alt="Next" 
                                width={24} 
                                height={24} 
                            />
                        </div>
                    </div>
                    {year_of_growing && (
                        <div className='year_of_contants'>
                            {/* <OwlCarousel options={options} ref={carouselRef}> */}
                                {year_of_growing.map((item, index) => (
                                    <div className='col d_flex d_flex_at' key={index}>
                                        <div className='left'>
                                            <h3>{item.a_yog_title.replace(/<\/?br\s*\/?>/gi, ' ')}</h3>
                                            <p>{item.a_yog_content.replace(/<\/?br\s*\/?>/gi, ' ')}</p>
                                        </div>
                                        <div className='right'>
                                            <Image 
                                                src={item.a_yog_image.url} 
                                                alt={item.a_yog_title} 
                                                width={500} 
                                                height={300} 
                                                layout="responsive" 
                                                objectFit="cover" 
                                            />
                                        </div>
                                    </div>
                                ))}
                            {/* </OwlCarousel> */}
                        </div>
                    )}
                </div>
            </div>
            {a_y_codeandcore_highlights && (
                <div className='client_plateform'>
                    <div className='marquee_wrap'>
                        {liferenderMarquee()}
                        {liferenderMarquee()}
                    </div>
                </div>
            )}
        </div>
    );
});

export default YearOfGrowing;