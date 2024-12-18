import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import FooterLogo from '../public/images/cnc-logo-black.svg';
import Backtop from '../public/images/backtop.svg';
import ChatIcon from '../public/images/chat-icon.svg';
import ChatBoard from './ChatBoard';

const Footer = ({ ApiData }) => {
  const [showBackTop, setShowBackTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };

  const quickLinksChunks = chunkArray(ApiData?.quick_links || [], 4);

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    setShowBackTop(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChatBoard = () => {
    setIsChatOpen(!isChatOpen);
  };

  return ApiData ? (
    <>
      <div className="sticky-btn">
        <span
          className={`back-top ${showBackTop ? 'show' : ''}`}
          onClick={handleSmoothScroll}
        >
          <Image height={35}
                      width={35} src={Backtop} alt="Back to top" />
        </span>
        <span
          className={`chatbord ${showBackTop ? 'show' : ''}`}
          onClick={toggleChatBoard}
        >
          <Image height={35}
                      width={35} src={ChatIcon} alt="Chat" />
        </span>
      </div>

      {(ApiData.chatbot_logo ||
        ApiData.chatbot_title ||
        ApiData.chatbot_subtitle ||
        ApiData.chat_name ||
        ApiData.chat_email ||
        ApiData.start_chat_button ||
        ApiData.chat_title ||
        ApiData.whatsapp_link ||
        ApiData.whatsapp_title ||
        ApiData.schedule_title ||
        ApiData.thank_you_message ||
        ApiData.chat_icon ||
        ApiData.whatsapp_icon ||
        ApiData.schedule_icon) && (
        <ChatBoard
          isChatOpen={isChatOpen}
          toggleChatBoard={toggleChatBoard}
          chatbot_logo={ApiData.chatbot_logo}
          chatbot_title={ApiData.chatbot_title}
          chatbot_subtitle={ApiData.chatbot_subtitle}
          chat_name={ApiData.chat_name}
          chat_email={ApiData.chat_email}
          start_chat_button={ApiData.start_chat_button}
          chat_title={ApiData.chat_title}
          whatsapp_link={ApiData.whatsapp_link}
          whatsapp_title={ApiData.whatsapp_title}
          schedule_title={ApiData.schedule_title}
          thank_you_message={ApiData.thank_you_message}
          chat_icon={ApiData.chat_icon}
          whatsapp_icon={ApiData.whatsapp_icon}
          schedule_icon={ApiData.schedule_icon}
        />
      )}

<footer>
  <div className="wrapper">
    <Link href="/" className={`footer_logo ${router?.pathname === '/' ? 'current' : ''}`}>
      <Image 
        src={FooterLogo} 
        alt="logo" 
        width={400} 
        height={100} 
      />
    </Link>
    <div className="footer_top d_flex">
      {(ApiData?.footer_location || ApiData?.footer_location_title || ApiData?.footer_location_map) && (
        <div className="col">
          {ApiData?.footer_location_title && <h3>{ApiData.footer_location_title}</h3>}
          {ApiData?.footer_location && <p>{ApiData.footer_location}</p>}
          {ApiData?.footer_location_map && (
            <Link href={ApiData?.footer_location_map.url} target={ApiData.footer_location_map.target}>
              {ApiData.footer_location_map.title}
            </Link>
          )}
        </div>
      )}
      {(ApiData.stay_connected_title || ApiData.social_share_list) && (
        <div className="col">
          {ApiData.stay_connected_title && <h3>{ApiData.stay_connected_title}</h3>}
          <div className="social d_flex">
            {ApiData.social_share_list.map((social, index) => (
              <a href={social.social_url} key={index} target="_blank">
                <Image 
                  src={social.social_icon.url} 
                  alt={social.social_icon.name} 
                  width={24} 
                  height={24} 
                />
              </a>
            ))}
          </div>
        </div>
      )}
      {(ApiData?.quick_links_title || ApiData?.quick_links) && (
        <div className="col">
          {ApiData.quick_links_title && <h3>{ApiData.quick_links_title}</h3>}
          <div className="wrap d_flex">
            {quickLinksChunks.map((chunk, index) => (
              <ul key={index}>
                {chunk.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link?.menu_link}
                      className={`${router?.pathname === link?.menu_link ? 'current' : ''}`}
                    >
                      {link.menu_label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>

    {(ApiData.certified_by_title ||
      ApiData.certified_by_list ||
      ApiData.reviews_list ||
      ApiData.reviews_title ||
      ApiData.partnerships_list ||
      ApiData.partnerships_title) && (
      <div className="footer_mid d_flex">
        {(ApiData.certified_by_title || ApiData.certified_by_list) && (
          <div className="col">
            {ApiData.certified_by_title && <h3>{ApiData.certified_by_title}</h3>}
            {ApiData.certified_by_list && (
              <div className="logos d_flex">
                {ApiData.certified_by_list.map((menuItem, index) => (
                  <a href={menuItem.url} key={index} target="_blank">
                    <Image 
                      src={menuItem.logo.url} 
                      alt={menuItem.logo.name} 
                      width={100} 
                      height={40} 
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {(ApiData.reviews_title || ApiData.reviews_list) && (
          <div className="col">
            {ApiData.reviews_title && <h3>{ApiData.reviews_title}</h3>}
            {ApiData.reviews_list && (
              <div className="logos d_flex">
                {ApiData.reviews_list.map((menuItem, index) => (
                  <a href={menuItem.url} key={index} target="_blank">
                    <Image 
                      src={menuItem.logo.url} 
                      alt={menuItem.logo.name} 
                      width={100} 
                      height={40} 
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )}
    {(ApiData.copyright_text || ApiData.copyright_menu) && (
      <div className="footer_bottom d_flex">
        <p>©{currentYear} {ApiData.copyright_text}</p>
        {ApiData.copyright_menu && (
          <ul className="d_flex">
            {ApiData.copyright_menu.map((menuItem, index) => (
              <li key={index}>
                <Link
                  href={menuItem.url}
                  className={`${router.pathname === menuItem.url ? 'current' : ''}`}
                >
                  {menuItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
</footer>
    </>
  ) : null;
};

export default Footer;
