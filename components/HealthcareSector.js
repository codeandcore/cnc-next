import React from 'react';

const HealthcareSector = ({ title, subtitle, items }) => {
    return (
        <div className="healthcare_sector">
            <div className="wrapper">
                <div className="top_col">
                    {title && (<h2>{title}</h2>)}
                    {subtitle && (<p>{subtitle}</p>)}
                </div>
                {items && (
                    <div className="wrap d_flex">
                        {items.map((item, index) => (
                            <div className="col" key={index}>
                                {item.healthcare_sector_listing_title && (
                                    <h3>{item.healthcare_sector_listing_title}</h3>
                                )}
                                {item.healthcare_sector_listing_content && (
                                    <p dangerouslySetInnerHTML={{ __html: item.healthcare_sector_listing_content }}></p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthcareSector;
