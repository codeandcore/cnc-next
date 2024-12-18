import React, { useState } from 'react';
import Link from 'next/link';
import EllipseArrow from '../public/images/ellipse_arr.png';
import Image from 'next/image';

const Technodetailcontaints = ({ title, subtitle, content, technoloy_icon, setIsLoading, setIsDone, setIsFinish, setPrefetchedData }) => {
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

    const handleMouseEnter = (menuItem) => {
        if (menuItem === "/") {
            menuItem = "/home";
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
                console.error("Error fetching data:", error);
                return Promise.reject(error);
            });
    };

    const handleSmoothScroll = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'auto',
        });
    };

    return (
        <div className='technodetail_sec'>
            <div className='wrapper'>
                <Link legacyBehavior href="/technologies">
                    <a 
                        onClick={(e) => {
                            closeMenu();
                            handleSmoothScroll();
                            // handleLinkClick("/technologies", e);
                        }}
                        className="btn btnarrow"
                    >
                        <div><Image height={13} width={9} src={EllipseArrow} alt="Ellipse Arrow" /></div>
                        <em>Back to TECHNOLOGIES</em>
                    </a>
                </Link>
                <div className='project_title d_flex '>
                    <div className='left_col'>
                        {title && (<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>)}
                        {subtitle && (<p dangerouslySetInnerHTML={{ __html: subtitle }}></p>)}
                    </div>
                    <div className='pro_logo d_flex d_flex_jc'>
                        {technoloy_icon && (<img  src={technoloy_icon.url} alt="Technology Icon" />)}
                    </div>
                </div>
                {content && (
                    <div className='techno_content' dangerouslySetInnerHTML={{ __html: content }}></div>
                )}
            </div>
        </div>
    );
};

export default Technodetailcontaints;
