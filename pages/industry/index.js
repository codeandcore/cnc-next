import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import OurApproach from '@/components/OurApproach';
import CaseStudies from '@/components/CaseStudies';
import OurAwards from '@/components/OurAwards';
import HireUs from '@/components/HireUs';
import ClientsSay from '@/components/ClientsSay';
import IndustryBanner from '@/components/IndustryBanner';
import IndustrysList from '@/components/IndustrysList';

// Constants
const INDUSTRY_PAGE_ID = 710;
const HOME_PAGE_ID = 7;
const CONTACT_PAGE_ID = 1282;

async function fetchPageData(pageId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/${pageId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page with ID ${pageId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching page data for ID ${pageId}:`, error);
    return null;
  }
}

export async function getServerSideProps() {
  try {
    const [industryPageData, homePageData, contactPageData] = await Promise.all([
      fetchPageData(INDUSTRY_PAGE_ID),
      fetchPageData(HOME_PAGE_ID),
      fetchPageData(CONTACT_PAGE_ID)
    ]);

    return {
      props: {
        initialIndustryData: industryPageData,
        initialHomePageData: homePageData,
        initialContactPageData: contactPageData
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialIndustryData: null,
        initialHomePageData: null,
        initialContactPageData: null
      }
    };
  }
}

const Industry = ({ 
  initialIndustryData, 
  initialHomePageData, 
  initialContactPageData 
}) => {
  const [pageData, setPageData] = useState(initialHomePageData);
  const [contactData, setContactData] = useState(initialContactPageData);
  const [industryData, setIndustryData] = useState(initialIndustryData);
  const [caseStudiesData, setCaseStudiesData] = useState(null);
  const [clientsData, setClientsData] = useState(null);
  const [awardsData, setAwardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [yoastData, setYoastData] = useState(null);
  const [prefetchedData, setPrefetchedData] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    if (pageData) {
      if (pageData.acf?.portfolio_list) {
        setCaseStudiesData({
          case_studies_title: pageData.acf.case_studies_title,
          case_studies_subtitle: pageData.acf.case_studies_subtitle,
          case_studies_list: pageData.acf.portfolio_list
        });
      }

      if (pageData.acf) {
        setClientsData({
          our_clients_title: pageData.acf.our_clients_title,
          our_clients_subtitle: pageData.acf.our_clients_subtitle,
          our_clients_button_text: pageData.acf.our_clients_button_text,
          our_clients_button_url: pageData.acf.our_clients_button_url,
          our_clients_testimonials: pageData.acf.our_clients_testimonials
        });
      }

      if (pageData.acf) {
        setAwardsData({
          our_awards_title: pageData.acf.our_awards_title,
          our_awards_subtitle: pageData.acf.our_awards_subtitle,
          our_awards_list: pageData.acf.our_awards_list
        });
      }

      setIsDone(true);
      setTimeout(() => {
        setIsFinish(true);
        setLoading(false);
      }, 1500);
    }
  }, [pageData]);

  useEffect(() => {
    if (industryData) {
      setYoastData(industryData.yoast_head_json);
    }
  }, [industryData]);

  const hireUsData = 
    (industryData?.acf?.hireus_title ? industryData.acf : 
    (pageData?.acf ? pageData.acf : null));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{industryData?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            industryData?.yoast_head_json?.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={industryData?.yoast_head_json?.og_keywords} />
        <meta
          property="og:title"
          content={industryData?.yoast_head_json?.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            industryData?.yoast_head_json?.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={industryData?.yoast_head_json?.og_type || "website"} />
        <meta
          property="og:url"
          content={industryData?.yoast_head_json?.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={industryData?.yoast_head_json?.og_image?.[0]?.url} />
        <link rel="canonical" href={industryData?.yoast_head_json?.canonical} />
        <meta name="twitter:card" content={industryData?.yoast_head_json?.twitter_card} />
        <meta name="twitter:site" content={industryData?.yoast_head_json?.twitter_site} />
        <meta name="twitter:title" content={industryData?.yoast_head_json?.twitter_title} />
        <meta name="twitter:description" content={industryData?.yoast_head_json?.twitter_description} />
        <meta property="og:locale" content={industryData?.yoast_head_json?.og_locale} />

        {industryData?.yoast_head_json?.schema && (
          <script type="application/ld+json">
            {JSON.stringify(industryData.yoast_head_json.schema)}
          </script>
        )}
      </Head>
      <div className="main_wrapper">
        {industryData?.acf && (
          <>
            {(industryData.acf.banner_gallery ||
              industryData.acf.banner_title ||
              industryData.acf.banner_subtitle ||
              industryData.acf.banner_clients_list ||
              industryData.acf.banner_background_image ||
              industryData.acf.banner_background_image_mobile ||
              industryData.acf.mobile_banner_image) && (
              <IndustryBanner {...industryData.acf} />
            )}

            {(industryData.acf.industry_title || 
              industryData.acf.industry_content || 
              industryData.acf.industry_list || 
              industryData.acf.industry_view_all_button) && (
              <IndustrysList
                service_title={industryData.acf.industry_title}
                service_content={industryData.acf.industry_content}
                service_list={industryData.acf.industry_list}
                service_view_all_button={industryData.acf.industry_view_all_button}
                setPrefetchedData={setPrefetchedData}
                setIsLoading={setLoading}
                setIsDone={setIsDone}
                setIsFinish={setIsFinish}
              />
            )}

            {(industryData?.acf?.our_approach_title ||
              industryData?.acf?.our_approach_subtitle ||
              industryData?.acf?.our_approach_list) && (
              <OurApproach 
                our_approach_title={industryData?.acf?.our_approach_title}
                our_approach_subtitle={industryData?.acf?.our_approach_subtitle}
                our_approach_list={industryData?.acf?.our_approach_list}
              /> 
            )} 
          </>
        )}

        {caseStudiesData && (
          <CaseStudies
            case_studies_title={caseStudiesData.case_studies_title}
            case_studies_subtitle={caseStudiesData.case_studies_subtitle}
            case_studies_list={caseStudiesData.case_studies_list}
            prefetchedData={prefetchedData}
            setPrefetchedData={setPrefetchedData}
            setIsLoading={setLoading}
            setIsDone={setIsDone}
            setIsFinish={setIsFinish}
          />
        )}

        {clientsData && (
          <ClientsSay {...clientsData} />
        )}

        <OurAwards 
          title={awardsData?.our_awards_title}
          content={awardsData?.our_awards_subtitle}
          our_awards_images={awardsData?.our_awards_list}
        />

        {hireUsData && (
          <HireUs
            {...hireUsData}
            contactData={contactData}
          />
        )}
      </div>
    </>
  );
};

export default Industry;