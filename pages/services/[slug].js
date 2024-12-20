import Head from 'next/head';
import HowWeHelp from '@/components/HowWeHelp';
import QuestionsAnswered from '@/components/QuestionsAnswered';
import HireUs from '@/components/HireUs';
import dynamic from 'next/dynamic';
import ExploreDone from '@/components/ExploreDone';
import ServicesDetailsBanner from '@/components/ServicesDetailsBanner';

const DigitalSolution = dynamic(() => import('@/components/DigitalSolution'), { 
  ssr: false,
  loading: () => null 
});

const WhyChooseCompanyDesign = dynamic(() => import('@/components/WhyChooseCompanyDesign'), { 
  ssr: false,
  loading: () => null 
});



const ServicesDetails = ({ 
  serviceData, 
  hireUsData 
}) => {
  if (!serviceData || serviceData.length === 0) {
    return (
      <div className="error-message">
        <h2>No Service Data Found</h2>
      </div>
    );
  }

  const acf = serviceData[0]?.acf || {};

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{serviceData[0]?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          property="og:title"
          content={serviceData[0]?.yoast_head_json?.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            serviceData[0]?.yoast_head_json?.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={serviceData[0]?.yoast_head_json?.og_type || "website"} />
        <meta
          property="og:url"
          content={serviceData[0]?.yoast_head_json?.og_url || ""}
        />
        <meta property="og:image" content={serviceData[0]?.yoast_head_json?.og_image?.[0]?.url || "/default-image.jpg"} />
        <link rel="canonical" href={serviceData[0]?.yoast_head_json?.canonical || ""} />
        <meta name="twitter:card" content={serviceData[0]?.yoast_head_json?.twitter_card || "summary_large_image"} />
        <meta name="twitter:site" content={serviceData[0]?.yoast_head_json?.twitter_site || "@defaultSite"} />
        <meta name="twitter:title" content={serviceData[0]?.yoast_head_json?.twitter_title || "Codeandcore"} />
        <meta name="twitter:description" content={serviceData[0]?.yoast_head_json?.twitter_description || "Web development studio"} />
        <meta property="og:locale" content={serviceData[0]?.yoast_head_json?.og_locale || "en_US"} />

        {serviceData[0]?.yoast_head_json?.schema && (
          <script type="application/ld+json">
            {JSON.stringify(serviceData[0].yoast_head_json.schema)}
          </script>
        )}
      </Head>

      <div className="main_wrapper">
        {(acf.industry_banner_background_image || 
          acf.industry_banner_background_image_mobile || 
          acf.banner_background_video || 
          acf.banner_title || 
          acf.banner_subtitle || 
          acf.banner_clients_list) && (
          <ServicesDetailsBanner
            industry_banner_background_image={acf.industry_banner_background_image}
            industry_banner_background_image_mobile={acf.industry_banner_background_image_mobile}
            banner_background_video={acf.banner_background_video}
            banner_title={acf.banner_title}
            banner_subtitle={acf.banner_subtitle}
            banner_clients_list={acf.banner_clients_list}
          />
        )}

        {(acf.digital_solution_title || 
          acf.digital_solution_content || 
          acf.digital_solution_button || 
          acf.digital_solution_video || 
          acf.digital_solution_image) && (
          <DigitalSolution
            digital_solution_title={acf.digital_solution_title}
            digital_solution_content={acf.digital_solution_content}
            digital_solution_button={acf.digital_solution_button}
            digital_solution_image={acf.digital_solution_image}
          />
        )}

        {(acf.help_you_title || 
          acf.help_you_subtitle || 
          acf.help_you_image || 
          acf.help_you_list) && (
          <HowWeHelp
            help_you_title={acf.help_you_title}
            help_you_subtitle={acf.help_you_subtitle}
            help_you_image={acf.help_you_image}
            help_you_list={acf.help_you_list}
          />
        )}

        {(acf.portfolio_title || 
          acf.portfolio_subtitle || 
          acf.portfolio_button || 
          acf.portfolio_list) && (
          <ExploreDone
            portfolio_title={acf.portfolio_title}
            portfolio_subtitle={acf.portfolio_subtitle}
            portfolio_button={acf.portfolio_button}
            portfolio_list={acf.portfolio_list}
          />
        )}

        {(acf.why_choose_title || 
          acf.why_choose_subtitle || 
          acf.why_choose_list) && (
          <WhyChooseCompanyDesign
            why_choose_title={acf.why_choose_title}
            why_choose_subtitle={acf.why_choose_subtitle}
            why_choose_list={acf.why_choose_list}
          />
        )}

        {(acf.qa_title_content || acf.qa_list) && (
          <QuestionsAnswered 
            qa_title_content={acf.qa_title_content} 
            qa_list={acf.qa_list} 
          />
        )}

        {hireUsData && (
          hireUsData.hireus_title ||
          hireUsData.hireus_subtitle ||
          hireUsData.hireus_button_text ||
          hireUsData.hireus_list
        ) && (
          <HireUs
            hireus_title={hireUsData.hireus_title}
            hireus_subtitle={hireUsData.hireus_subtitle}
            hireus_button_text={hireUsData.hireus_button_text}
            hireus_list={hireUsData.hireus_list}
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
    const serviceEndpoint = env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/${slug}`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=${slug}`;
    const serviceRes = await fetch(serviceEndpoint);
    const serviceData = await serviceRes.json();

    const hireUsData = serviceData[0]?.acf?.hireus_title 
      ? serviceData[0].acf 
      : homePageData?.acf || null;

    return {
      props: {
        serviceData,
        hireUsData
      }
    };
  } catch (error) {
    console.error('Failed to fetch page data:', error);

    return {
      props: {
        serviceData: null,
        hireUsData: null
      }
    };
  }
}

export default ServicesDetails;