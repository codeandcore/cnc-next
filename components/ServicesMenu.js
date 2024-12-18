'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const ServicesMenu = ({ 
  isOpen,
  services_menu,
  menuTitle,
  handleLinkClick,
}) => {
  const [activeChildmenu, setActiveChildmenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();
  
  const safelyPrepareUrl = (url) => {
    if (!url) return '/';
    return url.startsWith('/') ? url : `/${url}`;
  };

  const handleChildToggle = (submenu) => {
    setActiveChildmenu((prev) => (prev === submenu ? null : submenu));
  };

  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (e, url, name) => {
    try {
      const submenus = document.querySelectorAll(".submenu");
      submenus.forEach((submenu) => {
        submenu.style.display = 'none';
      });
  
      if (typeof handleLinkClick === 'function') {
        handleLinkClick(url, name, e);
      }
  
      setTimeout(() => {
        submenus.forEach((submenu) => {
          submenu.style.display = ''; 
        });
      }, 100);
  
    } catch (error) {
      console.error('Error handling menu click:', error);
    }
  };
  

  const renderMenuLinks = (menuItems, baseUrl = '/services') => {
    if (!menuItems || !Array.isArray(menuItems)) return null;

    return menuItems.map((menu, index) => {
      const fullUrl = `${baseUrl}${safelyPrepareUrl(menu.menu_item?.url || '')}`;
      
      return (
        <li key={index}>
          <Link 
            href={fullUrl}
            onClick={(e) => handleMenuClick(e, fullUrl, menu.menu_item?.title || '')}
          >
            <span dangerouslySetInnerHTML={{ __html: menu.menu_item?.title || '' }} />
          </Link>
        </li>
      );
    });
  };

  const renderTechnologyLinks = () => {
    const { technology_list } = services_menu;
    if (!technology_list || !Array.isArray(technology_list)) return null;

    return technology_list.map((menu, index) => {
      const techUrl = `/technologies/${menu.link?.post_name || ''}`;
      
      return (
        <li key={index}>
          <Link 
            href={techUrl}
            onClick={(e) => handleMenuClick(e, techUrl, menu.link?.post_name || '')}
          >
            {menu.icon?.url && (
              <Image 
                height={30} 
                width={30} 
                src={menu.icon.url} 
                alt={menu.icon?.title || 'Technology Icon'} 
              />
            )}
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
    if (!isOpen) {
      handleChildToggle(null);
      setOpenSubmenu(null);
    } 
  }, [isOpen]);

  return (
    <>
      <span className="drop-icon" onClick={() => handleSubmenuToggle('services')}></span>
      <div className={`submenu servicesmenu d_flex ${openSubmenu ? 'slide-open' : ''}`}>
        <div className='menutitle'>
          <div className='back' onClick={() => handleSubmenuToggle('services')}>&lt; Back</div>
          {menuTitle}
        </div>
        <div className='left_col'>
          {services_menu.technology_title && (
            <Link
              href={safelyPrepareUrl(services_menu.technology_title.url)}
              className='link'
              onClick={(e) => handleMenuClick(
                e, 
                safelyPrepareUrl(services_menu.technology_title.url), 
                services_menu.technology_title.title,
              )}
            >
              {services_menu.technology_title.title}
            </Link>
          )}
          {services_menu.technology_list && (
            <ul className='d_flex'>
              {renderTechnologyLinks()}
            </ul>
          )}
        </div>
        <div className='right_col d_flex'>
          {['first', 'second', 'third', 'fourth'].map((column) => (
            <div key={column} className='colin'>
              {services_menu[`${column}_menu_title`] && (
                <h3>
                  <Link
                    href={`/services${safelyPrepareUrl(services_menu[`${column}_menu_title`].url)}`}
                    onClick={(e) => handleMenuClick(
                      e, 
                      `/services${safelyPrepareUrl(services_menu[`${column}_menu_title`].url)}`, 
                      services_menu[`${column}_menu_title`].title
                    )}
                    dangerouslySetInnerHTML={{ __html: services_menu[`${column}_menu_title`].title }}
                  />
                  <span 
                    className='drop-icon' 
                    onClick={() => handleChildToggle(column === 'first' ? 'evaluationDesign' : 
                                                    column === 'second' ? 'researchDevelopment' : 
                                                    column === 'third' ? 'webdevelopment' : 
                                                    'supplyChain')}
                  />
                </h3>
              )}
              <div className={`childmenu ${activeChildmenu === (
                column === 'first' ? 'evaluationDesign' : 
                column === 'second' ? 'researchDevelopment' : 
                column === 'third' ? 'webdevelopment' : 
                'supplyChain'
              ) ? 'active' : ''}`}>
                <div className='menutitle'>
                  <div className='back' onClick={() => handleChildToggle(null)}>&lt; Back</div>
                  <p dangerouslySetInnerHTML={{ __html: services_menu[`${column}_menu_title`]?.title || '' }} />
                </div>
                <ul>
                  {renderMenuLinks(services_menu[`${column}_menu`])}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesMenu;