import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; 
import he from 'he';

import UseOnScreen from './UseOnScreen';
import Link from 'next/link';

const Life = ({
  className,
  life_codeandcore_title,
  life_codeandcore_button_text,
  life_codeandcore_button_url,
  life_codeandcore_highlights,
  life_codeandcore_big_images,
  life_codeandcore_medium_images,
  life_codeandcore_small_images,
  life_codeandcore_bottom_text,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish
}) => {
  const router = useRouter(); 
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);

  const lifeleftImages = life_codeandcore_big_images;
  const liferightTopImages = life_codeandcore_medium_images;
  const liferightBottomImages = life_codeandcore_small_images;

  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightTopImageIndex, setRightTopImageIndex] = useState(0);
  const [rightBottomImageIndex, setRightBottomImageIndex] = useState(0);

  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  const handleMouseEnter = (menuItem) => {
    if (menuItem === '/') {
      menuItem = '/home';
    }

    return fetch(`/data/pages/${menuItem}`)
      .then((response) => response.json())
      .then((data) => {
        return new Promise((resolve, reject) => {
          try {
            setPrefetchedData(data);
            localStorage.setItem('prefetchedData', JSON.stringify(data));
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return Promise.reject(error);
      });
  };

  useEffect(() => {
    const leftImageInterval = setInterval(() => {
      if (lifeleftImages) {
        setLeftImageIndex(getRandomIndex(lifeleftImages.length));
      }
    }, 7500);

    const rightTopImageInterval = setInterval(() => {
      if (liferightTopImages) {
        setRightTopImageIndex(getRandomIndex(liferightTopImages.length));
      }
    }, 7600);

    const rightBottomImageInterval = setInterval(() => {
      if (liferightBottomImages) {
        setRightBottomImageIndex(getRandomIndex(liferightBottomImages.length));
      }
    }, 7500);

    return () => {
      clearInterval(leftImageInterval);
      clearInterval(rightTopImageInterval);
      clearInterval(rightBottomImageInterval);
    };
  }, []);

  // const handleLinkClick = async (url, urlc, e = null) => {
  // };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'auto',
    });
  };

  const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  };

  const liferenderMarquee = () => {
    if (life_codeandcore_highlights && life_codeandcore_highlights.length > 0) {
      return (
        <div className="marquee" style={{ animationDuration: '35s' }}>
          {life_codeandcore_highlights &&
            life_codeandcore_highlights.map((item, idx) => (
              <div className="item" key={idx}>
                 <Image
                    src="data:image/png;base64,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"
                    alt="circle"
                    width={25}
                    height={25}
                  />
                {item.label}
              </div>
            ))}
        </div>
      );
    }
  };

  const scaleValue = isVisible ? 1 : 0.85;

  return (
    <>
      {(life_codeandcore_title ||
        life_codeandcore_button_text ||
        life_codeandcore_highlights ||
        life_codeandcore_big_images ||
        life_codeandcore_medium_images ||
        life_codeandcore_small_images) && (
        <div
          ref={ref}
          // style={{
          //   transform: `scale(${scaleValue})`,
          //   backgroundImage: `url(${lifebg})`,
          // }}
          className={`life_section ${className}`}
        >
          <div className="wrapper">
            <div className="top_colin d_flex">
              <div className="colinl">
                {life_codeandcore_title && (
                  <h2 dangerouslySetInnerHTML={{ __html: life_codeandcore_title }} />
                )}
                {life_codeandcore_button_text && (
                  <Link
                    href={`../${life_codeandcore_button_url.post_name}`}
                    passHref
                    onClick={(e) => {
                      closeMenu();
                      handleSmoothScroll();
                    }}
                    className="btn"
                  >
                    <span></span>
                    <em>{life_codeandcore_button_text}</em>
                  </Link>
                )}
                {life_codeandcore_highlights && (
                  <div className="client_plateform">
                    <div className="marquee_wrap">
                      {liferenderMarquee()}
                      {liferenderMarquee()}
                    </div>
                  </div>
                )}
              </div>
              <div className="colinr d_flex">
                {life_codeandcore_big_images && (
                  <div className="left comman">
                    <img
                      src={lifeleftImages[leftImageIndex].url}
                      alt="Left Image"
                     
                    />
                  </div>
                )}
                {(life_codeandcore_medium_images || life_codeandcore_small_images) && (
                  <div className="right">
                    {life_codeandcore_medium_images && (
                      <div className="comman img2">
                        <Image
                          src={liferightTopImages[rightTopImageIndex].url}
                          alt="Right Top Image"
                          width={350}
                          height={230}
                        />
                      </div>
                    )}
                    {life_codeandcore_small_images && (
                      <div className="comman img3">
                        <Image
                          src={liferightBottomImages[rightBottomImageIndex].url}
                          alt="Right Bottom Image"
                          width={230}
                          height={170}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {life_codeandcore_bottom_text && (
              <div className="bottom_text">
                {life_codeandcore_bottom_text && (
                  <div dangerouslySetInnerHTML={{ __html: he.decode(life_codeandcore_bottom_text) }} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Life;
