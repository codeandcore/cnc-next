
const Socialmedialife = ({ social_media_title, socialData }) => {
  return (
    <>
      {socialData && socialData.items && (
        <div className="socialmedia_life">
          <div className="wrapper">
            {social_media_title && (
              <h2 dangerouslySetInnerHTML={{ __html: social_media_title }}></h2>
            )}
            <div className="inner d_flex">
              {socialData.items.map((item, idx) => {
                const { kind } = item.id;
                if (kind === 'youtube#video') {
                  return (
                    <div className="col" key={idx}>
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.snippet.thumbnails.medium.url}
                          alt={item.snippet.title}
                        />
                      </a>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch('https://your-api-endpoint/data/youtube-feeds');
    const socialData = await res.json();

    return {
      props: {
        social_media_title: "<p>Social Media Life</p>",
        socialData,
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return {
      props: {
        social_media_title: "<p>Social Media Life</p>",
        socialData: null,
      },
    };
  }
}

export default Socialmedialife;
