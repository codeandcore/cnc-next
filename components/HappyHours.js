import React from 'react';

const HappyHours = ({
  our_culture_small_title,
  our_culture_title,
  our_culture_first_gallery,
  our_culture_second_gallery,
  our_culture_bottom_content,
}) => {
  return (
    <div className='happy_hours'>
      {our_culture_small_title && <span>{our_culture_small_title}</span>}
      {our_culture_title && (
        <h2 dangerouslySetInnerHTML={{ __html: our_culture_title }}></h2>
      )}
      <div className='marquee_sec'>
        {our_culture_first_gallery && (
          <div className='marquee_ltr'>
            <div className='marquee_wrap'>
              <div className='marquee' style={{ animationDuration: '80s' }}>
                {our_culture_first_gallery.map((item, idx) => (
                  <img key={idx} src={item.url} alt={item.alt} />
                ))}
              </div>
              <div className='marquee' style={{ animationDuration: '80s' }}>
                {our_culture_first_gallery.map((item, idx) => (
                  <img key={idx} src={item.url} alt={item.alt} />
                ))}
              </div>
            </div>
          </div>
        )}
        {our_culture_second_gallery && (
          <div className='marquee_rtl'>
            <div className='marquee_wrap'>
              <div className='marquee' style={{ animationDuration: '80s' }}>
                {our_culture_second_gallery.map((item, idx) => (
                  <img key={idx} src={item.url} alt={item.alt} />
                ))}
              </div>
              <div className='marquee' style={{ animationDuration: '80s' }}>
                {our_culture_second_gallery.map((item, idx) => (
                  <img key={idx} src={item.url} alt={item.alt} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {our_culture_bottom_content && (
        <p dangerouslySetInnerHTML={{ __html: our_culture_bottom_content }}></p>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = {
    our_culture_small_title: 'Our Culture',
    our_culture_title: 'Welcome to Our Happy Hours',
    our_culture_first_gallery: [
      { url: '/images/gallery1.jpg', alt: 'Image 1' },
      { url: '/images/gallery2.jpg', alt: 'Image 2' },
    ],
    our_culture_second_gallery: [
      { url: '/images/gallery3.jpg', alt: 'Image 3' },
      { url: '/images/gallery4.jpg', alt: 'Image 4' },
    ],
    our_culture_bottom_content: '<strong>Join us for fun and celebration!</strong>',
  };

  return {
    props: data,
  };
};

export default HappyHours;