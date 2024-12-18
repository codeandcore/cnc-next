import React, { useEffect, useState } from 'react';
import AwardsLogo from './AwardsLogo';

const ServicesBanner = ({ 
  banner_background_image, 
  banner_background_image_mobile, 
  banner_background_video, 
  banner_clients_list, 
  banner_subtitle, 
  banner_title 
}) => {
  const [backgroundservice, setBackgroundservice] = useState('');

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (window.innerWidth > 768) {
        setBackgroundservice(banner_background_image?.url);
      } else {
        setBackgroundservice(banner_background_image_mobile?.url);
      }
    };
    

    updateBackgroundImage();

    window.addEventListener('resize', updateBackgroundImage);

    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, [banner_background_image, banner_background_image_mobile]);

  return (
    <div className='services_banner' style={backgroundservice ? { backgroundImage: `url(${backgroundservice})` } : {}}>
      {banner_background_video && (
        <video autoPlay loop muted playsInline preload="metadata" className="video">
          <source src={banner_background_video.url} type="video/mp4" />
        </video>
      )}
      <div className="wrapper">
      <div className="inner">
            {banner_title && <h1 dangerouslySetInnerHTML={{ __html: banner_title }}></h1>}
            {banner_subtitle && <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>}
        </div>
        {banner_clients_list && (
          <AwardsLogo career_awards_logo={banner_clients_list} />
        )}
      </div>
    </div>
  );
};

export default ServicesBanner;
