import { useEffect, useState } from 'react';
import he from 'he';
import AwardsLogo from './AwardsLogo';

const TechnoBanner = ({
  banner_background_image,
  banner_background_image_mobile,
  technologies_banner_background_video,
  banner_clients_list,
  banner_description,
  banner_title,
}) => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundImg(banner_background_image?.url);
    } else {
      setBackgroundImg(banner_background_image_mobile?.url);
    }
  }, [banner_background_image, banner_background_image_mobile]);

  return (
    <div
      className="techno_banner"
      style={backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : {}}
    >
      {technologies_banner_background_video && (
        <video autoPlay loop muted playsInline preload="metadata" className="video">
          <source
            src={technologies_banner_background_video.url}
            type="video/mp4"
          />
        </video>
      )}
      <div className="wrapper">
        <div className="inner">
          {banner_title && (
            <h1
              dangerouslySetInnerHTML={{ __html: he.decode(banner_title) }}
            ></h1>
          )}
          {banner_description && (
            <div
              dangerouslySetInnerHTML={{ __html: he.decode(banner_description) }}
            ></div>
          )}
        </div>
        {banner_clients_list && (
          <AwardsLogo career_awards_logo={banner_clients_list}></AwardsLogo>
        )}
      </div>
    </div>
  );
};

export default TechnoBanner;
