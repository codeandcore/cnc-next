import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EllipseArrow from '../public/images/ellipse_arr.png';
import dateIcon from '../public/images/dateIcon.svg';
import SocialIcon1 from '../public/images/fs1.svg';
import SocialIcon2 from '../public/images/fs2.svg';
import SocialIcon3 from '../public/images/fs3.svg';
import SocialIcon4 from '../public/images/fs4.svg';
import Image from 'next/image';
import AuterIcon from "../public/images/cnc-icon.svg"

const BlogDetailContent = ({ blogData }) => {
  const router = useRouter();
  // const { slug } = router.query;
  const fullUrl = router.asPath;
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const contentRef = useRef(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeTocItem, setActiveTocItem] = useState(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  const extractHeadings = () => {
    const content = contentRef.current;
    const headings = content.querySelectorAll('h2,h3');
    
    const toc = Array.from(headings)
      .filter(heading => heading.innerText.trim() !== '') 
      .map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.innerText.trim(),
        level: heading.tagName
      }));
    
    setTocItems(toc);
    
    headings.forEach((heading, index) => {
      if (heading.innerText.trim() !== '') {
        heading.setAttribute('id', `heading-${index}`);
      }
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      extractHeadings();
    }
  }, [blogData]);

  const handleSmoothScroll = (id, index) => {
    setActiveTocItem(index);
    
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const indate = new Date(blogData.date).toLocaleDateString('en-GB');
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`;
  const instagramShareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(fullUrl)}`;


  return (
    <>
      <div className='blog_detail_section'>
      <div className='wrapper'>
        <Link legacyBehavior href="/blog">
          <a onClick={(e) => {
            closeMenu(); handleSmoothScroll();
          }} className='btn btnarrow'>
            <div><Image height={13} width={9} src={EllipseArrow} alt="back_icon" /></div>
            <em>Back to blog page</em>
          </a>
        </Link>
        
        <h1 dangerouslySetInnerHTML={{ __html: blogData.title.rendered }}></h1>
        <div className="blog_info d_flex">
          <a href="#" className="btnmix">
            <em dangerouslySetInnerHTML={{ __html: blogData.categories_names }}></em>
          </a>
          <span className="date">
            <Image height={17} width={17} src={dateIcon} alt="date_icon" /> {indate}
          </span>
        </div>
        
        <div className='inner d_flex'>         
          {tocItems.length > 0 ? (
            <div className='left_col'>
              <h3>Table of Contents</h3>
              <ul>
                {tocItems.map((item, index) => (
                  <li key={index} className={`toc-item toc-${item.level.toLowerCase()} ${activeTocItem === index ? 'active' : ''}`}>
                    <a href={`#${item.id}`} onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.id ,index);
                    }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>                                                                                                                               
            </div>
          ) : null}
          
          <div className='right_col'>
            <div className='blogImg'>
              <img  src={blogData.featured_image_url} alt={blogData.title.rendered} />
            </div>
            
            <div className='social_info d_flex'>
              <div className="col-left">
                <label className="d_flex">
                  <Image height={50} width={50} src={AuterIcon} alt="author_icon" />
                  By <a href="#">{blogData.author_name}</a>
                  <span>{blogData.human_time_diff}</span>
                </label>
              </div>
              <ul className="share-icons d_flex">
                <li><a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"><Image height={25} width={25} src={SocialIcon1} alt="twitter" /></a></li>
                <li><a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer"><Image height={25} width={25} src={SocialIcon2} alt="linkedin" /></a></li>
                <li><a href={facebookShareUrl} target="_blank" rel="noopener noreferrer"><Image height={25} width={25} src={SocialIcon3} alt="facebook" /></a></li>
                <li><a href={instagramShareUrl} target="_blank" rel="noopener noreferrer"><Image height={25} width={25} src={SocialIcon4} alt="instagram" /></a></li>
              </ul>
            </div>
            
            <div className='blog_detail_content' ref={contentRef} dangerouslySetInnerHTML={{ __html: blogData.content.rendered }}></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogDetailContent;
