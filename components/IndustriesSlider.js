import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import '../styles/components/industries-slider.css';
import EllipseArrow from '../public/images/ellipse_arr.png';
import UseOnScreen from './UseOnScreen';
import dynamic from 'next/dynamic';
// import OwlCarousel from './OwlCarousel';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });


const IndustriesSlider = ({ industries_title, industries_subtitle, industries_list, setPrefetchedData, setIsLoading, setIsDone, setIsFinish }) => {
    const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

    const titleRefs = useRef([]);
    const contentRefs = useRef([]);

    const options = {
        items: 3,
        loop: false,
        margin: 5,
        nav: true,
        autoWidth: true,
        responsive: {
            0: {
                items: 1,
                autoWidth: false,
            },
            768: {
                items: 3,
                autoWidth: true,
            }
        }
    };

    const owlCarouselRef = useRef(null);

    useEffect(() => {
        if (industries_list.length > 0) {
            const titleHeights = titleRefs.current.map(title => title?.offsetHeight || 0);
            const maxTitleHeight = Math.max(...titleHeights);
            const contentHeights = contentRefs.current.map(content => content?.offsetHeight || 0);
            const maxContentHeight = Math.max(...contentHeights);

            titleRefs.current.forEach(title => {
                if (title) title.style.height = `${maxTitleHeight}px`;
            });

            contentRefs.current.forEach(content => {
                if (content) content.style.height = `${maxContentHeight}px`;
            });
        }
    }, [industries_list]);

   

    const handleLinkClick = async (url, urlc, e = null) => {
        
    };

    return (
        <div className="industries_lider">
            <div className="wrapper d_flex">
                {industries_title && <h2>{industries_title}</h2>}
                {industries_subtitle && <p dangerouslySetInnerHTML={{ __html: industries_subtitle }} />}
            </div>
            <div className="inner">
                <OwlCarousel {...options} ref={owlCarouselRef}>
                    {industries_list.map((item, index) => (
                        <div key={index} className="colin">
                            <Link legacyBehavior href={`/industry/${item.button_url.post_name}`} passHref>
                                <a
                                    title={item.button_url.post_name}
                                    className="col"
                                    // onMouseEnter={() => handleMouseEnter(item.button_url.post_name)}
                                    onClick={(e) => handleLinkClick(`/industry/${item.button_url.post_name}`, item.button_url.post_name, e)}
                                >
                                    <div className="img">
                                        <div className="bg" style={{ backgroundImage: `url(${item.image.url})` }}></div>
                                        <span className="icon_link">
                                            <Image  src={item.icon.url} alt={item.title} width={18} height={18} />
                                        </span>
                                    </div>
                                    <h3 className="h2" ref={el => titleRefs.current[index] = el}>
                                        {item.title}
                                    </h3>
                                    <p ref={el => contentRefs.current[index] = el}>{item.content}</p>
                                    <div className="btn btnarrow">
                                        <em>{item.button_text}</em>
                                        <div>
                                            <Image src={EllipseArrow} alt="Read More" width={9} height={13} />
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </div>
    );
};

export default IndustriesSlider;
