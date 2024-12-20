import { useState, useEffect } from 'react';
import Head from 'next/head';

// Import components 
import Life from '@/components/Life';
import HireUs from '@/components/HireUs';
import FestivalCelebration from '@/components/FestivalCelebration';
import Linkedinlife from '@/components/Linkedinlife';
import Socialmedialife from '@/components/Socialmedialife';
import HappyHours from '@/components/HappyHours';

export default function LifeCnc({ initialCncData, initialCncPageData }) {
  const [cncData, setCncData] = useState(initialCncPageData);
  const [cncPageData, setCncOPageData] = useState(initialCncData);
  
  const env = process.env.NEXT_PUBLIC_ENV;

  const defaultTitle = "Codeandcore - Web development studio";
  const defaultDescription = "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.";

  return (
    <>
      <Head>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content={cncData.yoast_head_json?.og_locale || "en-US"} />
      
      {/* Primary Meta Tags */}
      <title>{cncData.title?.rendered || defaultTitle}</title>
      <meta name="description" content={cncData.yoast_head_json?.og_description || defaultDescription} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={cncData.yoast_head_json?.og_title || defaultTitle} />
      <meta property="og:description" content={cncData.yoast_head_json?.og_description || defaultDescription} />
      <meta property="og:type" content={cncData.yoast_head_json?.og_type || "website"} />
      <meta 
        property="og:url" 
        content={cncData.yoast_head_json?.og_url || (typeof window !== 'undefined' ? window.location.href : '')} 
      />
      {cncData.yoast_head_json?.og_image?.[0]?.url && (
        <>
          <meta property="og:image" content={cncData.yoast_head_json.og_image[0].url} />
          <meta property="og:image:width" content={cncData.yoast_head_json.og_image[0].width} />
          <meta property="og:image:height" content={cncData.yoast_head_json.og_image[0].height} />
        </>
      )}
      <meta property="og:locale" content={cncData.yoast_head_json?.og_locale || "en-US"} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={cncData.yoast_head_json?.twitter_card || "summary_large_image"} />
      <meta name="twitter:site" content={cncData.yoast_head_json?.twitter_site} />
      <meta name="twitter:title" content={cncData.yoast_head_json?.twitter_title || defaultTitle} />
      <meta name="twitter:description" content={cncData.yoast_head_json?.twitter_description || defaultDescription} />
      
      {/* Canonical Link */}
      {cncData.yoast_head_json?.canonical && (
        <link rel="canonical" href={cncData.yoast_head_json.canonical} />
      )}

      {/* Schema.org JSON-LD */}
      {cncData.yoast_head_json?.schema && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(cncData.yoast_head_json.schema)
          }}
        />
      )}
    </Head>
      <div className='main_wrapper'>
      {cncPageData && (cncPageData.acf.life_codeandcore_title || cncPageData.acf.life_codeandcore_button_text || cncPageData.acf.life_codeandcore_highlights || cncPageData.acf.life_codeandcore_bottom_text ) && ( 
        <Life
        className={'lifebanner'}
          life_codeandcore_title={cncPageData.acf.life_codeandcore_title}
          life_codeandcore_button_text={cncPageData.acf.life_codeandcore_button_text}
          life_codeandcore_button_url={cncPageData.acf.life_codeandcore_button_url}
          life_codeandcore_highlights={cncPageData.acf.life_codeandcore_highlights}
          life_codeandcore_big_images={cncPageData.acf.life_codeandcore_big_images}
          life_codeandcore_medium_images={cncPageData.acf.life_codeandcore_medium_images}
          life_codeandcore_small_images={cncPageData.acf.life_codeandcore_small_images}
          life_codeandcore_bottom_text={cncPageData.acf.life_codeandcore_bottom_text}
        ></Life>
             )}

        {cncData && 
          <HappyHours 
            our_culture_small_title={cncData.acf.our_culture_small_title}
            our_culture_title={cncData.acf.our_culture_title}
            our_culture_first_gallery={cncData.acf.our_culture_first_gallery}
            our_culture_second_gallery={cncData.acf.our_culture_second_gallery}
            our_culture_bottom_content={cncData.acf.our_culture_bottom_content}
          />
        }

        {cncData && (cncData.acf?.celebration_content || cncData.acf?.celebration_list || cncData.acf?.celebration_year_title) && 
          <FestivalCelebration 
            celebration_content={cncData.acf.celebration_content}
            celebration_list={cncData.acf.celebration_list}
            celebration_year_title={cncData.acf.celebration_year_title}
          />
        }

        {cncData &&
          <Linkedinlife
            social_media_linkdin_title={cncData.acf.social_media_linkdin_title}
          />
        }

        {cncData &&
          <Socialmedialife 
            social_media_title={cncData.acf.social_media_title}
            socialData={cncData.socialData}
          />
        }

        {cncPageData &&
          (cncPageData?.acf.hireus_title ||
            cncPageData?.acf.hireus_subtitle ||
            cncPageData?.acf.hireus_button_text ||
            cncPageData?.acf.hireus_list) && (
            <HireUs
              hireus_title={cncPageData?.acf.hireus_title}
              hireus_subtitle={cncPageData?.acf.hireus_subtitle}
              hireus_button_text={cncPageData?.acf.hireus_button_text}
              hireus_list={cncPageData?.acf.hireus_list}
            />
          )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    
  try {
    // const hireUsResponse = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const hireUsResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);

    const hireUsData = await hireUsResponse.json();

    // const otherComponentsResponse = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/life-at-cnc`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1665`);

    const otherComponentsResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1665`);
    const otherComponentsData = await otherComponentsResponse.json();

    return {
      props: {
        initialCncData: hireUsData,
        initialCncPageData: otherComponentsData,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialCncData: null,
        initialCncPageData: null,
      }
    };
  }
}