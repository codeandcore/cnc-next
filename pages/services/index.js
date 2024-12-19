import { useState, useEffect } from 'react';
import Head from 'next/head';
import OurApproach from '@/components/OurApproach';
import CaseStudies from '@/components/CaseStudies';
import OurAwards from '@/components/OurAwards';
import HireUs from '@/components/HireUs';
import ClientsSay from '@/components/ClientsSay';
import ServicesList from '@/components/ServicesList';
import ServicesBanner from '@/components/ServicesBanner';

// Constants
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://wordpress-1074629-4621962.cloudwaysapps.com';
const env = process.env.NODE_ENV;    

const fetchFromAPI = async (endpoint) => {
  try {
    const res = await fetch(endpoint);

    if (res.ok) {
      return await res.json();
    } else {
      console.error(`Failed to fetch from ${endpoint}: ${res.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
  }

  return null;
};

const fetchHomePage = async () => {
  const endpoint = env !== "development"
  ? `/data/pages/home`
  : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`;

  return await fetchFromAPI(endpoint);
};

const fetchContactPage = async () => {
  const endpoint = env !== "development"
  ? `/data/pages/contactus`
  : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp/v2/pages/1282`

  return await fetchFromAPI(endpoint);
};

const fetchServicesPage = async () => {
  const endpoint = env !== "development"
  ? `/data/pages/services`
  : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/609`; 
  return await fetchFromAPI(endpoint);
};

export default function Industry({ 
  HomePage, 
  ContactPage, 
  ServicesPage 
}) {
  const [contactData, setContactPageData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [homepageData, setHomepageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [prefetchedData, setPrefetchedData] = useState(null);

  useEffect(() => {
    if (HomePage) setHomepageData(HomePage);
    if (ContactPage) setContactPageData(ContactPage);
    if (ServicesPage) {
      setServicesData(ServicesPage);
      
      setIsDone(true);
      setTimeout(() => {
        setIsFinish(true);
        setIsLoading(false);
      }, 1500);
    }
  }, [HomePage, ContactPage, ServicesPage]);

  // useEffect(() => {
  //   setPageData(HomePage);
  //   setContactPageData(ContactPage);
  //     fetch(`/data/pages/${slug}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setServicesData(data)
  //   })
  //     .catch(error => console.error('Error fetching data from WordPress API:', error));
  // }, [HomePage,ContactPage,slug]);

  const hireUsData =
    servicesData && servicesData?.acf && servicesData?.acf?.hireus_title
      ? servicesData?.acf
      : homepageData && homepageData?.acf
      ? homepageData?.acf
      : null; 

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{servicesData && servicesData.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            servicesData && servicesData.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={servicesData && servicesData.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={servicesData && servicesData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            servicesData && servicesData.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={servicesData && servicesData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={servicesData && servicesData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={servicesData && servicesData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={servicesData && servicesData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={servicesData && servicesData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={servicesData && servicesData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={servicesData && servicesData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={servicesData && servicesData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={servicesData && servicesData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(servicesData && servicesData.yoast_head_json.schema)}
        </script>
      </Head>

      <div className="main_wrapper">
        {servicesData && (servicesData.acf.banner_gallery || servicesData.acf.banner_title) && (
          <ServicesBanner {...servicesData.acf} />
        )}
      
        {servicesData && servicesData.acf.service_title && (
          <ServicesList
            service_title={servicesData.acf.service_title}
            service_content={servicesData.acf.service_content}
            service_list={servicesData.acf.service_list}
            service_view_all_button={servicesData.acf.service_view_all_button}
            setPrefetchedData={setPrefetchedData}
            setIsLoading={setIsLoading}
            setIsDone={setIsDone}
            setIsFinish={setIsFinish}
          />
        )}
      
        <OurApproach 
          our_approach_title={servicesData?.acf?.our_approach_title}
          our_approach_subtitle={servicesData?.acf?.our_approach_subtitle}
          our_approach_list={servicesData?.acf?.our_approach_list}
        />
      
        {(servicesData?.acf?.case_studies_title || homepageData?.acf?.case_studies_title) && (
          <CaseStudies 
            case_studies_title={servicesData?.acf?.case_studies_title || homepageData?.acf?.case_studies_title}
            case_studies_subtitle={servicesData?.acf?.case_studies_subtitle || homepageData?.acf?.case_studies_subtitle}
            case_studies_list={servicesData?.acf?.portfolio_list || homepageData?.acf?.portfolio_list}
            BASE_URL={BASE_URL}
            prefetchedData={prefetchedData}
            setPrefetchedData={setPrefetchedData}
            setIsLoading={setIsLoading}
            setIsDone={setIsDone}
            setIsFinish={setIsFinish}
          />
        )}
      
        {(servicesData?.acf?.our_clients_title || homepageData?.acf?.our_clients_title) && (
          <ClientsSay 
            our_clients_title={servicesData?.acf?.our_clients_title || homepageData?.acf?.our_clients_title}
            our_clients_subtitle={servicesData?.acf?.our_clients_subtitle || homepageData?.acf?.our_clients_subtitle}
            our_clients_button_text={servicesData?.acf?.our_clients_button_text || homepageData?.acf?.our_clients_button_text}
            our_clients_button_url={servicesData?.acf?.our_clients_button_url || homepageData?.acf?.our_clients_button_url}
            our_clients_testimonials={servicesData?.acf?.our_clients_testimonials || homepageData?.acf?.our_clients_testimonials}
          />
        )}
      
        <OurAwards 
          title={servicesData?.acf?.our_awards_title || homepageData?.acf?.our_awards_title}
          content={servicesData?.acf?.our_awards_subtitle || homepageData?.acf?.our_awards_subtitle}
          our_awards_images={servicesData?.acf?.our_awards_list || homepageData?.acf?.our_awards_list}
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
}

// Server-side data fetching
export async function getServerSideProps() {
  try {
    const [HomePage, ContactPage, ServicesPage] = await Promise.all([
      fetchHomePage(),
      fetchContactPage(),
      fetchServicesPage()
    ]);

    return {
      props: {
        HomePage,
        ContactPage,
        ServicesPage
      }
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);

    return {
      props: {
        HomePage: null,
        ContactPage: null,
        ServicesPage: null
      }
    };
  }
}