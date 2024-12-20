import React, { useState, useEffect } from 'react';
import he from 'he';
import HireUs from '../components/HireUs';
import Head from 'next/head';

const Warranty = ({ pageData, yoastData, initialHireUsData }) => {
  const [currentPageData, setCurrentPageData] = useState(pageData);
  const env = process.env.NODE_ENV;    


  useEffect(() => {
    if (!currentPageData) {
      fetch(env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/data/pages/warranty`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3556`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentPageData(data);
        })
        .catch((error) =>
          console.error('Error fetching data from WordPress API:', error)
        );
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{yoastData?.title || 'Codeandcore - Web development studio'}</title>
        <meta
          property="og:title"
          content={
            yoastData?.og_title || 'Codeandcore - Web development studio'
          }
        />
        <meta
          property="og:description"
          content={
            yoastData?.og_description ||
            'Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.'
          }
        />
        <meta property="og:type" content={yoastData?.og_type || 'website'} />
        <meta
          property="og:url"
          content={yoastData?.og_url || ''}
        />
        <meta property="og:image" content={yoastData?.og_image?.[0]?.url} />
        <link rel="canonical" href={yoastData?.canonical} />
        <meta name="twitter:card" content={yoastData?.twitter_card} />
        <meta name="twitter:site" content={yoastData?.twitter_site} />
        <meta name="twitter:title" content={yoastData?.twitter_title} />
        <meta
          name="twitter:description"
          content={yoastData?.twitter_description}
        />
        <meta property="og:locale" content={yoastData?.og_locale} />
        <script type="application/ld+json">
          {JSON.stringify(yoastData?.schema || {})}
        </script>
      </Head>

      {currentPageData && (
        <div className="policy-page Warranty_page">
          <div className="wrapper">
            <div className="title">
              {currentPageData.title && <h1>{currentPageData.title.rendered}</h1>}
            </div>
            {currentPageData.acf?.content_editor && (
              <div
                className="inner"
                dangerouslySetInnerHTML={{
                  __html: he.decode(currentPageData.acf.content_editor),
                }}
              ></div>
            )}
          </div>
        </div>
      )}

      {initialHireUsData && (
          <HireUs
            hireus_title={initialHireUsData.acf.hireus_title}
            hireus_subtitle={initialHireUsData.acf.hireus_subtitle}
            hireus_button_text={initialHireUsData.acf.hireus_button_text}
            hireus_list={initialHireUsData.acf.hireus_list}
          />
      )}
    </>
  );
};

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    

  try {
    const warrantyRes = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/data/pages/warranty`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3556`);
    const pageData = await warrantyRes.json();

    const hireUsResponse = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/data/pages/home`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const initialHireUsData = await hireUsResponse.json();

    return {
      props: {
        pageData: pageData || null,
        yoastData: pageData?.yoast_head_json || null,
        initialHireUsData: initialHireUsData || null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData: null,
        yoastData: null,
        initialHireUsData: null,
      },
    };
  }
}

export default Warranty;
