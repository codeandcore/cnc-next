import React, { useState, useEffect } from 'react';

import he from 'he';
import Image from 'next/image';
import dynamic from 'next/dynamic';
// const OwlCarousel = dynamic(() => import('react-owl-carousel2'), { 
//   ssr: false 
// });

const RecognitionsAwards = ({ 
  a_ra_left_side_ttile, 
  a_ra_right_side_content, 
  a_ra_dev_button_name, 
  a_ra_dev_button_link, 
  a_ra_design_button_name, 
  a_ra_design_button_link, 
  a_Indastry_slider, 
  a_award_slider 
}) => {
  
  const [activeTab, setActiveTab] = useState('development');
  const [shouldShowSlider, setShouldShowSlider] = useState(false);
  const [AwardsShowSlider, setAwardsShowSlider] = useState(false);

  useEffect(() => {
    const checkSliderVisibility = () => {
      if (window.innerWidth > 767) {
        setShouldShowSlider(a_Indastry_slider.length > 5);
        setAwardsShowSlider(a_award_slider.length > 5);
      } else {
        setShouldShowSlider(a_Indastry_slider.length > 2);
        setAwardsShowSlider(a_award_slider.length > 2);
      }
    };
    
    checkSliderVisibility(); 
    
    window.addEventListener('resize', checkSliderVisibility); 
    
    return () => {
      window.removeEventListener('resize', checkSliderVisibility); 
    };
  }, [a_Indastry_slider, a_award_slider]); 

  const options = {
    items: 5,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 5,
      },
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='recognitions_awards'>
      <div className='wrapper'>
        <div className='top_col d_flex d_flex_at'>
          <div className='left_col'>
            {a_ra_left_side_ttile && <h2>{a_ra_left_side_ttile}</h2>}
            {a_ra_dev_button_name && (
              <span
                className={`btnmix ${activeTab === 'development' ? 'active' : ''}`}
                onClick={() => handleTabClick('development')}
              >
                <em>{a_ra_dev_button_name}</em>
              </span>
            )}
            {a_ra_design_button_name && (
              <span
                className={`btnmix ${activeTab === 'design' ? 'active' : ''}`}
                onClick={() => handleTabClick('design')}
              >
                <em>{a_ra_design_button_name}</em>
              </span>
            )}
          </div>
          {a_ra_right_side_content && (
            <p dangerouslySetInnerHTML={{ __html: he.decode(a_ra_right_side_content) }}></p>
          )}
        </div>
        <div className='logos'>
          {a_Indastry_slider && activeTab === 'development' && a_Indastry_slider.length > 0 && (
            shouldShowSlider ? (
              <div className='indastry_slider inner'>
                {/* <OwlCarousel options={options}>
                  {a_Indastry_slider.map((indastry, index) => (
                    <div className='col' key={index}>
                      <span>
                        {indastry.a_is_image && <img  
                src={indastry.a_is_image.url} alt={indastry.a_is_label} />}
                      </span>
                      {indastry.a_is_label && <p dangerouslySetInnerHTML={{ __html: indastry.a_is_label }}></p>}
                    </div>
                  ))}
                </OwlCarousel> */}
              </div>
            ) : (
              <div className='indastry_slider inner d_flex d_flex_at'>
                {a_Indastry_slider.map((indastry, index) => (
                  <div className='col' key={index}>
                    <span>
                      {indastry.a_is_image && <Image  
                width={100}  
                height={100}  src={indastry.a_is_image.url} alt={indastry.a_is_label} />}
                    </span>
                    {indastry.a_is_label && <p dangerouslySetInnerHTML={{ __html: indastry.a_is_label }}></p>}
                  </div>
                ))}
              </div>
            )
          )}
          {a_award_slider && activeTab === 'design' && a_award_slider.length > 0 && (
            AwardsShowSlider ? (
              <div className='Award_slider inner'>
                {/* <OwlCarousel options={options}>
                  {a_award_slider.map((Award, index) => (
                    <div className='col' key={index}>
                      <span>
                        {Award.a_as_image && <Image 
                width={100}  
                height={100}  src={Award.a_as_image.url} alt={Award.a_as_label} />}
                      </span>
                      {Award.a_as_label && <p dangerouslySetInnerHTML={{ __html: Award.a_as_label }}></p>}
                    </div>
                  ))}
                </OwlCarousel> */}
              </div>
            ) : (
              <div className='Award_slider inner d_flex d_flex_at'>
                {a_award_slider.map((Award, index) => (
                  <div className='col' key={index}>
                    <span>
                      <Image 
                width={100}  
                height={100}  src={Award.a_as_image.url} alt={Award.a_as_label} />
                    </span>
                    {Award.a_as_label && <p dangerouslySetInnerHTML={{ __html: Award.a_as_label }}></p>}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RecognitionsAwards;
