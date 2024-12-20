import React from 'react';
import EllipseArrow from '../public/images/ellipse_arr.png';
import { fetchHomePage, fetchContactPage } from './api/fetchData';
import Head from 'next/head';
import ContactBanner from '@/components/ContactBanner';
import ContactForm from '@/components/ContactForm';
import ProjectCountries from '@/components/ProjectCountries';
import Image from 'next/image';
// import 'react-owl-carousel2/lib/styles.css';
// import 'react-owl-carousel2/src/owl.theme.default.css'; 
// import "react-owl-carousel2/src/owl.carousel.css";

export async function getServerSideProps() {
  try {
    const [homePage, contactPage] = await Promise.all([
      fetchHomePage(),
      fetchContactPage()
    ]);

    return {
      props: {
        homePage,
        contactPage
      }
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      props: {
        homePage: null,
        contactPage: null
      }
    };
  }
}

export default function ContactUs({ homePage, contactPage }) {
  if (!homePage || !contactPage) {
    return <div>Loading...</div>;
  }

  const homePageACF = homePage.acf || {};
  const contactPageACF = contactPage.acf || {};
  const defaultTitle = "Codeandcore - Web development studio";
  const defaultDescription = "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.";
    const {
    title,
    yoast_head_json: yoast = {}
  } = contactPage || {};
  const canonicalUrl = yoast.canonical || (typeof window !== 'undefined' ? window.location.href : '');
  return (
    <div className='main_wrapper'>
      
      <Head>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Primary Meta Tags */}
      <title>{title?.rendered || defaultTitle}</title>
      <meta name="description" content={yoast.description || defaultDescription} />
      {yoast.og_keywords && <meta name="keywords" content={yoast.og_keywords} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={yoast.og_title || defaultTitle} />
      <meta property="og:description" content={yoast.og_description || defaultDescription} />
      <meta property="og:type" content={yoast.og_type || "website"} />
      <meta property="og:url" content={yoast.og_url || canonicalUrl} />
      {yoast.og_image?.[0]?.url && (
        <>
          <meta property="og:image" content={yoast.og_image[0].url} />
          <meta property="og:image:width" content={yoast.og_image[0].width} />
          <meta property="og:image:height" content={yoast.og_image[0].height} />
        </>
      )}
      <meta property="og:locale" content={yoast.og_locale || "en_US"} />
      <meta property="og:site_name" content={yoast.og_site_name || "Codeandcore"} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={yoast.twitter_card || "summary_large_image"} />
      <meta name="twitter:site" content={yoast.twitter_site} />
      <meta name="twitter:title" content={yoast.twitter_title || yoast.og_title || defaultTitle} />
      <meta name="twitter:description" content={yoast.twitter_description || yoast.og_description || defaultDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Schema.org JSON-LD */}
      {yoast.schema && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast.schema) }}
        />
      )}
    </Head>

      {(contactPageACF.banner_background_image || 
        contactPageACF.banner_background_video || 
        contactPageACF.banner_title || 
        contactPageACF.banner_subtitle || 
        contactPageACF.banner_statistic_expertise || 
        contactPageACF.banner_statistic_industry || 
        contactPageACF.banner_statistic_projects || 
        homePageACF.banner_rating_platform_list) && (
        <ContactBanner
          banner_background_image={contactPageACF.banner_background_image}
          banner_background_video={contactPageACF.banner_background_video}
          banner_title={contactPageACF.banner_title}
          banner_subtitle={contactPageACF.banner_subtitle}
          banner_statistic_expertise={contactPageACF.banner_statistic_expertise}
          banner_statistic_industry={contactPageACF.banner_statistic_industry}
          banner_statistic_projects={contactPageACF.banner_statistic_projects}
          banner_rating_platform_list={homePageACF.banner_rating_platform_list}
        />
      )}

      {(contactPageACF.contact_form_location_label || 
        contactPageACF.contact_form_email_address || 
        contactPageACF.contact_form_social_label) && (
        <ContactForm
          // BASE_URL={process.env.NEXT_PUBLIC_BASE_URL}
          contact_form_location_label={contactPageACF.contact_form_location_label}
          contact_form_location_address={contactPageACF.contact_form_location_address}
          contact_form_email_label={contactPageACF.contact_form_email_label}
          contact_form_email_address={contactPageACF.contact_form_email_address}
          contact_form_social_label={contactPageACF.contact_form_social_label}
          contact_form_facebook_link={contactPageACF.contact_form_facebook_link}
          contact_form_twitter_link={contactPageACF.contact_form_twitter_link}
          contact_form_linkedin_link={contactPageACF.contact_form_linkedin_link}
          contact_form_instagram_link={contactPageACF.contact_form_instagram_link}
          google_map_latitude={contactPageACF.google_map_latitude}
          google_map_longitude={contactPageACF.google_map_longitude}
          contact_form_title={contactPageACF.contact_form_title}
          contact_form_service_label={contactPageACF.contact_form_service_label}
          contact_social_links={contactPageACF.contact_social_links}
          contact_form_budget_label={contactPageACF.contact_form_budget_label}
          contact_form_budget_list={contactPageACF.contact_form_budget_list}
          contact_social_icon={contactPageACF.contact_social_icon}
        />
      )}

      {(contactPageACF.developer_title || 
        contactPageACF.developer_subtitle || 
        contactPageACF.developer_button) && (
        <div className='are_you_dev'>
          <div className='wrapper d_flex'>
            <div className='left_col'>
              {contactPageACF.developer_title && (
                <h2>{contactPageACF.developer_title}</h2>
              )}
              {contactPageACF.developer_subtitle && (
                <p>{contactPageACF.developer_subtitle}</p>
              )}
            </div>
            {contactPageACF.developer_button && (
              <a 
                href={contactPageACF.developer_button.url} 
                className="btn btnarrow"
              >
                <em>{contactPageACF.developer_button.title}</em>
                <div>
                  <Image 
                    src={EllipseArrow} 
                    alt={contactPageACF.developer_button.title}
                  />
                </div>
              </a>
            )}
          </div>
        </div>
      )}

      {(contactPageACF.countries_title || contactPageACF.countries_list) && (
        <ProjectCountries
          countries_title={contactPageACF.countries_title}
          countries_list={contactPageACF.countries_list}
        />
      )}
    </div>
  );
}