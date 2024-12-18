import React from 'react';
import Head from 'next/head';
import CasestudingContaints from '@/components/CasestudingContaints';
import HireUs from '@/components/HireUs';
import ProjectLogoMarquee from '@/components/ProjectLogoMarquee';
import PortfolioFeatures from '@/components/PortfolioFeatures';
import ExploreWork from '@/components/ExploreWork';

const CasestudingDetail = ({ 
  contactData, 
  caseStudyData,
  pageData,
  additionalPageData
}) => {


  if (!caseStudyData || caseStudyData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{caseStudyData[0]?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          property="og:title"
          content={caseStudyData[0]?.yoast_head_json?.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            caseStudyData[0]?.yoast_head_json?.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={caseStudyData[0]?.yoast_head_json?.og_type || "website"} />
        <meta
          property="og:url"
          content={caseStudyData[0]?.yoast_head_json?.og_url || (typeof window !== "undefined" ? window.location.href : "")}
        />
        <meta property="og:image" content={caseStudyData[0]?.yoast_head_json?.og_image?.[0]?.url || "/default-image.jpg"} />
        <link rel="canonical" href={caseStudyData[0]?.yoast_head_json?.canonical || (typeof window !== "undefined" ? window.location.href : "")} />
        <meta name="twitter:card" content={caseStudyData[0]?.yoast_head_json?.twitter_card || "summary_large_image"} />
        <meta name="twitter:site" content={caseStudyData[0]?.yoast_head_json?.twitter_site || "@defaultSite"} />
        <meta name="twitter:title" content={caseStudyData[0]?.yoast_head_json?.twitter_title || "Codeandcore"} />
        <meta name="twitter:description" content={caseStudyData[0]?.yoast_head_json?.twitter_description || "Web development studio"} />
        <meta property="og:locale" content={caseStudyData[0]?.yoast_head_json?.og_locale || "en_US"} />

        {caseStudyData[0]?.yoast_head_json?.schema && (
          <script type="application/ld+json">
            {JSON.stringify(caseStudyData[0].yoast_head_json.schema)}
          </script>
        )}
      </Head>
      <div className="main_wrapper">
        <>
          <CasestudingContaints
            caseStudyData={caseStudyData}
          />

          {(caseStudyData[0].acf.feature_section_title || caseStudyData[0].acf.features_detail) && (
            <PortfolioFeatures
              feature_section_title={caseStudyData[0].acf.feature_section_title}
              features_detail={caseStudyData[0].acf.features_detail}
            />
          )}

          {(caseStudyData[0].acf.portfolio_title || 
            caseStudyData[0].acf.portfolio_subtitle || 
            caseStudyData[0].acf.case_study_portfolio_list || 
            caseStudyData[0].acf.portfolio_button) && (
            <ExploreWork
              title={caseStudyData[0].acf.portfolio_title}
              subtitle={caseStudyData[0].acf.portfolio_subtitle}
              button={caseStudyData[0].acf.portfolio_button}
              items={caseStudyData[0].acf.case_study_portfolio_list}
            />
          )}

          {pageData?.acf?.banner_clients_list && (
            <ProjectLogoMarquee banner_clients_list={pageData.acf.banner_clients_list} />
          )}

          {additionalPageData && (
            <HireUs
              hireus_title={additionalPageData?.acf.hireus_title}
              hireus_subtitle={additionalPageData?.acf.hireus_subtitle}
              hireus_button_text={additionalPageData?.acf.hireus_button_text}
              hireus_list={additionalPageData?.acf.hireus_list}
              contactData={contactData}
            />
          )}
        </>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  let additionalPageData = null
  try {
    const caseStudyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/case_study/?slug=${slug}`
    );
    const caseStudyData = await caseStudyResponse.json();

    const pageDataResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages`
    );

    const additionalPageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/7`);
    additionalPageData = await additionalPageResponse.json();
    
    const pageData = await pageDataResponse.json();

    if (!caseStudyData || caseStudyData.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

   
    return {
      props: {
        caseStudyData,
        pageData: pageData[0] || null,
        additionalPageData,
        yoastData: caseStudyData[0]?.yoast_head_json || null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default CasestudingDetail;