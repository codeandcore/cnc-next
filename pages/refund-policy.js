import React from 'react';
import he from 'he';
import HireUs from '@/components/HireUs';
import Head from 'next/head';

const RefundPolicy = ({ pageData, initialHireUsData, contactData }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{pageData && pageData.title?.rendered || "Codeandcore - Web development studio"}</title>
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
        <div className='policy-page refund_policy'>
          <div className='wrapper'>
            <div className='title'>
              {pageData.title && <h1>{pageData.title.rendered}</h1>}
            </div>
            {pageData.acf.content_editor && (
              <div
                className='inner'
                dangerouslySetInnerHTML={{ __html: he.decode(pageData.acf.content_editor) }}
              ></div>
            )}
          </div>
        </div>
      )}
      {initialHireUsData &&
          (
          <HireUs
            hireus_title={initialHireUsData.acf.hireus_title}
            hireus_subtitle={initialHireUsData.acf.hireus_subtitle}
            hireus_button_text={initialHireUsData.acf.hireus_button_text}
            hireus_list={initialHireUsData.acf.hireus_list}
            contactData={contactData}
          />
        )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const env = process.env.REACT_APP_ENV;
  const isDevelopment = env === 'development';

  const pageUrl = isDevelopment
    ? `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/2191`
    : `/data/pages/refund-policy`;

  let pageData = null;
  let contactData = null;
  let initialHireUsData = null;

  try {
    const pageResponse = await fetch(pageUrl);
    pageData = await pageResponse.json();

    const contactResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/pages/contact`);
    contactData = await contactResponse.json();

    const hireUsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/7`
    );

    initialHireUsData = hireUsResponse.ok
      ? await hireUsResponse.json()
      : null;

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      pageData,
      initialHireUsData,
      contactData,
    },
  };
};

export default RefundPolicy;
