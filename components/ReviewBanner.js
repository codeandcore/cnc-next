import React from 'react';
import Arrowa from '../public/images/dd_arrow.svg';

const ReviewBanner = ({ banner_title, banner_description, right_side_title, discover_more }) => {
    const handleSmoothScroll = () => {
        const jobOpeningsSection = document.querySelector('.review_contant');
        if (jobOpeningsSection) {
            window.scrollTo({
                top: jobOpeningsSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='review_banner'>
            <div className="wrapper">
                <div className='inner d_flex'>
                    <div className='col_left'>                       
                        {banner_title && <h1>{banner_title}</h1>}
                        {banner_description && <p dangerouslySetInnerHTML={{ __html: banner_description }}></p>}     
                        <a className='see_all' onClick={handleSmoothScroll}>
                            <em>Read <br /> All Reviews</em> 
                            <img src={Arrowa.src} alt="Arrow" />
                        </a>
                    </div>
                    <div className='col_right'>
                        {right_side_title && <h3>{right_side_title}</h3>}                                                
                        {discover_more &&
                        <div className='inner d_flex'>
                            {discover_more.map((socialicon, index) => (
                                <a 
                                    href={socialicon.review_link} 
                                    target='_blank' 
                                    rel='noopener noreferrer' 
                                    className="project_colanimate sp_rt" 
                                    key={index} 
                                >
                                    <span className="rt"></span>
                                    <span className="rb"></span>
                                    <span className="lt"></span>
                                    <span className="lb"></span>    
                                    {socialicon.review_icon && (
                                        <div>
                                            <img 
                                                src={socialicon.review_icon.url} 
                                                alt={socialicon.review_icon.name} 
                                            />
                                        </div>
                                    )}
                                </a>
                            ))}                        
                        </div>
                        }                                           
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const env = process.env.NODE_ENV;    

    try {
        const res = await fetch(
        env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/review`:
        `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/2896`
        );
        const data = await res.json();

        return {
            props: {
                banner_title: data.acf.banner_title || null,
                banner_description: data.acf.banner_description || null,
                right_side_title: data.acf.right_side_title || null,
                discover_more: data.acf.discover_more || null,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                banner_title: null,
                banner_description: null,
                right_side_title: null,
                discover_more: null,
            },
        };
    }
}

export default ReviewBanner;
