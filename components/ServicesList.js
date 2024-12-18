import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import EllipseArrowv from '../public/images/arrow_ss1.svg'; 
import EllipseArrow from '../public/images/ellipse_arr.png';
import Image from 'next/image';

const ServicesList = ({ service_title, service_content, service_list, service_view_all_button, setPrefetchedData, setIsLoading, setIsDone, setIsFinish }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(5);
  const servicesListRef = useRef(null);
  const servicesRefs = useRef([]);
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

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'auto',
    });
  };

  const toggleWrap = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const handleScroll = () => {
    if (servicesListRef.current) {
      const servicesListBottom = servicesListRef.current.getBoundingClientRect().bottom + 100;
      const windowBottom = window.innerHeight;
      if (servicesListBottom <= windowBottom) {
        setVisibleCount(prevCount => Math.min(prevCount + 5, service_list.length));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 }
    );

    servicesRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      servicesRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleCount]);

  return (
    <div className='services_list' ref={servicesListRef}>
      <div className='wrapper'>
        <div className='top_col d_flex'>
          {service_title && (<h2>{service_title} <span>{service_list.length}</span></h2>)}
          {service_content && (<p dangerouslySetInnerHTML={{ __html: service_content }} />)}
        </div>

        <div className='services_accordion'>
          {service_list.slice(0, visibleCount).map((service, index) => (
            <div className='colin' key={index} ref={el => (servicesRefs.current[index] = el)}>
              <div onClick={() => toggleWrap(index)} className={`top_title d_flex ${expandedIndex === index ? 'active' : ''}`}>
                {service.icon && (<span><Image height={70}
                    width={70} src={service.icon.url} alt={service.icon.title} /></span>)}
                <h3>{service.title}</h3>
                <div className="btnsimple"><Image height={20}
                    width={20} src={EllipseArrowv} alt="Read More" /></div>
              </div>
              <div className={`wrap d_flex ${expandedIndex === index ? 'expanded' : ''}`}>
                <div className='img' style={{ backgroundImage: `url(${service.image.url})` }}></div>
                {service.icon && (
                  <div className='text'>
                    {service.list.map((item, childindex) => (
                      <div className='col d_flex' key={childindex}>
                        <span>{childindex + 1 < 10 ? `0${childindex + 1}` : childindex + 1}</span>
                        <h4>{item.title}</h4>
                        <p dangerouslySetInnerHTML={{ __html: item.content }} />
                        {item.link && (
                          <Link legacyBehavior href={`/services/${item.link.post_name}`} passHref>
                            <a onClick={closeMenu}  className='btnarrow btn'>
                              <em>Read More</em>
                              <div><Image width={9} height={13} src={EllipseArrow} alt="Read More" /></div>
                            </a>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
