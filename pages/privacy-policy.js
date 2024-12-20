import React, { useEffect, useState } from 'react';
import he from 'he';
import Head from 'next/head';
import HireUs from '@/components/HireUs';

export default function PrivacyPolicy({ 
  initialPageData, 
  initialHireUsData 
}) {
  const [pageData, setPageData] = useState(initialPageData);
  console.log(pageData)
  return (
    <>
      <Head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta httpEquiv="content-language" content="en-US" />
  
  {/* Primary Meta Tags */}
  <title>{(pageData?.title?.rendered || "Codeandcore - Web development studio").trim()}</title>
  <meta
    name="description"
    content={(pageData?.yoast_head_json?.description || 
      "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
    ).trim()}
  />
  <meta name="keywords" content={pageData?.yoast_head_json?.og_keywords || ''} />
  
  {/* Canonical */}
  <link rel="canonical" href={pageData?.yoast_head_json?.canonical || (typeof window !== 'undefined' ? window.location.href : '')} />
  
  {/* Open Graph / Facebook */}
  <meta
    property="og:title"
    content={(pageData?.yoast_head_json?.og_title || "Codeandcore - Web development studio").trim()}
  />
  <meta
    property="og:description"
    content={(pageData?.yoast_head_json?.og_description || 
      "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
    ).trim()}
  />
  <meta property="og:type" content={pageData?.yoast_head_json?.og_type || "website"} />
  <meta
    property="og:url"
    content={pageData?.yoast_head_json?.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
  />
  <meta property="og:image" content={pageData?.yoast_head_json?.og_image?.[0]?.url || ''} />
  <meta property="og:locale" content={pageData?.yoast_head_json?.og_locale || 'en_US'} />
  
  {/* Twitter */}
  <meta name="twitter:card" content={pageData?.yoast_head_json?.twitter_card || 'summary_large_image'} />
  <meta name="twitter:site" content={pageData?.yoast_head_json?.twitter_site || ''} />
  <meta 
    name="twitter:title" 
    content={(pageData?.yoast_head_json?.twitter_title || pageData?.yoast_head_json?.og_title || "Codeandcore - Web development studio").trim()} 
  />
  <meta 
    name="twitter:description" 
    content={(pageData?.yoast_head_json?.twitter_description || pageData?.yoast_head_json?.og_description || 
      "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
    ).trim()}
  />
  
  {/* Schema.org */}
  {pageData?.yoast_head_json?.schema && (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(pageData.yoast_head_json.schema)
      }}
    />
  )}
</Head>

      {pageData && (
        <div className='policy-page Warranty_page'>
          <div className='wrapper'>
            <div className='title'>
              {pageData.title && <h1>{pageData.title.rendered}</h1>}
            </div>
            {pageData.acf.content_editor && (
              <div 
                className='inner' 
                dangerouslySetInnerHTML={{ 
                  __html: he.decode(pageData.acf.content_editor) 
                }}
              >
              </div>
            )}
          </div>
        </div>
      )}

      {initialHireUsData &&  (
        <HireUs
          hireus_title={initialHireUsData.acf.hireus_title}
          hireus_subtitle={initialHireUsData.acf.hireus_subtitle}
          hireus_button_text={initialHireUsData.acf.hireus_button_text}
          hireus_list={initialHireUsData.acf.hireus_list}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    
  
  try {
    // const response = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/privacy-policy`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3618`);
    const response = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3618`);
    const pageData = await response.json();

    // const hireUsResponse = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const hireUsResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const initialHireUsData = await hireUsResponse.json();

    return {
      props: {
        initialPageData: pageData,
        initialYoastData: pageData.yoast_head_json || null,
        initialHireUsData
      }
    };
  } catch (error) {
    console.error("Error fetching data from WordPress API:", error);
    return {
      props: {
        initialPageData: null,
        initialYoastData: null,
        initialHireUsData
      }
    };
  }
}