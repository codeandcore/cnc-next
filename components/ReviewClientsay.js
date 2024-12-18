
import React from 'react';
import ReviewClientcontants from '../components/ReviewClientcontants'; 

const ReviewClientsay = ({ what_client_say_title, client_listing, client_reviews }) => {
  return (
    <div className="review_clientsay">
      {what_client_say_title && <h2>{what_client_say_title}</h2>}
      <div className="marquee_ltr marquee_common">
        <div className="marquee_wrap">
          <div className="marquee" style={{ animationDuration: '35s' }}>
            {client_listing &&
              client_listing.map((item, idx) => (
                <div className="item" key={idx}>
                  <img src={item.client_images_ltr.url} alt="client logo" />
                </div>
              ))}
          </div>
          <div className="marquee" style={{ animationDuration: '35s' }}>
            {client_listing &&
              client_listing.map((item, idx) => (
                <div className="item" key={idx}>
                  <img src={item.client_images_ltr.url} alt="client logo" />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="marquee_rtl marquee_common">
        <div className="marquee_wrap">
          <div className="marquee" style={{ animationDuration: '35s' }}>
            {client_listing &&
              client_listing.map((item, idx) => (
                <div className="item" key={idx}>
                  <img src={item.client_images_rtl.url} alt="client logo" />
                </div>
              ))}
          </div>
          <div className="marquee" style={{ animationDuration: '35s' }}>
            {client_listing &&
              client_listing.map((item, idx) => (
                <div className="item" key={idx}>
                  <img src={item.client_images_rtl.url} alt="client logo" />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ReviewClientcontants client_reviews={client_reviews} />
    </div>
  );
};

export default ReviewClientsay;
