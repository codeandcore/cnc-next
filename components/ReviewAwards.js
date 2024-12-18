import React from 'react';

const ReviewAwards = ({ awards_title, awards_subtitle, awards_listing_ltr, awards_listing_rtl }) => {
    

    return (
        <div className='review_awards'>
           
            <div className='wrapper'>
                {awards_title && <h2>{awards_title}</h2>}
                {awards_subtitle && <p>{awards_subtitle}</p>}
            </div>
            <div className='marquee_ltr marquee_common'>
                <div className='marquee_wrap'>
                    <div className='marquee' style={{ animationDuration: '120s' }}>
                        {awards_listing_ltr &&
                            awards_listing_ltr.map((item, idx) => (
                                <div className="item" key={idx}>
                                    <h3>{item.awards_title_ltr}</h3>
                                    <div className='bottom'>
                                        <img src={item.awards_logo_ltr.url} alt={item.awards_logo_ltr.name} />
                                        <h4>{item.awards_company_ltr}</h4>
                                        <h5>{item.awards_date_ltr}</h5>
                                    </div>
                                    <div className='overlay' style={{ backgroundImage: `url(${item.awards_image.url})` }}></div>
                                </div>
                            ))}
                    </div>
                    <div className='marquee' style={{ animationDuration: '120s' }}>
                        {awards_listing_ltr &&
                            awards_listing_ltr.map((item, idx) => (
                                <div className="item" key={idx}>
                                    <h3>{item.awards_title_ltr}</h3>
                                    <div className='bottom'>
                                        <img src={item.awards_logo_ltr.url} alt={item.awards_logo_ltr.name} />
                                        <h4>{item.awards_company_ltr}</h4>
                                        <h5>{item.awards_date_ltr}</h5>
                                    </div>
                                    <div className='overlay' style={{ backgroundImage: `url(${item.awards_image.url})` }}></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className='marquee_rtl marquee_common'>
                <div className='marquee_wrap'>
                    <div className='marquee' style={{ animationDuration: '120s' }}>
                        {awards_listing_rtl &&
                            awards_listing_rtl.map((item, idx) => (
                                <div className="item" key={idx}>
                                    <h3>{item.awards_title_rtl}</h3>
                                    <div className='bottom'>
                                        <img src={item.awards_logo_rtl.url} alt={item.awards_logo_rtl.name} />
                                        <h4>{item.awards_company_rtl}</h4>
                                        <h5>{item.awards_date_rtl}</h5>
                                    </div>
                                    <div className='overlay' style={{ backgroundImage: `url(${item.awards_image_rtl.url})` }}></div>
                                </div>
                            ))}
                    </div>
                    <div className='marquee' style={{ animationDuration: '120s' }}>
                        {awards_listing_rtl &&
                            awards_listing_rtl.map((item, idx) => (
                                <div className="item" key={idx}>
                                    <h3>{item.awards_title_rtl}</h3>
                                    <div className='bottom'>
                                        <img src={item.awards_logo_rtl.url} alt={item.awards_logo_rtl.name} />
                                        <h4>{item.awards_company_rtl}</h4>
                                        <h5>{item.awards_date_rtl}</h5>
                                    </div>
                                    <div className='overlay' style={{ backgroundImage: `url(${item.awards_image_rtl.url})` }}></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const res = await fetch('https://example.com/api/awards');
    const data = await res.json();

    return {
        props: {
            awardsData: data,
        },
    };
}

export default ReviewAwards;


