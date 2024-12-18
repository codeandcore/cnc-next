import React, { useEffect, useState } from 'react';
import HirePopup from './HirePopup';
import Calendly from './Calendly';

const HireUs = ({BASE_URL, hireus_title, hireus_subtitle, hireus_button_text, hireus_list, contactData}) => {
    const [addUlClass, setAddUlClass] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.querySelector('.hireto_meetyou');
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom >= 0;
                setIsVisible(isVisible);
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1023);
        };
        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleBtnHover = () => {
        setAddUlClass(true);
    };

    const handleParentHoverOut = () => {
        setAddUlClass(false);
    };

    const handlePopupToggle = (title, content) => {
        setPopupVisible(!popupVisible);
        setPopupTitle(title);
        setPopupContent(content);
    };

    const scaleValue = isVisible ? 1 : 0.85;

    return (
        <>
            <div 
                className='hireto_meetyou'
                style={{
                    transform: `scale(${scaleValue})`,
                }}
                onMouseLeave={handleParentHoverOut}
            >             
                <div 
                    className='bg' 
                    style={{ 
                        backgroundImage: `url(${isMobile ? '/images/hiremobile_bg.jpg' : '/images/hire_bg.jpg'})` 
                    }}
                ></div>
                
                {!isMobile && (
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        preload="metadata" 
                        className="video"
                    >
                        <source src="/video/hire.mp4" type="video/mp4" />
                    </video>
                )}      
                
                <div className='wrapper d_flex'>
                    {hireus_title && (
                        <h2 dangerouslySetInnerHTML={{ __html: hireus_title }}></h2>
                    )}
                    
                    {hireus_subtitle && (
                        <h3 dangerouslySetInnerHTML={{ __html: hireus_subtitle }}></h3>
                    )}
                    
                    {hireus_list && hireus_list.length > 0 && (
                        <div className='allbtn'>
                            {hireus_button_text && (
                                <a 
                                    href='javascript:void(0)' 
                                    className={`btn ${addUlClass ? 'hide' : ''}`}
                                    onMouseEnter={handleBtnHover}
                                >
                                    <span></span>
                                    <em>{hireus_button_text}</em>
                                </a>
                            )}
                            
                            <Calendly  className={`btn ${addUlClass ? 'hide' : ''}`} 
                                url="https://calendly.com/mayur_soni/hire_dev" 
                                buttonText={"Let's Talk"}
                                />     
                            
                            <ul className={`d_flex ${addUlClass ? 'show' : ''}`}>
                                {hireus_list.map((column, index) => (
                                    <li key={index}>
                                        <div 
                                            className='btn' 
                                            onClick={() => handlePopupToggle(column.button_text, column.button_content)}
                                        >
                                            <span></span>
                                            <em>{column.button_text}</em>
                                        </div>    
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            
            {contactData && ( 
                <HirePopup 
                    BASE_URL={BASE_URL}
                    contact_form_service_label={contactData?.acf?.contact_form_service_label}
                    contact_form_service_list={contactData?.acf?.contact_form_service_list}
                    contact_form_budget_label={contactData?.acf?.contact_form_budget_label}
                    contact_form_budget_list={contactData?.acf?.contact_form_budget_list}
                    isVisible={popupVisible} onClose={() => setPopupVisible(false)} 
                    title={popupTitle} 
                    content={popupContent} 
                />
            )}
        </>
    );
};

export default HireUs;