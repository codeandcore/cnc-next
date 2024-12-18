import Link from 'next/link';
import Image from 'next/image';
import he from 'he';
import ArrowIcon from '../public/images/arrow_a.png';

const SolvingIndustriesChallenges = ({ sic_title, solving_industries, sic_button_name, sic_button_link }) => {
    const handleSmoothScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    };

    return (
        <div className='industries_challenges'>
            <div className='wrapper'>
                {sic_title && <h2>{sic_title}</h2>}
                {solving_industries && (
                    <div className='wrap d_flex'>
                        {solving_industries.slice(0, 2).map((industry, index) => (
                            <Link legacyBehavior href={industry.page_link} key={index} passHref>
                                <a className={`col col${index + 1}`} onClick={handleSmoothScroll}>
                                    {industry.sic_image && (
                                        <img
                                            src={industry.sic_image.url}
                                            alt={industry.si_label}
                                        />
                                    )}
                                    <div className='text'>
                                        {industry.si_label && (
                                            <h3 dangerouslySetInnerHTML={{ __html: he.decode(industry.si_label) }}></h3>
                                        )}
                                        {industry.si_content && (
                                            <p dangerouslySetInnerHTML={{ __html: he.decode(industry.si_content) }}></p>
                                        )}
                                    </div>
                                </a>
                            </Link>
                        ))}
                        <div className='colin d_flex'>
                            {solving_industries.slice(2).map((industry, index) => (
                                <Link legacyBehavior href={industry.page_link} key={index} passHref>
                                    <a className={`col col${index + 3}`} onClick={handleSmoothScroll}>
                                        {industry.sic_image && (
                                            <img
                                                src={industry.sic_image.url}
                                                alt={industry.si_label}
                                            />
                                        )}
                                        <div className='text'>
                                            {industry.si_label && (
                                                <h3 dangerouslySetInnerHTML={{ __html: he.decode(industry.si_label) }}></h3>
                                            )}
                                            {industry.si_content && (
                                                <p dangerouslySetInnerHTML={{ __html: he.decode(industry.si_content) }}></p>
                                            )}
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                        {sic_button_link && (
                            <div className='mid'>
                                <Link legacyBehavior href={sic_button_link} passHref>
                                    <a className='btn ball' onClick={handleSmoothScroll}>
                                        <em>
                                            <span dangerouslySetInnerHTML={{ __html: he.decode(sic_button_name) }} />
                                            <br />
                                            <Image src={ArrowIcon} alt='arrow' width={20} height={20} />
                                        </em>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolvingIndustriesChallenges;
