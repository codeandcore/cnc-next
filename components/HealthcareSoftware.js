import React from 'react';

const HealthcareSoftware = ({ title, subtitle, items }) => {
    return (
        <div className="healthcare_software">
            <div className="wrapper">
                <div className="top_col">
                    {title && (<h2>{title}</h2>)}
                    {subtitle && (<p>{subtitle}</p>)}
                </div>
                {items && (
                    <div className="wrap d_flex">
                        {items.map((item, index) => (
                            <div className="col" key={index}>
                                {item.healthcare_software_image && (
                                    <img src={item.healthcare_software_image.url} alt={item.healthcare_software_title || 'Healthcare Software'} />
                                )}
                                {item.healthcare_software_title && (
                                    <h3>{item.healthcare_software_title}</h3>
                                )}
                                {item.healthcare_software_content && (
                                    <p>{item.healthcare_software_content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthcareSoftware;