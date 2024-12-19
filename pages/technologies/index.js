import { useState } from 'react';
import TechnoList from '@/components/TechnoList';
import HireUs from '@/components/HireUs';
import Head from 'next/head';
import TechnoBanner from '@/components/TechnoBanner';

const Technologies = ({ pageData }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{pageData?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            pageData?.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={pageData?.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={pageData?.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            pageData?.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={pageData?.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={pageData?.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={pageData?.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={pageData?.yoast_head_json.canonical} />
        <meta name="twitter:card" content={pageData?.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={pageData?.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={pageData?.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={pageData?.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={pageData?.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(pageData?.yoast_head_json.schema)}
        </script>
      </Head>
      <div className="main_wrapper">
        {pageData && (pageData.acf.banner_background_image ||
          pageData.acf.banner_background_image_mobile ||
          pageData.acf.technologies_banner_background_video ||
          pageData.acf.banner_clients_list ||
          pageData.acf.banner_description ||
          pageData.acf.banner_title) && (
          <TechnoBanner
            technologies_banner_background_video={
              pageData.acf.technologies_banner_background_video
            }
            banner_background_image={pageData.acf.banner_background_image}
            banner_background_image_mobile={
              pageData.acf.banner_background_image_mobile
            }
            banner_clients_list={pageData.acf.banner_clients_list}
            banner_description={pageData.acf.banner_description}
            banner_title={pageData.acf.banner_title}
          />
        )}
        {pageData && pageData.acf.technology_list && (
          <TechnoList
            technology_list={pageData.acf.technology_list}
          />
        )}
        {pageData && pageData.acf && 
          (pageData.acf.hireus_title ||
          pageData.acf.hireus_subtitle ||
          pageData.acf.hireus_button_text ||
          pageData.acf.hireus_list) && (
          <HireUs
            hireus_title={pageData.acf.hireus_title}
            hireus_subtitle={pageData.acf.hireus_subtitle}
            hireus_button_text={pageData.acf.hireus_button_text}
            hireus_list={pageData.acf.hireus_list}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const pageId = '1842';
    
    const res = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/${pageId}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch page data');
    }
    
    const pageData = await res.json();
    
    return {
      props: {
        pageData
      }
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    
    return {
      props: {
        pageData: null
      }
    };
  }
}

export default Technologies;