import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import EllipseArrow from '../public/images/ellipse_arr.png';
import HireUs from '@/components/HireUs';
import Head from 'next/head';

const Sitemap = ({ 
    initialYoastData, 
    pageData: initialPageData
}) => {
    const [pageData, setPageData] = useState(initialPageData || null);
    const [activeSection, setActiveSection] = useState('pages');

    return (
        <>
         <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{initialYoastData.title || "Codeandcore - Web development studio"}</title>
        
        <meta
          property="og:title"
          content={initialYoastData.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            initialYoastData.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={initialYoastData.og_type || "website"} />
        <meta
          property="og:url"
          content={initialYoastData.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={initialYoastData.og_image && initialYoastData.og_image[0].url} />
        <link rel="canonical" href={initialYoastData.canonical} />
        <meta name="twitter:card" content={initialYoastData.twitter_card} />
        <meta name="twitter:site" content={initialYoastData.twitter_site} />
        <meta name="twitter:title" content={initialYoastData.twitter_title} />
        <meta name="twitter:description" content={initialYoastData.twitter_description} />
        <meta property="og:locale" content={initialYoastData.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(initialYoastData.schema)}
        </script>
      </Head>
        {pageData && (pageData?.title || pageData?.custom_json) && (
            <div className='policy-page site-map'>
                <div className='wrapper'>
                    <div className='title'>
                        {pageData.title && (<h1>{pageData.title.rendered}</h1>)}
                    </div>
                    <div className='inner d_flex'>
                        <div className='left-col'>
                        {pageData.custom_json.data && (
                            <ul>
                                {Object.keys(pageData.custom_json.data).map((item, index) => (
                                <li key={index}                     
                                className={activeSection === item ? 'active' : ''} 
                                >
                                    <Link 
                                    href={`#${item}`}
                                    onClick={(e) => {e.preventDefault();setActiveSection(item);}} 
                                    >
                                        {item}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        )}
                        </div>
                        <div className='right-col'>
                        {Object.keys(pageData.custom_json.data).map((item, index) => (
                            activeSection === item ? (
                            <div key={index} className='colin' id={item} >
                                <h3>{item}</h3>
                                <div className='wrap d_flex'>
                                {pageData.custom_json.data[item].map((list, ind) => (
                                    <Link  key={ind}
                                    href={item !== 'pages' ? `/${item}/${list.slug}` : `/${list.slug}`} 
                                    className="btn btnarrow"
                                    >
                                        <em dangerouslySetInnerHTML={{ __html: list.name }}></em>
                                        <div>
                                            <Image src={EllipseArrow} alt="Arrow" width={9} height={13} />
                                        </div>
                                    </Link>
                                ))}
                                </div>                    
                            </div>
                            ) : null
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
        {/* {pageData && (pageData.acf.hireus_title || pageData.acf.hireus_subtitle || pageData.acf.hireus_button_text || pageData.acf.hireus_list) && (
            <HireUs
            BASE_URL={process.env.NEXT_PUBLIC_BASE_URL}
            hireus_title={pageData.acf.hireus_title}
            hireus_subtitle={pageData.acf.hireus_subtitle}
            hireus_button_text={pageData.acf.hireus_button_text}
            hireus_list={pageData.acf.hireus_list}
            ></HireUs>
        )} */}
        </>
    );
};

export async function getServerSideProps() {
    const env = process.env.NODE_ENV;       

    try {
        // const response = await fetch(env !== "development"
        //     ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/sitemap`
        //     : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3470`);
        const response = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3470`);
        const pageData = await response.json();

        return {
            props: {
                initialYoastData: pageData.yoast_head_json || null,
                pageData
            }
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return {
            props: {
                initialYoastData: null,
                pageData: null
            }
        };
    }
}

export default Sitemap;
