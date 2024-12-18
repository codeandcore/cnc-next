import React, { useEffect, useState } from 'react';
import he from 'he';
import Head from 'next/head';
import HireUs from '@/components/HireUs';

export default function PrivacyPolicy({ 
  initialPageData, 
  initialHireUsData 
}) {
  const [pageData, setPageData] = useState(initialPageData);
 
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{pageData && pageData.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            pageData && pageData.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={pageData && pageData.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={pageData && pageData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            pageData && pageData.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={pageData && pageData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={pageData && pageData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={pageData && pageData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={pageData && pageData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={pageData && pageData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={pageData && pageData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={pageData && pageData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={pageData && pageData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={pageData && pageData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(pageData && pageData.yoast_head_json.schema)}
        </script>
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
  const env = process.env.NEXT_PUBLIC_ENV;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/3618`);
    const pageData = await response.json();

    const hireUsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/7`);
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