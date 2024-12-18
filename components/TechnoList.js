import { useEffect, useState } from 'react';
import Link from 'next/link';
import he from 'he';
import Image from 'next/image';

const TechnoList = ({
  technology_list,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
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

  // const handleMouseEnter = (menuItem) => {
  //   if (menuItem === "/") {
  //     menuItem = "/home";
  //   }

  //   return fetch(`/data/pages/${menuItem}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return new Promise((resolve, reject) => {
  //         try {
  //           setPrefetchedData(data);
  //           localStorage.setItem('prefetchedData', JSON.stringify(data));
  //           resolve();
  //         } catch (error) {
  //           reject(error);
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       return Promise.reject(error);
  //     });
  // };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <>
      {technology_list && (
        <div className="technolist_sec">
          <div className="wrapper">
            {technology_list.map((techno, index) => (
              <div className="colin" key={index}>
                {techno.technology_title && (
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: he.decode(techno.technology_title),
                    }}
                  ></h2>
                )}
                <div className="wrap d_flex d_flex_at">
                  <div className="left_col">
                    {techno.technology_description && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: he.decode(techno.technology_description),
                        }}
                      ></p>
                    )}
                  </div>
                  {techno.programing_language && (
                    <div className="all_link d_flex d_flex_js">
                      {techno.programing_language.map((program, pindex) => (
                        <Link
                          legacyBehavior
                          href={`/technologies/${program.link.post_name}`}
                          key={pindex}
                        >
                          <a
                            onClick={(e) => {
                              closeMenu();
                              handleSmoothScroll();
                              // handleLinkClick(
                              //   `/technologies/${program.link.post_name}`,
                              //   program.link.post_name,
                              //   e
                              // );
                            }}
                          >
                            {program.icon && <Image height={50} width={50} src={program.icon.url} alt="" />}
                            {program.title}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TechnoList;
