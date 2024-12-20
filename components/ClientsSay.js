import React, { useState, useRef } from 'react';

import EllipseArrow from '../public/images/ellipse_arr.png'; 
import Sarrow from '../public/images/arrow_ss1.svg'; 
import UseOnScreen from './UseOnScreen';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });


const ClientsSay = ({ our_clients_title, our_clients_subtitle, our_clients_button_text, our_clients_button_url, our_clients_testimonials }) => {
    const options = {
        items: 1,
        loop: false,
        nav: true,
        dots: false,
        autoHeight: true,
        nextArrow: <div className="arrow"><Image height={100}
        width={100} src={Sarrow} alt="Next Arrow" /></div>,
        prevArrow: <div className="arrow"><Image height={100}
        width={100} src={Sarrow} alt="Previous Arrow" /></div>
    };

    const owlCarouselRef = useRef(null);
    const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

    const scaleValue = isVisible ? 1 : 0.85;

    return (
        <div
            className="our_clientssay"
            ref={ref}
            style={{
                transform: `scale(${scaleValue})`,
            }}
        >
            <div className="wrapper d_flex">
                <div className="left_col">
                    {our_clients_title && (
                        <h2 dangerouslySetInnerHTML={{ __html: our_clients_title }} />
                    )}
                    {our_clients_subtitle && <p>{our_clients_subtitle}</p>}
                    {our_clients_button_text && our_clients_button_url && (
                        <a href={our_clients_button_url} className="btn btnarrow">
                            <span></span>
                            <em>{our_clients_button_text}</em>
                            <div>
                                <Image height={13}
                      width={9} src={EllipseArrow} alt="Double Quote" />
                            </div>
                        </a>
                    )}
                </div>
                <div className="right_col">
                    {our_clients_testimonials && our_clients_testimonials.length > 0 && (
                        <OwlCarousel options={options} ref={owlCarouselRef}>
                            {our_clients_testimonials.map((item, index) => (
                                <div key={index} className="col">
                                    <h2 dangerouslySetInnerHTML={{ __html: item.testimonial }} />
                                    <div className="clintlist d_flex">
                                        <ul className="d_flex">
                                            {item.person_photo && (
                                                <li>
                                                    <Image
                                                        height={100}
                                                        width={1000}
                                                        src={item.person_photo.url}
                                                        alt={item.person_photo.name}
                                                    />
                                                </li>
                                            )}
                                            {item.company_logo && (
                                                <li>
                                                    <Image
                                                        height={100}
                                                        width={1000}
                                                        src={item.company_logo.url}
                                                        alt={item.company_logo.name}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                        <div className="text">
                                            <h4>{item.clientName}</h4>
                                            <label className="d_flex">{item.person_name}</label>
                                            <label
                                                className="d_flex"
                                                dangerouslySetInnerHTML={{ __html: item.person_designation }}
                                            ></label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                       </OwlCarousel>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientsSay;
