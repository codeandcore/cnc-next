import React from 'react';
import Technodetailcontaints from '@/components/Technodetailcontaints';
import HireUs from '@/components/HireUs';
import Head from 'next/head';

const Technologiesdetail = ({ technologyData , initialHireUsData }) => {
  if (!technologyData || technologyData.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{technologyData[0].title?.rendered || "Codeandcore - Web development studio"}</title>
        {/* <meta
          name="description"
          content={
            technologyData[0].yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={technologyData[0].yoast_head_json.og_keywords} /> */}
        <meta
          property="og:title"
          content={technologyData[0].yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            technologyData[0].yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={technologyData[0].yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={technologyData[0].yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={technologyData[0].yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={technologyData[0].yoast_head_json.canonical} />
        <meta name="twitter:card" content={technologyData[0].yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={technologyData[0].yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={technologyData[0].yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={technologyData[0].yoast_head_json.twitter_description} />
        <meta property="og:locale" content={technologyData[0].yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(technologyData[0].yoast_head_json.schema)}
        </script>
      </Head>
      <div className="main_wrapper">
      {(technologyData[0].acf.title || 
        technologyData[0].acf.subtitle || 
        technologyData[0].acf.content || 
        technologyData[0].acf.technoloy_icon) && (
        <Technodetailcontaints
          title={technologyData[0].acf.title}
          subtitle={technologyData[0].acf.subtitle}
          content={technologyData[0].acf.content}
          technoloy_icon={technologyData[0].acf.technoloy_icon}
        />
      )}
      
      {initialHireUsData && (
        <HireUs
          hireus_title={initialHireUsData.acf.hireus_title}
          hireus_subtitle={initialHireUsData.acf.hireus_subtitle}
          hireus_button_text={initialHireUsData.acf.hireus_button_text}
          hireus_list={initialHireUsData.acf.hireus_list}
          
        />
      )}
    </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const env = process.env.NODE_ENV;    

  try {
    // const technologyResponse = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/${slug}`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=${slug}`);
    const technologyResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=${slug}`);
    const technologyData = await technologyResponse.json();

    // const hireUsResponse = await fetch(env !== "development"
    //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
    //   : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const hireUsResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const initialHireUsData = await hireUsResponse.json();

    return {
      props: {
        technologyData,
        yoastData: technologyData[0]?.yoast_head_json || null,
        initialHireUsData
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        technologyData: [],
        yoastData: null,
        initialHireUsData
      }
    };
  }
}

export default Technologiesdetail;