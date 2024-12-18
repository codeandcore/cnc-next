import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EllipseArrow from '../public/images/ellipse_arr.png';
import he from 'he';

const TabContaint = ({ service_list, setPrefetchedData, setIsLoading, setIsDone, setIsFinish }) => {
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const toggleTab = (tabId) => {
    setActiveTab(tabId);
  };

  const closeMenu = () => {
    setToggleIsactive(false);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  const handleLinkClick = async (url, urlc, e = null) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsDone(false);
      setIsFinish(false);
      await handleMouseEnter(urlc);
      setIsLoading(false);
      window.location.href = url; 
    } catch (error) {
      console.error('Error handling link click:', error);
    }
  };

  const handleMouseEnter = (menuItem) => {
    if (menuItem === '/') {
      menuItem = '/home';
    }

    return fetch(`/data/pages/${menuItem}`)
      .then((response) => response.json())
      .then((data) => {
        setPrefetchedData(data);
        localStorage.setItem('prefetchedData', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="tab_section">
      <div className="wrapper d_flex d_flex_at">
        <div className="tabtitle">
          {service_list &&
            service_list.map((item, idx_a) => (
              <div
                className={`tablink ${activeTab === `tab${idx_a + 1}` ? 'active' : ''}`}
                datatype={`tab${idx_a + 1}`}
                onClick={() => toggleTab(`tab${idx_a + 1}`)}
                key={idx_a + 1}
              >
                <span className="number">
                  {idx_a < 9 ? `0${idx_a + 1}` : idx_a + 1}
                </span>
                <h2>{item.title}</h2>
                <div className="text">
                  {item.tags &&
                    item.tags.map((item_service, idx_s) => (
                      <Link
                        href={`services/${item_service.post_name}`}
                        key={idx_s}
                        onClick={(e) => {
                          closeMenu();
                          handleSmoothScroll();
                        }}
                      >
                        {item_service.post_title}
                      </Link>
                    ))}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: he.decode(item.description),
                    }}
                  ></p>
                  {item && (
                    <Link
                      href={`services/${item.button_url.post_name}`}
                      className="btn btnarrow"
                      onClick={(e) => {
                        closeMenu();
                        handleSmoothScroll();
                        handleLinkClick(`/services/${item.button_url.post_name}`, `/${item.button_url.post_name}`, e);
                      }}
                      onMouseEnter={() => handleMouseEnter(`/${item.button_url.post_name}`)}
                    >
                      <em>{item.button_text}</em>
                      <div>
                        <Image
                          src={EllipseArrow}
                          alt={item.title}
                          width={9}
                          height={13}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="tabcontaints">
          {service_list &&
            service_list.map((item, idx_i) => (
              <div
                className={`tabcontaint ${activeTab === `tab${idx_i + 1}` ? 'active' : ''}`}
                id={`tab${idx_i + 1}`}
                key={idx_i}
              >
                <Image
                  src={item.image.url}
                  alt={item.image.name}
                  width={500}
                  height={300}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TabContaint;
