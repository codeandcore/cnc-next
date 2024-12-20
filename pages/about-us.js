import React from "react";
import Head from "next/head";
import AboutBanner from "../components/AboutBanner";
import WhoWeAre from "../components/WhoWeAre";
import VisionImage from "../components/VisionImage";
import Visionvideo from "../components/Visionvideo";
import OurEmployeeandtech from "../components/OurEmployeeandtech";
import YearOfGrowing from "../components/YearOfGrowing";
import NewLook from "../components/NewLook";
import RecognitionsAwards from "../components/RecognitionsAwards";
import HireUs from "../components/HireUs";

const AboutUs = ({ pageData }) => {
  const hireUsData = pageData?.acf?.hireus_title
    ? pageData.acf
    : pageData?.acf
    ? pageData.acf
    : null;

    const defaultTitle = "Codeandcore - Web development studio";
    const defaultDescription = "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.";
    const seoData = pageData?.yoast_head_json || {};
    const ogImage = seoData.og_image?.[0]?.url;
  return (
    <>
       <Head>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content={seoData.og_locale || "en-US"} />
      
      {/* Primary Meta Tags */}
      <title>{pageData?.title?.rendered || defaultTitle}</title>
      <meta name="description" content={seoData.description || defaultDescription} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData.og_type || "website"} />
      <meta property="og:title" content={seoData.og_title || defaultTitle} />
      <meta property="og:description" content={seoData.og_description || defaultDescription} />
      <meta property="og:url" content={seoData.og_url || (typeof window !== 'undefined' ? window.location.href : '')} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {seoData.og_locale && <meta property="og:locale" content={seoData.og_locale} />}
      
      {/* Twitter */}
      {seoData.twitter_card && <meta name="twitter:card" content={seoData.twitter_card} />}
      {seoData.twitter_site && <meta name="twitter:site" content={seoData.twitter_site} />}
      {seoData.twitter_title && <meta name="twitter:title" content={seoData.twitter_title} />}
      {seoData.twitter_description && (
        <meta name="twitter:description" content={seoData.twitter_description} />
      )}
      
      {/* Canonical URL */}
      {seoData.canonical && <link rel="canonical" href={seoData.canonical} />}
      
      {/* Schema.org JSON-LD */}
      {seoData.schema && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      )}
    </Head>

      <div className="main_wrapper">
        {pageData?.acf?.about_banner_background_image && (
          <AboutBanner
            about_banner_background_image={pageData.acf.about_banner_background_image}
            about_banner_mobile_background_image={
              pageData.acf.about_banner_mobile_background_image
            }
            about_banner_background_video={pageData.acf.about_banner_background_video}
            about_banner_title={pageData.acf.about_banner_title}
            about_banner_subtitle={pageData.acf.about_banner_subtitle}
            about_banner_description={pageData.acf.about_banner_description}
            about_banner_rating_platform_list={
              pageData.acf.about_banner_rating_platform_list
            }
          />
        )}

        {pageData &&
          (pageData.acf.a_os_title ||
            pageData.acf.a_os_sub_title ||
            pageData.acf.certified_list ||
            pageData.acf.a_wwa_right_side_title ||
            pageData.acf.goal_and_vision_section) && (
            <WhoWeAre
              a_os_title={pageData.acf.a_os_title}
              a_os_sub_title={pageData.acf.a_os_sub_title}
              certified_list={pageData.acf.certified_list}
              a_wwa_right_side_title={pageData.acf.a_wwa_right_side_title}
              a_wwa_about_description={pageData.acf.a_wwa_about_description}
              goal_and_vision_section={pageData.acf.goal_and_vision_section}
            />
          )}

        <Visionvideo />

        {pageData?.acf?.a_left_side_section_title && (
          <OurEmployeeandtech
            a_left_side_section_title={pageData.acf.a_left_side_section_title}
            employee_experience_detail={pageData.acf.employee_experience_detail}
            a_right_side_section_title={pageData.acf.a_right_side_section_title}
            technology_stack={pageData.acf.technology_stack}
          />
        )}

        {pageData?.acf?.a_y_left_side_title && (
          <YearOfGrowing
            a_y_left_side_title={pageData.acf.a_y_left_side_title}
            a_y_right_side_description={pageData.acf.a_y_right_side_description}
            year_of_growing={pageData.acf.year_of_growing}
            a_y_codeandcore_highlights={pageData.acf.a_y_codeandcore_highlights}
          />
        )}

        {pageData?.acf?.a_nlook_title && (
          <NewLook
            a_nlook_title={pageData.acf.a_nlook_title}
            a_nlook_content={pageData.acf.a_nlook_content}
          />
        )}

        {pageData?.acf?.a_ra_left_side_ttile && (
          <RecognitionsAwards
            a_ra_left_side_ttile={pageData.acf.a_ra_left_side_ttile}
            a_ra_right_side_content={pageData.acf.a_ra_right_side_content}
            a_ra_dev_button_name={pageData.acf.a_ra_dev_button_name}
            a_ra_dev_button_link={pageData.acf.a_ra_dev_button_link}
            a_ra_design_button_name={pageData.acf.a_ra_design_button_name}
            a_ra_design_button_link={pageData.acf.a_ra_design_button_link}
            a_Indastry_slider={pageData.acf.a_Indastry_slider}
            a_award_slider={pageData.acf.a_award_slider}
          />
        )}

        {pageData?.acf?.a_vision_background_image && (
          <VisionImage
            a_vision_background_image={pageData.acf.a_vision_background_image}
          />
        )}

        {hireUsData?.hireus_title && (
          <HireUs
            BASE_URL="/"
            hireus_title={hireUsData.hireus_title}
            hireus_subtitle={hireUsData.hireus_subtitle}
            hireus_button_text={hireUsData.hireus_button_text}
            hireus_list={hireUsData.hireus_list}
            // contactData={contactData}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;
  const WORDPRESS_URL = "https://wordpress-1074629-4621962.cloudwaysapps.com";
  
  try {
    // In development, fetch directly from WordPress
    if (env === "development") {
      const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/pages/389`
      );
      const pageData = await response.json();
      return {
        props: {
          pageData,
        },
      };
    }
    
    // In production, try to fetch from local API first
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pages/about-us`
      );
      
      if (!response.ok) {
        throw new Error('Local API fetch failed');
      }
      
      const pageData = await response.json();
      return {
        props: {
          pageData,
        },
      };
    } catch (localError) {
      // If local API fails, fallback to WordPress API
      console.log('Falling back to WordPress API:', localError);
      const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/pages/389`
      );
      const pageData = await response.json();
      return {
        props: {
          pageData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        pageData: null,
        error: "Failed to fetch page data"
      },
    };
  }
}

export default AboutUs;