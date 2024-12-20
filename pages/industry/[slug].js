import Head from 'next/head';
import WhyChooseCompanyDesign from '@/components/WhyChooseCompanyDesign';
import QuestionsAnswered from '@/components/QuestionsAnswered';
import HireUs from '@/components/HireUs';
import HealthcareSector from '@/components/HealthcareSector';
import HealthcareSoftware from '@/components/HealthcareSoftware';
import HealthcareSolution from '@/components/HealthcareSolution';
import ExploreWork from '@/components/ExploreWork';
import dynamic from 'next/dynamic';
const ServicesDetailsBanner = dynamic(() => import('@/components/ServicesDetailsBanner'), { 
  ssr: false,
  loading: () => null 
})

const IndustryDetails = ({ industryData, className }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{industryData[0]?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          property="og:title"
          content={industryData[0]?.yoast_head_json?.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            industryData[0]?.yoast_head_json?.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={industryData[0]?.yoast_head_json?.og_type || "website"} />
        <meta
          property="og:url"
          content={industryData[0]?.yoast_head_json?.og_url || (typeof window !== "undefined" ? window.location.href : "")}
        />
        <meta property="og:image" content={industryData[0]?.yoast_head_json?.og_image?.[0]?.url || "/default-image.jpg"} />
        <link rel="canonical" href={industryData[0]?.yoast_head_json?.canonical || window?.location?.href} />
        <meta name="twitter:card" content={industryData[0]?.yoast_head_json?.twitter_card || "summary_large_image"} />
        <meta name="twitter:site" content={industryData[0]?.yoast_head_json?.twitter_site || "@defaultSite"} />
        <meta name="twitter:title" content={industryData[0]?.yoast_head_json?.twitter_title || "Codeandcore"} />
        <meta name="twitter:description" content={industryData[0]?.yoast_head_json?.twitter_description || "Web development studio"} />
        <meta property="og:locale" content={industryData[0]?.yoast_head_json?.og_locale || "en_US"} />

        {industryData[0]?.yoast_head_json?.schema && (
          <script type="application/ld+json">
            {JSON.stringify(industryData[0].yoast_head_json.schema)}
          </script>
        )}
      </Head>
      <div className={`main_wrapper ${className || ''}`}>
        {industryData[0].acf.industry_banner_background_image && (
          <ServicesDetailsBanner
            banner_background_image={industryData[0].acf.industry_banner_background_image}
            industry_banner_background_image_mobile={industryData[0].acf.industry_banner_background_image_mobile}
            banner_background_video={industryData[0].acf.industry_banner_background_video}
            banner_title={industryData[0].acf.industry_banner_title}
            banner_subtitle={industryData[0].acf.industry_banner_subtitle}
            banner_clients_list={industryData[0].acf.industry_banner_clients_list}
          />
        )}

        {industryData[0].acf.healthcare_sector_title && (
          <HealthcareSector
            title={industryData[0].acf.healthcare_sector_title}
            subtitle={industryData[0].acf.healthcare_sector_subtitle}
            items={industryData[0].acf.healthcare_sector_listing}
          />
        )}

        {industryData[0].acf.healthcare_software_title && (
          <HealthcareSoftware
            title={industryData[0].acf.healthcare_software_title}
            subtitle={industryData[0].acf.healthcare_software_subtitle}
            items={industryData[0].acf.healthcare_software_listing}
          />
        )}

       
        {industryData[0].acf.software_solution_title && (
          <HealthcareSolution
            title={industryData[0].acf.software_solution_title}
            subtitle={industryData[0].acf.software_solution_content}
            button={industryData[0].acf.software_solution_button}
          />
        )}

        
        {industryData[0].acf.industry_portfolio_title && (
          <ExploreWork
            className="white-bg"
            title={industryData[0].acf.industry_portfolio_title}
            subtitle={industryData[0].acf.industry_portfolio_subtitle}
            button={industryData[0].acf.industry_portfolio_button}
            items={industryData[0].acf.industry_portfolio_list}
          />
        )}

        
        {industryData[0].acf.industry_why_choose_title && (
          <WhyChooseCompanyDesign
            why_choose_title={industryData[0].acf.industry_why_choose_title}
            why_choose_subtitle={industryData[0].acf.industry_why_choose_subtitle}
            why_choose_list={industryData[0].acf.industry_why_choose_list}
          />
        )}

        
        {industryData[0].acf.industry_qa_title_content && (
          <QuestionsAnswered
            qa_title_content={industryData[0].acf.industry_qa_title_content}
            qa_list={industryData[0].acf.industry_qa_list}
          />
        )}

        
        {industryData[0].acf?.hireus_title && (
          <HireUs
            hireus_title={industryData[0].acf.hireus_title}
            hireus_subtitle={industryData[0].acf.hireus_subtitle}
            hireus_button_text={industryData[0].acf.hireus_button_text}
            hireus_list={industryData[0].acf.hireus_list}
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
    const endpoint = env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/${slug}`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=${slug}`
    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch industry data');
    }

    const industryData = await response.json();

    if (!industryData || industryData.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        industryData,
      },
    };
  } catch (error) {
    console.error('Error fetching industry data:', error);

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default IndustryDetails;