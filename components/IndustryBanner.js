import { useState, useEffect } from 'react';
import AwardsLogo from './AwardsLogo';
import Image from 'next/image';

const IndustryBanner = ({
  banner_gallery,
  banner_title,
  banner_subtitle,
  banner_clients_list,
  banner_background_image,
  banner_background_image_mobile,
  mobile_banner_image,
}) => {
  const [backgroundIndustry, setBackgroundIndustry] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bgImage =
        window.innerWidth > 768
          ? banner_background_image?.url
          : banner_background_image_mobile?.url;
      setBackgroundIndustry(bgImage);
    }
  }, [banner_background_image, banner_background_image_mobile]);

  return (
    <div
      className="industry_banner"
      style={
        backgroundIndustry
          ? { backgroundImage: `url(${backgroundIndustry})` }
          : {}
      }
    >
      <div className="oversection">
        {banner_gallery && (
          <div className="animation_sec wrapper">
            {banner_gallery.map((banner, index) => (
              <div className={`animation anim_${index + 1}`} key={index}>
                <Image height={2500}
                    width={230} src={banner.url} alt={banner.title} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="wrapper">
        <div className="left_col">
          {banner_title && <h1>{banner_title}</h1>}
          {banner_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>
          )}
          {banner_clients_list && (
            <AwardsLogo career_awards_logo={banner_clients_list}/>
          )}
        </div>
        <div className="right_col">
          <img  src={mobile_banner_image?.url} alt="Mobile Banner" />
        </div>
      </div>
    </div>
  );
};

export default IndustryBanner;
