import { useState } from 'react';
import Head from 'next/head';
import { fetchGeneralSettings, fetchHomePage } from './api/fetchData';

import TabContaint from '../components/TabContaint';
import IndustriesSlider from '../components/IndustriesSlider';
import StackTechnologies from '../components/StackTechnologies';
import WhyChoose from '../components/WhyChoose';
import CaseStudies from '../components/CaseStudies';
import Life from '../components/Life';
import Highlights from '../components/Highlights';
import ClientsSay from '../components/ClientsSay';
import OurAwards from '../components/OurAwards';
import HireUs from '../components/HireUs';
import ProjectLogoMarquee from '../components/ProjectLogoMarquee';
import Banner from '../components/Banner';

function stripHtmlTags(str) {
  if ((str === null) || (str === '')) return false;
  else str = str?.toString();
  return str?.replace(/<[^>]*>/g, '');
}

function cleanHtmlString(htmlString) {
  return htmlString?.replace(/<\/?p>/g, '') || '';
}

export default function Homepage({ pageData, contactData  }) {
    
  const [prefetchedData, setPrefetchedData] = useState({});
  if (!pageData) {
    return <div className="error">Unable to load page data</div>;
  }
  const { acf } = pageData;
  return (  
    <div className='main_wrapper'>
      <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="content-language" content="en-US" />
  <title>{pageData?.title?.rendered || "Default Website Title"}</title>
  <meta
    name="description"
    content={pageData.yoast_head_json.description ||"Default description for your website."}
  />
  <meta 
    name="keywords" 
    content={pageData.yoast_head_json.og_keywords || "default, keywords"} 
  />
  <meta property="og:type" content="website" />
  <meta 
    property="og:title" 
    content={pageData?.yoast_head_json?.og_title || 'Default OG Title'} 
  />
  <meta 
    property="og:description" 
    content={pageData?.yoast_head_json?.og_description || 'Default OG Description'} 
  />
  <meta 
    property="og:url" 
    content={pageData?.yoast_head_json?.canonical || 'https://yourdomain.com'} 
  />
  <meta 
    property="og:image" 
    content={pageData?.yoast_head_json?.og_image?.[0]?.url || '/default-og-image.jpg'} 
  />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta 
    name="twitter:title" 
    content={pageData?.yoast_head_json?.twitter_title || 'Default Twitter Title'} 
  />
  <meta 
    name="twitter:description" 
    content={pageData?.yoast_head_json?.twitter_description || 'Default Twitter Description'} 
  />
  <meta 
    name="twitter:image" 
    content={pageData?.yoast_head_json?.twitter_image || '/default-twitter-image.jpg'} 
  />
  <link 
    rel="canonical" 
    href={pageData?.yoast_head_json?.canonical || 'https://yourdomain.com'} 
  />
  <meta name="robots" content="index, follow" />
  {pageData?.yoast_head_json?.schema && (
    <script type="application/ld+json">
      {JSON.stringify(pageData.yoast_head_json.schema)}
    </script>
  )}
      </Head>
      {acf?.banner_title && (
        <Banner 
          banner_background_image={acf.banner_background_image}
          banner_background_mobile_image={acf.banner_background_mobile_image}
          banner_background_video={acf.banner_background_video}
          banner_title={stripHtmlTags(acf.banner_title)}
          banner_subtitle={cleanHtmlString(acf.banner_subtitle)}
          banner_button_text={acf.banner_button_text}
          banner_button_url={acf.banner_button_url}
          banner_statistics_list={acf.banner_statistics_list}
          banner_rating_platform_list={acf.banner_rating_platform_list}
          banner_hireus_form_title={acf.banner_hireus_form_title}
          banner_hireus_form_subtitle={acf.banner_hireus_form_subtitle}
          contactData={contactData}
        />
      )}

      {acf?.banner_clients_list && (
        <ProjectLogoMarquee 
          banner_clients_list={acf.banner_clients_list} 
        />
      )}

      {acf?.service_list && (
        <TabContaint 
          service_list={acf.service_list}
          prefetchedData={prefetchedData}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf?.industries_title || acf?.industries_subtitle || acf?.industries_list) && (
        <IndustriesSlider
          industries_title={acf.industries_title}
          industries_subtitle={acf.industries_subtitle}
          industries_list={acf.industries_list}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf?.technologies_title || acf?.technologies_bg_image || acf?.technologies_content || acf?.technologies_list) && (
        <StackTechnologies
          technologies_title={acf.technologies_title}
          technologies_bg_image={acf.technologies_bg_image}
          technologies_content={acf.technologies_content}
          technologies_button_text={acf.technologies_button_text}
          technologies_button_url={acf.technologies_button_url}
          technologies_list={acf.technologies_list}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf.chooseus_title || acf.chooseus_content) && ( 
        <WhyChoose
          chooseus_title={pageData.acf.chooseus_title}
          chooseus_content={pageData.acf.chooseus_content}    
          chooseus_years_title={pageData.acf.chooseus_years_title}
          chooseus_years_subtitle={pageData.acf.chooseus_years_subtitle}
          chooseus_years_image={pageData.acf.chooseus_years_image}
          chooseus_adobe_title={pageData.acf.chooseus_adobe_title}
          chooseus_adobe_image={pageData.acf.chooseus_adobe_image}
          chooseus_languages_title={pageData.acf.chooseus_languages_title}
          chooseus_languages_subtitle={pageData.acf.chooseus_languages_subtitle}
          chooseus_languages_image={pageData.acf.chooseus_languages_image}
          savvy_content={pageData.acf.savvy_content}
          chooseus_clients_title={pageData.acf.chooseus_clients_title}
          chooseus_clients_subtitle={pageData.acf.chooseus_clients_subtitle}
          chooseus_clients_image={pageData.acf.chooseus_clients_image}
          chooseus_projects_delivered_title={pageData.acf.chooseus_projects_delivered_title}
          chooseus_projects_delivered_subtitle={pageData.acf.chooseus_projects_delivered_subtitle}
          chooseus_projects_delivered_image={pageData.acf.chooseus_projects_delivered_image}
          chooseus_digital_products_title={pageData.acf.chooseus_digital_products_title}
          chooseus_digital_products_button_text={pageData.acf.chooseus_digital_products_button_text}
          chooseus_digital_products_button_url={pageData.acf.chooseus_digital_products_button_url}
          chooseus_team_title={pageData.acf.chooseus_team_title}
          chooseus_team_subtitle={pageData.acf.chooseus_team_subtitle}
          chooseus_digital_form_title={pageData.acf.chooseus_digital_form_title}
          chooseus_digital_form_subtitle={pageData.acf.chooseus_digital_form_subtitle}
          chooseus_team_image={pageData.acf.chooseus_team_image}
          chooseus_iso_title={pageData.acf.chooseus_iso_title}
          chooseus_iso_image={pageData.acf.chooseus_iso_image}
          chooseus_pagespeed_title={pageData.acf.chooseus_pagespeed_title}
          chooseus_pagespeed_image={pageData.acf.chooseus_pagespeed_image}
          chooseus_iso_text={pageData.acf.chooseus_iso_text}
          chooseus_flexible_hiring_icon={pageData.acf.chooseus_flexible_hiring_icon}
          chooseus_digital_products_image={pageData.acf.chooseus_digital_products_image}
          chooseus_pagespeed_button_text={pageData.acf.chooseus_pagespeed_button}
          chooseus_pagespeed_button_url={pageData.acf.chooseus_pagespeed_button_url}
        />
      )}

      {(acf?.case_studies_title || acf?.case_studies_subtitle || acf?.portfolio_list) && (
        <CaseStudies 
          case_studies_title={acf.case_studies_title}
          case_studies_subtitle={acf.case_studies_subtitle}
          case_studies_list={acf.portfolio_list}
          prefetchedData={prefetchedData}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf?.life_codeandcore_title || acf?.life_codeandcore_button_text) && (
        <Life
          life_codeandcore_title={acf.life_codeandcore_title}
          life_codeandcore_button_text={acf.life_codeandcore_button_text}
          life_codeandcore_button_url={acf.life_codeandcore_button_url}
          life_codeandcore_highlights={acf.life_codeandcore_highlights}
          life_codeandcore_big_images={acf.life_codeandcore_big_images}
          life_codeandcore_medium_images={acf.life_codeandcore_medium_images}
          life_codeandcore_small_images={acf.life_codeandcore_small_images}
          life_codeandcore_bottom_text={acf.life_codeandcore_bottom_text}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf?.our_blogs_title || acf?.our_blogs_subtitle || acf?.our_blogs) && (
        <Highlights
          our_blogs_title={acf.our_blogs_title}
          our_blogs_subtitle={acf.our_blogs_subtitle}
          our_blogs={acf.our_blogs}
          prefetchedData={prefetchedData}
          setPrefetchedData={setPrefetchedData}
        />
      )}

      {(acf?.our_clients_title || acf?.our_clients_subtitle || acf?.our_clients_testimonials) && (
        <ClientsSay
          our_clients_title={acf.our_clients_title}
          our_clients_subtitle={acf.our_clients_subtitle}
          our_clients_button_text={acf.our_clients_button_text}
          our_clients_button_url={acf.our_clients_button_url}
          our_clients_testimonials={acf.our_clients_testimonials}
        />
      )}

      {(acf?.our_awards_title || acf?.our_awards_subtitle || acf?.our_awards_list) && (
        <OurAwards
          title={acf.our_awards_title}
          content={acf.our_awards_subtitle}
          our_awards_images={acf.our_awards_list}
        />
      )}

      {(acf.hireus_title || acf.hireus_subtitle || acf.hireus_button_text || acf.hireus_list) && (
        <HireUs
          hireus_title={acf.hireus_title}
          hireus_subtitle={acf.hireus_subtitle}
          hireus_button_text={acf.hireus_button_text}
          hireus_list={acf.hireus_list}
          contactData={contactData}
        />
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const env = process.env.NODE_ENV;    
  
    const [homePageData, generalSettingsData, contactData] = await Promise.all([
      fetchHomePage(),
      fetchGeneralSettings(),
      // fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/1282`)
      fetch(env !== "development"
        ? `/data/pages/contactus`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`)
            
        .then((res) => res.json())
    ]);

    if (!homePageData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pageData: homePageData || null,
        generalSettings: generalSettingsData || null,
        contactData: contactData || null,
      },
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);

    return {
      props: {
        pageData: null,
        contactData: null,
        generalSettings: null,
      },
    };
  }
}
