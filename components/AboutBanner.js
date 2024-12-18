import { useEffect, useState } from "react";
import Image from "next/image";

const AboutBanner = ({
  about_banner_mobile_background_image,
  about_banner_background_image,
  about_banner_background_video,
  about_banner_title,
  about_banner_subtitle,
  about_banner_description,
  about_banner_rating_platform_list,
}) => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateBackground = () => {
        setBackgroundImg(
          window.innerWidth > 768
            ? about_banner_background_image?.url
            : about_banner_mobile_background_image?.url
        );
      };

      updateBackground();
      window.addEventListener("resize", updateBackground);

      return () => {
        window.removeEventListener("resize", updateBackground);
      };
    }
  }, [about_banner_background_image, about_banner_mobile_background_image]);

  return (
    <div
      className="about_banner"
      style={backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : {}}
    >
      {about_banner_background_video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="video"
        >
          <source
            src={about_banner_background_video.url}
            type="video/mp4"
          />
        </video>
      )}
      <div className="wrapper">
        <div className="inner d_flex">
          <div className="col_left">
            {about_banner_title && <h1>{about_banner_title}</h1>}
            {about_banner_subtitle && <h3>{about_banner_subtitle}</h3>}
            {about_banner_description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: about_banner_description,
                }}
              />
            )}
            {about_banner_rating_platform_list && (
              <div className="inner d_flex">
                {about_banner_rating_platform_list.map((column, index) => (
                  <a
                    href={column.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project_colanimate sp_rt"
                    key={index}
                  >
                    <span className="rt"></span>
                    <span className="rb"></span>
                    <span className="lt"></span>
                    <span className="lb"></span>
                    <Image
                      src={column.about_rating_logo.url}
                      alt={column.about_rating_logo.name}
                      height={50}
                      width={150}
                      style={{objectFit:'contain'}}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
