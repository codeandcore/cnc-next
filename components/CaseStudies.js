import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import LocationIcon from '../public/images/location.svg';
import GoogleIcon from '../public/images/google.png';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const CaseStudies = ({ 
  case_studies_title, 
  case_studies_subtitle, 
  case_studies_list, 
}) => {
  const router = useRouter();
  const owlCarouselRef = useRef(null);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const handleLinkClick = async (url) => {
    handleSmoothScroll();
    router.push(url); 
  };

  const options = useMemo(
    () => ({
      items: 1,
      loop: false,
      nav: true,
      navText: ['<', '>'],
      dots: false,
      margin: 20,
      autoWidth: true,
      smartSpeed: 500,
      responsive: {
        0: {
          items: 1,
          autoWidth: false,
        },
        768: {
          items: 2,
          autoWidth: true,
        },
        1024: {
          items: 3,
          autoWidth: true,
        },
      },
    }),
    []
  );

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {(case_studies_title || case_studies_subtitle) && (
        <div className="case_studies">
          <div className="wrapper">
            {case_studies_title && <h2>{case_studies_title}</h2>}
            {case_studies_subtitle && <p>{case_studies_subtitle}</p>}
          </div>

          <div className="inner">
            {case_studies_list && (
              <OwlCarousel {...options} ref={owlCarouselRef}>
                {case_studies_list.map((item, index) => (
                  <div
                    key={index}
                    className={`colin ${hoveredSlide === item.slug ? 'hovered' : ''}`}
                  >
                    <div className="top_col d_flex">
                      <h3>{item.case_study_post_title}</h3>
                      <div className="case d_flex">
                        <span>
                          <Image
                            src={item.acf.tag_logo.url}
                            alt={item.case_study_post_title}
                            height={20}
                            width={20}
                          />
                        </span>
                        <ul className="d_flex">
                          {item.case_study_tags.map((caseItem, index_tag) => (
                            <li key={index_tag}>{caseItem.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="img">
                      {item.featured_image_url && (
                        <Link
                          href={`/portfolio/${item.slug}`}
                          passHref
                          onClick={() => handleLinkClick(`/portfolio/${item.slug}`)}
                          className="bg"
                        >
                          <img
                            style={{ objectFit: 'contain' }}
                            src={item.featured_image_url}
                            alt={item.case_study_post_title}
                          />
                        </Link>
                      )}
                    </div>

                    <div className="bottom_col d_flex">
                      <div className="lcol test">
                        {item.acf?.c_right_side_logo?.url && (
                          <div className="lcol_logo">
                            <Image
                              src={item.acf.c_right_side_logo.url}
                              alt={item.acf.c_right_side_logo.name}
                              height={15}
                              width={150}
                            />
                          </div>
                        )}
                        <ul className="d_flex">
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
                          {item.acf.google_page_speed && (
                            <li>
                              <h4>{item.acf.google_page_speed}</h4>
                              <h5>
                                <Image height={20} width={20} src={GoogleIcon} alt="Lighthouse speed" />
                                Lighthouse speed
                              </h5>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="awward_right_col">
                        {item.acf?.cases_location && (
                          <div className="rcol d_flex">
                            <Image
                              src={LocationIcon}
                              alt="Location Icon"
                              height={20}
                              width={20}
                            />
                            {item.acf.cases_location}
                          </div>
                        )}

                        {item.acf?.award_small_logo?.url && item.acf.award_link && item.acf.award_text && (
                          <a href={item.acf.award_link} className="awward">
                            <span>{item.acf.award_text}</span>
                            <Image
                              src={item.acf.award_small_logo.url}
                              alt={item.acf.award_small_logo.name}
                              className="awwadicon"
                              height={100}
                              width={100}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudies;
