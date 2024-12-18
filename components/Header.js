'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image";
import logoIcon from "../public/images/cnc-logo-icon.svg";
import IndustryMenu from "./IndustryMenu";
import ServicesMenu from "./ServicesMenu";

const Header = ({
  logo,
  header_black_logo,
  button_text,
  button_url,
  main_menu,
  industry_menu,
  services_menu,
  additional_css,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [headerActive, setHeaderActive] = useState(false);
  const [headerIsactive, setHeaderIsactive] = useState(false);
  const [headerClass, setHeaderClass] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setHeaderActive(isScrolled);

      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > (window.prevScrollPos || 0);
      setHeaderIsactive(isScrollingDown);
      window.prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const blackHeaderPaths = [
      "/blog", "/portfolio", "/technologies", 
      "/refund-policy", "/warranty", "/privacy-policy", 
      "/terms", "/portfolio/", "/sitemap", "/industry"
    ];

    const shouldHaveBlackHeader = blackHeaderPaths.some(path => 
      pathname?.startsWith(path)
    );

    setHeaderClass(shouldHaveBlackHeader ? "header-black" : "header-white");
  }, [pathname]);

  const handleNavigation = (url, e, keepMenuOpen = false) => {
    window.scrollTo({
      top: 0, 
      behavior: "auto",
    });

    if (!keepMenuOpen) {
      setMenuOpen(false);
      setOpenSubmenu(null);
    }

    const cleanUrl = url.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
    router.push(`/${cleanUrl}`);
  };

  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  const renderSubMenu = (
    subMenuType,
    isOpen,
    menuTitle,
    handleNavigation
  ) => {
    switch (subMenuType) {
      case "service":
        return (
          <ServicesMenu
            isOpen={isOpen}
            services_menu={services_menu}
            menuTitle={menuTitle}
            handleLinkClick={(url, title, e) => handleNavigation(url, e, true)}
          />
        );
      case "industry":
        return (
          <IndustryMenu
            isOpen={isOpen}
            industry_menu={industry_menu}
            menuTitle={menuTitle}
            handleLinkClick={(url, title, e) => handleNavigation(url, e, true)}
          />
        );
      default:
        return null;
    }
  };

  const logoImage = headerClass === "header-white" ? logo?.url : header_black_logo?.url;
  
  return (
    <>
      {additional_css && (
        <style>{additional_css}</style>
      )}
      <header
        className={`d-flex ${headerActive ? "fixed" : ""} ${headerIsactive ? "isactive" : ""} ${headerClass}`}
      >
        <a
          href="#"
          className={`togglemenu ${isMenuOpen ? "on" : ""}`}        
          onClick={handleMenuToggle}
        >
          <span></span>
        </a>
        <div className="wrapper d_flex">
          {logo && (
            <Link
              onClick={(e) => handleNavigation("/", e)}
              href="/"
              className={`brand ${pathname === "/" ? "current" : ""}`}
            >
              <Image width={300} height={50} src={logoImage} alt="logo" />
              <Image width={300} height={50} src={logoIcon} className="logoIcon" alt="logo" />
            </Link>
          )}
          <div className={`menucol ${isMenuOpen ? "open" : ""}`}>
            <Link href="/" onClick={(e) => handleNavigation("/", e)} className="brandmobile">
              <Image width={100} height={50} src={logoIcon} alt="" />
            </Link>
            {main_menu && (
              <ul className="d_flex">
                {main_menu.map((column, index) => (
                  <li 
                    key={index}
                    className={`${
                      openSubmenu === column.menu.title ? "open" : ""
                    } ${column.sub_menu_type !== 'none' ? "drop" : ""}`}
                    onClick={() => {
                      if (column.sub_menu_type !== 'none') {
                        handleSubmenuToggle(column.menu.title);
                      }
                    }}
                  >
                    <Link
                      onClick={(e) => handleNavigation(column.menu.url, e)}
                      href={column.menu.url}
                      className={`${
                        pathname === column.menu.url ? "current" : ""
                      }`}
                    >
                      {column.menu.title}
                    </Link>
                    {column.sub_menu_type &&
                      renderSubMenu(
                        column.sub_menu_type,
                        openSubmenu === column.menu.title,
                        column.menu.title,
                        handleNavigation
                      )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {button_text && (
            <Link
              href={button_url}
              onClick={(e) => handleNavigation(button_url, e)}
              className="btn"
            >
              <em>{button_text}</em>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;