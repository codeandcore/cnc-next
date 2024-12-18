import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PluceIcon from '../public/images/pluceicon.png';  
import Image from 'next/image';

const OurTechnologyStack = ({ a_right_side_section_title, technology_stack, setPrefetchedData, setIsLoading, setIsDone, setIsFinish }) => {
  const router = useRouter();
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleWrap = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  const handleMouseEnter = (menuItem) => {
    if (menuItem === "/") {
      menuItem = "/home";
    }

    return fetch(`/data/posts/${menuItem}`)
      .then((response) => response.json())
      .then((data) => {
        try {
          setPrefetchedData(data);
          localStorage.setItem('prefetchedData', JSON.stringify(data));
        } catch (error) {
          console.error("Error storing data:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth',
    });
  };

  return (
    <div className="our_technology_stack">
      {a_right_side_section_title && <h2>{a_right_side_section_title}</h2>}
      {technology_stack && (
        <div className="inner">
          {technology_stack.map((category, index) => (
            <div key={index} className={`colin ${expandedIndex === index ? 'active' : ''}`}>
              <h3 className={expandedIndex === index ? 'active' : ''} onClick={() => toggleWrap(index)}>
                {category.a_t_title} <Image  
                width={25}  
                height={25}  src={PluceIcon} alt="Pluce Icon" />
              </h3>
              <div className={`all_link d_flex ${expandedIndex === index ? 'expanded' : ''}`}>
                {category.a_t_list_items.map((icon, idx) => (
                  <Link
                    href={`/technologies/${icon.a_t_link.post_name}`}
                    key={idx}
                    onClick={(e) => {
                      closeMenu();
                      handleSmoothScroll();
                    }}
                  >
                    <Image 
                width={100}  
                height={100}  src={icon.a_t_icon.url} alt={icon.a_t_label} /> {icon.a_t_label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurTechnologyStack;
