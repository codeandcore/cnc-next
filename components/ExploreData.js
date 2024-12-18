import { useState } from 'react';
import Link from 'next/link';
import LocationIcon from '../public/images/location.svg';
import AwwardsLayer from '../public/images/awwards.svg';
import GoogleIcon from '../public/images/google.png';
import Image from 'next/image';

const ExploreData = ({ className, CaseStudycptData }) => {
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  return (
    <div className={`explore_data ${className}`}>
      <div className='inner d_flex'>
        {CaseStudycptData.map((item, index) => (
          <div key={index} className='colin'>
            <div className='top_col d_flex'>
              <h3>{item.case_study_post_title}</h3>
              <div className='case d_flex'>
                {item.acf.tag_logo && (
                  <span>
                    <img src={item.acf.tag_logo.url} alt={item.acf.tag_logo.name} />
                  </span>
                )}
                {item.case_study_tags && (
                  <ul className='d_flex'>
                    {item.case_study_tags.map((caseItem, index) => (
                      <li key={index}>{caseItem.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className='img'>
            {/* onMouseEnter={handleSmoothScroll} */}
              <Link legacyBehavior href={`/portfolio/${item.slug}`}>
                <a onClick={closeMenu}  className='bg' style={item.featured_image_url ? { backgroundImage: `url(${item.featured_image_url})` } : {}}></a>
              </Link>
            </div>
            <div className='bottom_col d_flex'>
              <div className='lcol'>
                {item.acf.c_right_side_logo && (
                  <div className='lcol_logo'>
                    <img  src={item.acf.c_right_side_logo.url} alt={item.acf.c_right_side_logo.name} />
                  </div>
                )}
                <ul className='d_flex'>
                  {item.acf.case_total_visitors && (
                    <li>
                      <h4>{item.acf.case_total_visitors}</h4>
                      <h5>Visitors a day</h5>
                    </li>
                  )}
                  {item.acf.case_total_orders && (
                    <li>
                      <h4>{item.acf.case_total_orders}</h4>
                      <h5>Order a day website</h5>
                    </li>
                  )}
                  {item.acf.AwwardsIcongoogle_page_speed && (
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
                {item.acf.cases_location && (
                  <div className='rcol d_flex'>
                    <Image height={20}
                    width={20} src={LocationIcon} alt='location' />
                    {item.acf.cases_location}
                  </div>
                )}
                {item.acf.award_small_logo && item.acf.award_small_logo.url && item.acf.award_link && item.acf.award_text && (
                  <a href={item.acf.award_link} className='awward'>
                    <span>{item.acf.award_text}</span>
                    <img src={item.acf.award_small_logo.url} alt={item.acf.award_small_logo.name} className='awwadicon' />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreData;
