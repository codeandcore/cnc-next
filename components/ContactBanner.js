import React from 'react';
import ClientPlateformMarquee from './ClientPlateformMarquee';

const ContactBanner = ({
  banner_background_image,
  banner_background_video,
  banner_title,
  banner_subtitle,
  banner_statistic_expertise,
  banner_statistic_industry,
  banner_statistic_projects,
  banner_rating_platform_list,
}) => {
  return (
    <div className="contact_banner">
      {banner_background_image && (
        <div
          className="bg"
          style={{ backgroundImage: `url(${banner_background_image.url})` }}
        ></div>
      )}
      {banner_background_video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="video"
        >
          <source src={banner_background_video.url} type="video/mp4" />
        </video>
      )}
      <div className="wrapper d_flex">
        <div className="left_col">
          {banner_title && (
            <h1 dangerouslySetInnerHTML={{ __html: banner_title }}></h1>
          )}
          {banner_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>
          )}
          {banner_rating_platform_list && (
            <ClientPlateformMarquee
              banner_ratitest={banner_rating_platform_list}
            />
          )}
        </div>
        <div className="right_col d_flex">
          <div className="project_colanimate sp_rt">
            <span className="rt"></span>
            <span className="rb"></span>
            <span className="lt"></span>
            <span className="lb"></span>
            {banner_statistic_expertise && (
              <div
                className="colk"
                dangerouslySetInnerHTML={{ __html: banner_statistic_expertise }}
              ></div>
            )}
          </div>
          <div className="project_colanimate sp_rt">
            <span className="rt"></span>
            <span className="rb"></span>
            <span className="lt"></span>
            <span className="lb"></span>
            {banner_statistic_industry && (
              <div
                className="colk"
                dangerouslySetInnerHTML={{ __html: banner_statistic_industry }}
              ></div>
            )}
          </div>
          <div className="project_colanimate sp_rt">
            <span className="rt"></span>
            <span className="rb"></span>
            <span className="lt"></span>
            <span className="lb"></span>
            {banner_statistic_projects && (
              <div
                className="colk"
                dangerouslySetInnerHTML={{ __html: banner_statistic_projects }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
