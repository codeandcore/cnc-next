import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backIcon from "../public/images/ellipse_arr.png"

const CasestudingContaints = ({
  caseStudyData,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const router = useRouter();
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const leftColRef = useRef(null);

  useEffect(() => {
    if (leftColRef.current) {
      const videoElements = leftColRef.current.querySelectorAll('video');
      videoElements.forEach((video) => {
        video.loop = true;
      });
    }
  }, [caseStudyData]);


  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = async (url) => {
    try {
      setIsLoading(true);
      setIsDone(false);
      setIsFinish(false);

      const response = await fetch(`/api/pages/${url}`);
      const data = await response.json();
      setPrefetchedData(data);
      setIsLoading(false);
      router.push(url);
    } catch (error) {
      console.error('Error handling link click:', error);
    }
  };

  return (
    <div className="casestuding_containts">
      <div className="wrapper">
        <Link
          href="/portfolio"
          onClick={(e) => {
            // e.preventDefault();
            closeMenu();
            handleSmoothScroll();
            // () => router.push('/portfolio')
          }}
          className="btn btnarrow"
        >
          <div>
            <Image height={13}
                    width={9} src={backIcon} alt="back" />
          </div>
          <em>Back to Portfolio</em>
        </Link>

        <div className="project_title d_flex">
          {caseStudyData[0].acf.detail_post_title && (
            <h1>{caseStudyData[0].acf.detail_post_title}</h1>
          )}
          {caseStudyData[0].acf.c_right_side_logo && (
            <div className="pro_logo d_flex d_flex_jc">
              <Image style={{objectFit:'contain'}} height={70}
                    width={250}
                src={caseStudyData[0].acf.c_right_side_logo.url}
                alt={caseStudyData[0].acf.c_right_side_logo.name}
              />
            </div>
          )}
        </div>

        <div className="case_awward d_flex">
          <div className="case d_flex">
            {caseStudyData[0].acf.tag_logo && (
              <span>
                <Image
                height={30}
                width={30}
                  src={caseStudyData[0].acf.tag_logo.url}
                  alt={caseStudyData[0].acf.tag_logo.name}
                />
              </span>
            )}
            {caseStudyData[0].case_study_tags && (
              <ul className="d_flex">
                {caseStudyData[0].case_study_tags.map((caseItem, index) => (
                  <li key={index}>{caseItem.name}</li>
                ))}
              </ul>
            )}
          </div>

          {caseStudyData[0].acf.award_logo && (
            <div className="awward">
              {caseStudyData[0].acf.award_logo.map((logoawd, index) =>
                logoawd.c_al_logo && logoawd.c_al_logo.url ? (
                  logoawd.logo_url ? (
                    <a href={logoawd.logo_url} key={index} target="_blank" rel="noopener noreferrer">
                      <Image height={100}
                    width={150} src={logoawd.c_al_logo.url} alt={logoawd.c_al_logo.name} />
                    </a>
                  ) : (
                    <Image
                    height={20}
                    width={20}
                      src={logoawd.c_al_logo.url}
                      key={index}
                      alt={logoawd.c_al_logo.name}
                    />
                  )
                ) : null
              )}
            </div>
          )}
        </div>

        {caseStudyData[0].acf.cases_short_description && (
          <label
            dangerouslySetInnerHTML={{
              __html: caseStudyData[0].acf.cases_short_description,
            }}
          ></label>
        )}

        {caseStudyData[0].featured_image_url && (
          <Image style={{objectFit:'contain'}} height={800}
          width={3000} src={caseStudyData[0].featured_image_url} alt={caseStudyData[0].title.rendered} />
        )}

        <div className="about_client d_flex">
          <div className="left_col" ref={leftColRef}>
            {caseStudyData[0].content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: caseStudyData[0].content.rendered,
                }}
              ></div>
            )}
          </div>
          <div className="industry_col">
            <div className="ndustry d_flex">
              {caseStudyData[0].acf.industries_detail?.length > 0 && (
                <>
                  <h3>Industry</h3>
                  <div className="industry-group indu-list">
                    {caseStudyData[0].acf.industries_detail.map((industry, index) => (
                      <div key={index}>
                        <span>
                          <Image height={25}
                    width={25} src={industry.industries_icon.url} alt="industry" />
                          {industry.industries_title}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {caseStudyData[0].acf.services_detail?.length > 0 && (
                <>
                  <h3>Services</h3>
                  <div className="service-group">
                    {caseStudyData[0].acf.services_detail.map((service, index) => (
                      <div key={index}>
                        <span>
                          <Image height={25}
                    width={25} src={service.services_icon.url} alt="service" />
                          {service.services_title}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            {caseStudyData[0].acf.cases_location && (
              <div className="location d_flex d_flex_js">
                <Image height={30}
                    width={30} src={caseStudyData[0].acf.location_icon.url} alt="location" />
                {caseStudyData[0].acf.cases_location}
              </div>
            )}
            {caseStudyData[0].acf.case_technology_used && (
              <div className="technology">
                <h4>TECHNOLOGY USED</h4>
                <ul className="d_flex d_flex_js">
                  {caseStudyData[0].acf.case_technology_used.map((technology, index) => (
                    <li key={index}>
                      <a href={technology.technology_link}>
                        <Image height={80}
                    width={80} src={technology.c_technology_logo.url} alt="TECHNOLOGY USED" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasestudingContaints;
