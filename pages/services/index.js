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
const env = process.env.NODE_ENV;    

const BASE_URL = env || 'https://wordpress-1074629-4621962.cloudwaysapps.com';

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
  // const endpoint = env !== "development"
  // ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
  // : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`;
  const endpoint = `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`;

  return await fetchFromAPI(endpoint);
};

const fetchContactPage = async () => {
  // const endpoint = env !== "development"
  // ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
  // : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp/v2/pages/1282`
  const endpoint = `https://wordpress-1074629-4621962.cloudwaysapps.com/wp/v2/pages/1282`

  return await fetchFromAPI(endpoint);
};

const fetchServicesPage = async () => {
  // const endpoint = env !== "development"
  // ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/services`
  // : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/609`; 
  const endpoint = `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/609`; 
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
      
      const seoData = servicesData?.yoast_head_json || {};
      const defaultTitle = "Codeandcore - Web development studio";
      const defaultDescription = 
        "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.";
        return (
    <>
      <Head>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Primary Meta Tags */}
      <title>{servicesData?.title?.rendered || defaultTitle}</title>
      <meta
        name="description"
        content={seoData.description || defaultDescription}
      />
      {seoData.og_keywords && (
        <meta name="keywords" content={seoData.og_keywords} />
      )}
      
      {/* Open Graph Tags */}
      <meta
        property="og:title"
        content={seoData.og_title || defaultTitle}
      />
      <meta
        property="og:description"
        content={seoData.og_description || defaultDescription}
      />
      <meta property="og:type" content={seoData.og_type || "website"} />
      <meta
        property="og:url"
        content={seoData.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
      />
      {seoData.og_image?.[0]?.url && (
        <>
          <meta property="og:image" content={seoData.og_image[0].url} />
          <meta property="og:image:alt" content={seoData.og_title || defaultTitle} />
        </>
      )}
      <meta property="og:locale" content={seoData.og_locale || "en_US"} />
      <meta property="og:site_name" content={seoData.og_site_name || "Codeandcore"} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={seoData.twitter_card || "summary_large_image"} />
      <meta name="twitter:site" content={seoData.twitter_site} />
      <meta name="twitter:title" content={seoData.twitter_title || defaultTitle} />
      <meta name="twitter:description" content={seoData.twitter_description || defaultDescription} />
      
      {/* Canonical URL */}
      {seoData.canonical && (
        <link rel="canonical" href={seoData.canonical} />
      )}
      
      {/* Schema.org JSON-LD */}
      {seoData.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema)
          }}
        />
      )}
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