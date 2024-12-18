import React from 'react';
import he from 'he';
import AwardsLogo from './AwardsLogo';
import Image from 'next/image';

const CareerBanner = ({
  career_banner_background_image,
  career_banner_title,
  career_banner_description,
  career_openings_label,
  select_opening_job,
  career_right_side_banner_title,
  learn_more_about_codeandcore,
  career_awards_logo
}) => {

  const handleSmoothScroll = () => {
    const jobOpeningsSection = document.querySelector('.jobopenings');
    if (jobOpeningsSection) {
      window.scrollTo({
        top: jobOpeningsSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className='career_banner'
      style={career_banner_background_image ? { backgroundImage: `url(${career_banner_background_image.url})` } : {}}
    >
      <div className="wrapper">
        <div className='inner d_flex'>
          <div className='col_left'>
            {career_banner_title && <h1>{career_banner_title}</h1>}
            {career_banner_description && (
              <p dangerouslySetInnerHTML={{ __html: he.decode(career_banner_description) }} />
            )}
            {career_openings_label && (
              <a
                className='see_all'
                onClick={handleSmoothScroll}
                dangerouslySetInnerHTML={{
                  __html: he.decode(career_openings_label) + ' <em>(' + select_opening_job.length + ')</em>'
                }}
              />
            )}
          </div>
          <div className='col_right'>
            {career_right_side_banner_title && <h3>{career_right_side_banner_title}</h3>}
            {learn_more_about_codeandcore && (
              <div className='inner d_flex'>
                {learn_more_about_codeandcore.map((socialicon, index) => (
                  <a href={socialicon.career_follow_link} target='_blank' className="project_colanimate sp_rt" key={index}>
                    <span className="rt"></span>
                    <span className="rb"></span>
                    <span className="lt"></span>
                    <span className="lb"></span>
                    {socialicon.career_follow_icon && (
                      <Image height={60}
                      width={120} src={socialicon.career_follow_icon.url} alt={socialicon.career_follow_icon.name} />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {career_awards_logo && <AwardsLogo career_awards_logo={career_awards_logo} />}
      </div>
    </div>
  );
};

export default CareerBanner;
