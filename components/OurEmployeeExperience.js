import React, { useRef } from 'react';
import quata from '../public/images/quata1.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });


const OurEmployeeExperience = ({ a_left_side_section_title, employee_experience_detail }) => {
  const carouselRef = useRef(null);

  const options = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    autoHeight: true,
  };

  return (
    <div className='our_employee_experience'>
      <h2>{a_left_side_section_title}</h2>
      {employee_experience_detail && (
        <>
          <OwlCarousel ref={carouselRef} options={options}>
            {employee_experience_detail.map((experience, index) => (
              <div key={index} className='colin'>
                {experience.a_employee_image && (
                  <div className='img'>
                    <div
                      className='bg'
                      style={{ backgroundImage: `url(${experience.a_employee_image.url})` }}
                    ></div>
                  </div>
                )}
                <div className='text'>
                  <h3>
                    <Image 
                width={20}  
                height={20}  src={quata} alt="Quote" />
                    <strong>{experience.a_employee_name} / </strong>{experience.a_employee_role}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: experience.employee_quote }}></p>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </>
      )}
    </div>
  );
};

export default OurEmployeeExperience;
