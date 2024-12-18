
import React from 'react';
import Link from 'next/link';
import LocationIcon from '../public/images/location.svg';
import GoogleIcon from '../public/images/google.png';
import Image from 'next/image';

const ExploreWork = ({ className, title, subtitle, button, items }) => {
  return (
    <div className={`explorework_sec ${className}`}>
      <div className='wrapper'>
        <div className='top_title'>
          <div className='leftcol'>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {button && (
            <a className='btn' href={button.url}>
              <em>{button.title}</em>
            </a>
          )}
        </div>
        <div className='explore_data'>
          <div className='inner d_flex'>
            {items && items.length
              ? items.map((item, index) => (
                  <div key={index} className='colin'>
                    <div className='top_col d_flex'>
                      <h3>{item.post_title}</h3>
                      <div className='case d_flex'>
                        <ul className='d_flex'>
                          {item && item.case_study_tags
                            ? item.case_study_tags.map((caseItem, index) => (
                                <li key={index}>{caseItem.name}</li>
                              ))
                            : null}
                        </ul>
                      </div>
                    </div>
                    <div className='img'>
                      <Link legacyBehavior href={`/portfolio/${item.slug}`} passHref>
                        <a className='bg' style={{ backgroundImage: `url(${item.featured_image_url})` }}></a>
                      </Link>
                    </div>
                    <div className='bottom_col d_flex'>
                      <div className='lcol test'>
                        {item && item.acf && item.acf.c_right_side_logo && (
                          <div className='lcol_logo'>
                            <Image style={{objectFit:'contain'}} height={50}
                          width={150} src={item.acf.c_right_side_logo.url} alt={item.acf.c_right_side_logo.name} />
                          </div>
                        )}
                        <ul className='d_flex'>
                          {item && item.acf && item.acf.case_total_visitors && (
                            <li>
                              <h4>{item.acf.case_total_visitors}</h4>
                              <h5>Visitors a day</h5>
                            </li>
                          )}
                          {item && item.acf && item.acf.case_total_orders && (
                            <li>
                              <h4>{item.acf.case_total_orders}</h4>
                              <h5>Order a day website</h5>
                            </li>
                          )}
                          {item && item.acf && item.acf.AwwardsIcongoogle_page_speed && (
                            <li>
                              <h4>{item.acf.google_page_speed}</h4>
                              <h5>
                                <Image height={20}
                    width={20} src={GoogleIcon} alt='Lighthouse speed' />
                                Lighthouse speed
                              </h5>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className='awward_right_col'>
                        {item && item.acf && item.acf.cases_location && (
                          <div className='rcol d_flex'>
                            <Image height={20}
                    width={20} src={LocationIcon} alt='location' />
                            {item.acf.cases_location}
                          </div>
                        )}
                        {item && item.acf && item.acf.award_small_logo && item.acf.award_small_logo.url && item.acf.award_link && item.acf.award_text && (
                          <a href={item.acf.award_link} className='awward'>
                            <span>{item.acf.award_text}</span>
                            <Image
                            height={100}
                            width={100}
                              src={item.acf.award_small_logo.url}
                              alt={item.acf.award_small_logo.name}
                              className='awwadicon'
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreWork;
