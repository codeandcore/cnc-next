import React from 'react';
import Image from 'next/image';

const ProjectLogoMarquee = ({ banner_clients_list }) => {

  const renderMarquee = () => {
    if (banner_clients_list && banner_clients_list.length > 0) {
      return (
        <div className="marquee" style={{ animationDuration: "90s" }}>
          {banner_clients_list.map((item, idx) => (
            <div className="item" key={idx}>
              <Image 
                width={100}  
                height={100}  src={item.logo.url} alt="client logo" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      {banner_clients_list && banner_clients_list.length > 0 && (
        <div className="client_plateform project_logo_marquee">
          <div className="marquee_wrap">
            {renderMarquee()}
            {renderMarquee()}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectLogoMarquee;
