import React, { useState } from 'react';

const OurApproach = ({ our_approach_title, our_approach_subtitle, our_approach_list }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    return (
        <div className='our_approach'>
            <div className='wrapper'>
                <div className='top_col d_flex'>
                    <div className='left_col'>
                        {our_approach_title && (<h2>{our_approach_title}</h2>)}
                        {our_approach_subtitle && (<p dangerouslySetInnerHTML={{ __html: our_approach_subtitle }}></p>)}
                    </div>
                    {our_approach_list && (
                        <ul className='right_col d_flex'>
                            {our_approach_list.map((tab, index) => (
                                <li
                                    key={index}
                                    className={activeTab === index ? 'active' : ''}
                                    onClick={() => handleTabClick(index)}
                                    data-attr={index}
                                >
                                    {tab.tag}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {our_approach_list && (
                    <div className='bottom_col'>
                        {our_approach_list.map((tab, index) => (
                            <div
                                key={index}
                                className={`colin d_flex ${activeTab === index ? 'active' : ''}`}
                                id={index}
                            >
                                <div className='img'>
                                    <img  src={tab.image.url} alt={tab.image.title} />
                                </div>
                                <div className='text'>
                                    <h3>{tab.title}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: tab.content }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurApproach;
