import { useState, useEffect } from 'react';
import Image from 'next/image'; 
import HirePopup from '../components/HirePopup'; 

const WhyChoose = ({
  chooseus_title,
  chooseus_content,
  chooseus_years_title,
  chooseus_years_subtitle,
  chooseus_years_image,
  chooseus_adobe_title,
  chooseus_adobe_image,
  chooseus_languages_title,
  chooseus_languages_subtitle,
  chooseus_languages_image,
  savvy_content,
  chooseus_clients_title,
  chooseus_clients_subtitle,
  chooseus_clients_image,
  chooseus_projects_delivered_title,
  chooseus_projects_delivered_subtitle,
  chooseus_projects_delivered_image,
  chooseus_digital_products_title,
  chooseus_digital_products_button_text,
  chooseus_digital_products_button_url,
  chooseus_team_title,
  chooseus_team_subtitle,
  chooseus_digital_form_title,
  chooseus_digital_form_subtitle,
  chooseus_team_image,
  chooseus_iso_title,
  chooseus_iso_image,
  chooseus_pagespeed_title,
  chooseus_pagespeed_image,
  chooseus_iso_text,
  chooseus_flexible_hiring_icon,
  chooseus_digital_products_image,
  chooseus_pagespeed_button_text,
  chooseus_pagespeed_button_url
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const option = {
    title: chooseus_digital_form_title,
    content: chooseus_digital_form_subtitle
  };

  const handlePopupToggle = (title, content) => {
    setPopupVisible(!popupVisible);
    setPopupTitle(title);
    setPopupContent(content);
  };

  useEffect(() => {
    const cols = document.querySelectorAll('.col');
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cols.length); 
      cols.forEach((col, index) => {
        if (index === randomIndex) {
          col.classList.add('active'); 
        } else {
          col.classList.remove('active'); 
        }
      });
    }, 500); 

    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    if (popupVisible) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [popupVisible]);

  return (
    <>
      <div 
      className="whyChoose_us"
      
      >
          <div className='wrapper'>
            <div className='top_title d_flex'>
            {chooseus_title && <h2 dangerouslySetInnerHTML={{ __html: chooseus_title }} />}
             {chooseus_content && <p>{chooseus_content}</p>}   
            </div>
            <div className='inner'>
                <div className='top_inner d_flex'>
                  <div className='colin'>
                    {(chooseus_years_title || chooseus_years_subtitle) &&
                      <div className='col col1 big'>
                        <div className='textin'>
                          <div className='leftt'>
                            <h3>{chooseus_years_title}</h3>
                            <p>{chooseus_years_subtitle}</p>
                          </div>
                          {(chooseus_years_image) &&
                          <div className='rightt'>
                            <Image width={100} height={100} src={chooseus_years_image.url} alt={chooseus_years_title}/>
                          </div>
                         }
                        </div>
                      </div>
                    }
                      {(chooseus_adobe_title) &&
                      <div className='col col2 small'>
                          <div className='textin'>
                            <div className='leftt'>
                            <h3>{chooseus_iso_text}</h3>
                            <p dangerouslySetInnerHTML={{ __html: chooseus_adobe_title }} ></p>
                            </div>
                            {(chooseus_adobe_image) &&
                            <div className='rightt'>
                              <Image width={100} height={100} src={chooseus_adobe_image.url} alt={chooseus_adobe_image.name}/>
                            </div>
                            }
                         </div>
                      </div>
                    }
                  </div>
                  <div className='colin'>
                    {(chooseus_languages_title || chooseus_languages_subtitle) &&
                      <div className='col col3 small'>
                        <div className='textin'>
                            <div className='leftt'>
                              <h3>{chooseus_languages_title}</h3>
                              <p dangerouslySetInnerHTML={{ __html: chooseus_languages_subtitle }} ></p>
                            </div>
                            {(chooseus_languages_image) &&
                            <div className='rightt'>
                              <Image width={100} height={100} src={chooseus_languages_image.url} alt={chooseus_languages_image.name}/>
                            </div>
                           }
                         </div>
                      </div>
                    }
                   {(savvy_content || chooseus_clients_title ||chooseus_clients_subtitle) &&
                   
                      <div className='col_in d_flex'>
                        {(savvy_content) &&
                        <div className='col col4 big'>
                          <div className='textin'>
                            <div className='leftt'>
                                <p>{savvy_content}</p>
                              </div>
                              {(chooseus_flexible_hiring_icon) &&
                              <div className='rightt'>
                                <Image width={100} height={100} src={chooseus_flexible_hiring_icon.url} alt={chooseus_flexible_hiring_icon.name}/>
                              </div>
                            }                              
                          </div>
                        </div>
                        }
                        <div className='col col5 big'>
                          <div className='textin'>
                              <div className='leftt'>
                                <h3>{chooseus_clients_title}</h3>
                                <p>{chooseus_clients_subtitle}</p>
                              </div>
                              {(chooseus_clients_image) &&
                                <div className='rightt'>
                                  <Image width={100} height={100} src={chooseus_clients_image.url} alt={chooseus_clients_image.name}/>
                                </div>
                              }
                          </div>
                        </div>
                      </div>
                      }                   
                  </div>

                  <div className='colin'>
                     {(chooseus_projects_delivered_title || chooseus_projects_delivered_subtitle ) &&
                      <div className='col col6 small'>
                          <div className='textin'>
                              <div className='leftt'>
                                <h3>{chooseus_projects_delivered_title}</h3>
                                <p>{chooseus_projects_delivered_subtitle}</p>
                              </div>
                              {(chooseus_projects_delivered_image) &&
                              <div className='rightt'>
                                <Image  width={100} height={100} src={chooseus_projects_delivered_image.url} alt={chooseus_projects_delivered_image.name}/>
                              </div>
                              }
                          </div>
                      </div>
                    }
                      {(chooseus_digital_products_title || chooseus_digital_products_button_text ) &&
                      <div className='col col7 big'>
                        <div className='textin'>
                              <h4 dangerouslySetInnerHTML={{ __html: chooseus_digital_products_title }} ></h4>
                              {/* <span href='#' className='btn'
                              onClick={() => handlePopupToggle(option.title, option.content)} 
                              >
                                <span></span>
                                <em>{he.decode(chooseus_digital_products_button_text)}</em>
                              </span> */}
                              {(chooseus_projects_delivered_image) &&
                                <Image width={200} height={100} src={chooseus_digital_products_image.url} alt={chooseus_digital_products_image.name}/>
                              }
                              
                          </div>
                      </div>
                    }
                  </div>

                </div>
                <div className='bottom_inner d_flex'>
                  {(chooseus_team_title || chooseus_team_subtitle ) &&
                    <div className='col col8 small'>
                        <div className='textin'>
                            <div className='leftt'>
                              <h3>{chooseus_team_title}</h3>
                              <p dangerouslySetInnerHTML={{ __html: chooseus_team_subtitle }} ></p>

                            </div>
                            {(chooseus_team_image) &&
                              <div className='rightt'>
                                <Image width={100} height={100} src={chooseus_team_image.url} alt={chooseus_team_image.name}/>
                              </div>
                            }
                        </div>
                    </div>
                  }
                  {(chooseus_iso_title || chooseus_iso_image ) &&
                    <div className='col col9 small'>
                       <div className='textin'>
                            <div className='leftt'>                              
                            <p dangerouslySetInnerHTML={{ __html: chooseus_iso_title }} ></p>
                            </div>
                            {(chooseus_iso_image) &&
                              <div className='rightt'>
                                <Image width={100} height={100} src={chooseus_iso_image.url} alt={chooseus_iso_image.name}/>
                              </div>
                            }
                        </div>
                    </div>
                  }
                     {(chooseus_pagespeed_title || chooseus_pagespeed_button_text ) &&
                    <div className='col col10 small'>
                        <div className='textin'>
                            <div className='leftt'>                              
                            <h4 dangerouslySetInnerHTML={{ __html: chooseus_pagespeed_title }} ></h4>
                            </div>
                            {(chooseus_pagespeed_button_text) &&
                              <div className='rightt'>
                              <a 
                              className="btn" 
                              href={chooseus_pagespeed_button_url}
                              onClick={() => handlePopupToggle(option.title, option.content)} 
                              ><em>{chooseus_pagespeed_button_text}</em></a>
                              </div>
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
          </div>
      </div>

      <HirePopup isVisible={popupVisible} onClose={() => setPopupVisible(false)} title={popupTitle} content={popupContent} />
    </>
  );
};

export default WhyChoose;
