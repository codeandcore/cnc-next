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

const AboutUs = ({ pageData, contactData }) => {
  const hireUsData = pageData?.acf?.hireus_title
    ? pageData.acf
    : pageData?.acf
    ? pageData.acf
    : null;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>
          {(pageData && pageData.title?.rendered) || "Codeandcore - Web development studio"}
        </title>
        <meta
          name="description"
          content={
            (pageData && pageData.yoast_head_json.description) ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={pageData && pageData.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={
            (pageData && pageData.yoast_head_json.og_title) ||
            "Codeandcore - Web development studio"
          }
        />
        <meta
          property="og:description"
          content={
            (pageData && pageData.yoast_head_json.og_description) ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={pageData && pageData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={
            (pageData && pageData.yoast_head_json.og_url) || 
            (typeof window !== 'undefined' ? window.location.href : '')
          }
        />
        <meta property="og:image" content={pageData && pageData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={pageData && pageData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={pageData && pageData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={pageData && pageData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={pageData && pageData.yoast_head_json.twitter_title} />
        <meta
          name="twitter:description"
          content={pageData && pageData.yoast_head_json.twitter_description}
        />
        <meta property="og:locale" content={pageData && pageData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(pageData && pageData.yoast_head_json.schema)}
        </script>
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
            contactData={contactData}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const pageResponse = await fetch(
      process.env.NODE_ENV !== "development"
        ? "/data/pages/about-us"
        : `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/389`
    );
    const pageData = await pageResponse.json();

    const contactResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/contact-page-url`
    );
    const contactData = await contactResponse.json();

    return {
      props: {
        pageData,
        contactData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        pageData: null,
        contactData: null,
      },
    };
  }
}

export default AboutUs;