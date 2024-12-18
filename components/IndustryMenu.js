import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const IndustryMenu = ({ 
  isOpen, 
  closeSubmenu, 
  industry_menu, 
  menuTitle, 
  handleLinkClick, 
  resetChildMenu 
}) => {
  const router = useRouter();
  const [activeChildmenu, setActiveChildmenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleChildToggle = (submenu) => {
    setActiveChildmenu((prev) => (prev === submenu ? null : submenu));
  };

  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    if (!isOpen) {
      handleChildToggle(null);
      setOpenSubmenu(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (resetChildMenu) {
      handleChildToggle(null);
      setOpenSubmenu(null);
    }
  }, [resetChildMenu]);

  const normalizeUrl = (url) => {
    return `/industry/${url.replace(/^\/|\/$/g, '').toLowerCase()}`;
  };

  const handleNavigation = (originalUrl, e) => {
    const cleanUrl = normalizeUrl(originalUrl);
  
    const submenus = document.getElementsByClassName("submenu");
    for (let i = 0; i < submenus.length; i++) {
      submenus[i].style.display = 'none';
    }
  
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  
    handleLinkClick(cleanUrl, e);
  
    setTimeout(() => {
      for (let i = 0; i < submenus.length; i++) {
        submenus[i].style.display = 'flex';
      }
    }, 100);
  };
  
  

  return (
    <>
      <span 
        className="drop-icon" 
        onClick={() => handleSubmenuToggle('industry')}
      ></span>
      
      <div className={`submenu industrymenu d_flex ${openSubmenu ? 'slide-open' : ''}`}>
        <div className="menutitle">
          <div 
            className="back" 
            onClick={() => handleSubmenuToggle('industry')}
          >
            &lt; Back
          </div>
          {menuTitle}
        </div>

        <div className="left_col">
          {industry_menu.industry_title && (
            <Link
              href={normalizeUrl(industry_menu.industry_title.url)}
              className="link"
              onClick={(e) => handleNavigation(industry_menu.industry_title.url, e)}
            >
              {industry_menu.industry_title.title}
            </Link>
          )}
          
          {industry_menu.industry_content && (
            <p 
              dangerouslySetInnerHTML={{ 
                __html: industry_menu.industry_content 
              }} 
            ></p>
          )}
        </div>

        <div className="right_col d_flex">
          {industry_menu.industry_menu && (
            <ul>
              {industry_menu.industry_menu.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={normalizeUrl(menu.menu_item.url)}
                    onClick={(e) => handleNavigation(menu.menu_item.url, e)}
                  >
                    <span>
                      {menu.icon && (
                        <img
                          src={menu.icon.url} 
                          alt={menu.icon.alt || 'Menu Icon'} 
                        />
                      )}
                    </span>
                    {menu.menu_item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="img">
            {industry_menu.industry_image && (
              <Image 
                height={100}
                width={100} 
                src={industry_menu.industry_image.url} 
                alt={industry_menu.industry_image.alt || 'Industry Image'} 
              />
            )}
            
            {industry_menu.industry_image_content && (
              <p 
                dangerouslySetInnerHTML={{ 
                  __html: industry_menu.industry_image_content 
                }} 
              ></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryMenu;