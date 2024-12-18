import React, { useEffect } from 'react';

const Linkedinlife = ({ social_media_linkdin_title }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/linkedin-page-posts/widget.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="socialmedia_life socialmedia_linkdin">
      <div className="wrapper">
        {social_media_linkdin_title && (
          <h2
            dangerouslySetInnerHTML={{ __html: social_media_linkdin_title }}
          ></h2>
        )}
        <div className="inner d_flex">
          <div className='sk-ww-linkedin-page-post' data-embed-id='25488018'></div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const social_media_linkdin_title = "<p>LinkedIn Life</p>";

  return {
    props: {
      social_media_linkdin_title,
    },
  };
}

export default Linkedinlife;
