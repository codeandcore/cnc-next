import React, { useState, useEffect } from 'react';
// import Select2 from 'react-select2-wrapper';
// import 'react-select2-wrapper/css/select2.css'; 
import he from 'he';
import AwardsLogo from './AwardsLogo';
import Image from 'next/image';

const CasestudingBanner = ({
  casestuding_banner_image,
  banner_background_image_mobile,
  casestuding_banner_video,
  casestuding_banner_title,
  casestuding_banner_description,
  IndustryTaxonomyeData,
  ServicesTaxonomyeData,
  onIndustryChange,
  onServiceChange,
  career_awards_logo_new,
  isLoadingk,
  menuList
}) => {
  const [industryTaxonomyData, setIndustryTaxonomyData] = useState([]);
  const [servicesTaxonomyData, setServicesTaxonomyData] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedService, setSelectedService] = useState('');


  useEffect(() => {
    if (IndustryTaxonomyeData) {
      setIndustryTaxonomyData(IndustryTaxonomyeData);
    }
    if (ServicesTaxonomyeData) {
      setServicesTaxonomyData(ServicesTaxonomyeData);
    }
  }, [IndustryTaxonomyeData, ServicesTaxonomyeData]);
  const generateIndustryOptions = () => {
    let options = [{ id: 'all', text: 'All Industries' }];
    let name;
    if (menuList && menuList.length > 0) {
      
      options = options.concat(
        menuList.map((menu) => ({
          id: menu.term_id,
          text: name = menu.slug.charAt(0).toUpperCase() + menu.slug.slice(1)
        }))
      );
    }
  
    if (industryTaxonomyData && industryTaxonomyData.length > 0) {
      options = options.concat(
        industryTaxonomyData.map((industry) => ({
          id: industry.term_id,
          text: he.decode(industry.name),
        }))
      );
    }
  
    return options;
  };
  

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    onIndustryChange(value);
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
    onServiceChange(value);
  };

  const generateServicesOptions = () => {
    let options = [{ id: 'all', text: 'All Services' }];
    if (servicesTaxonomyData && servicesTaxonomyData.length > 0) {
      options = options.concat(
        servicesTaxonomyData.map((service) => ({
          id: service.term_id,
          text: he.decode(service.name)
        }))
      );
    }
    return options;
  };

  const backgroundcasestuding =
    typeof window !== 'undefined' && window.innerWidth > 768
      ? casestuding_banner_image?.url
      : banner_background_image_mobile?.url;
  return (
    <div
      className="casestuding_banner"
      style={backgroundcasestuding ? { backgroundImage: `url(${backgroundcasestuding})` } : {}}
    >
      {casestuding_banner_video && (
        <video autoPlay loop muted playsInline preload="metadata" className="video">
          <source src={casestuding_banner_video.url} type="video/mp4" />
        </video>
      )}
      <div className="wrapper">
        {casestuding_banner_title && (
          <h1
            dangerouslySetInnerHTML={{
              __html: he.decode(casestuding_banner_title)
            }}
          ></h1>
        )}
        {casestuding_banner_description && <p>{casestuding_banner_description}</p>}
        <div className="wrap d_flex d_flex_js">
          <div className="selectcol">
            <h3>Industries</h3>
            {/* <Select2
              data={generateIndustryOptions()}
              value={selectedIndustry}
              options={{ placeholder: 'All Industries' }}
              onSelect={(e) => handleIndustryChange(e.target.value)}
            /> */}
          </div>
          <div className="selectcol">
            <h3>Services</h3>
            {/* <Select2
              data={generateServicesOptions()}
              value={selectedService}
              options={{ placeholder: 'All Services' }}
              onSelect={(e) => handleServiceChange(e.target.value)}
            /> */}
          </div>
          <span
            className="loaderdata"
            style={{ display: isLoadingk ? 'inline-block' : 'none' }}
          >
            <Image height={20} width={20} src="/images/rotate-right.png" alt="rotate-right" />
          </span>
        </div>
        {career_awards_logo_new && <AwardsLogo career_awards_logo={career_awards_logo_new} />}
      </div>
    </div>
  );
};

export default CasestudingBanner;
