import { useState } from 'react';
import Image from 'next/image';

const PortfolioFeatures = ({ feature_section_title, features_detail }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveFeatureIndex(index);
  };

  return (
    <div className="portfolio_features">
      <div className="wrapper">
        {feature_section_title && <h2>{feature_section_title}</h2>}
        <div className="wrap d_flex d_flex_at">
          <ul className="left_col">
            {features_detail.map((feature, index) => (
              <li
                key={index}
                className={index === activeFeatureIndex ? 'active' : ''}
                onClick={() => handleTabClick(index)}
              >
                <span>{index + 1}</span>
                {feature.feature_title}
                <div className="colin">
                  <div className="img">
                    <Image
                      src={feature.feature_image.url}
                      alt={feature.feature_image.name}
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="text">
                    <h3>{feature.feature_title}</h3>
                    <p>{feature.feature_description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="right_col">
            <div className="colin active">
              <div className="img">
                <img
                  src={features_detail[activeFeatureIndex].feature_image.url}
                  alt={features_detail[activeFeatureIndex].feature_image.name}
                 
                />
              </div>
              <div className="text">
                <h3>{features_detail[activeFeatureIndex].feature_title}</h3>
                <p>{features_detail[activeFeatureIndex].feature_description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFeatures;
