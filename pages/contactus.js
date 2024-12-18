import React from 'react';
import EllipseArrow from '../public/images/ellipse_arr.png';
import { fetchHomePage, fetchContactPage } from './api/fetchData';
import Head from 'next/head';
import ContactBanner from '@/components/ContactBanner';
import ContactForm from '@/components/ContactForm';
import ProjectCountries from '@/components/ProjectCountries';
import Image from 'next/image';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css'; 
import "react-owl-carousel2/src/owl.carousel.css";

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
  return (
    <div className='main_wrapper'>
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{contactPage && contactPage.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            contactPage && contactPage.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={contactPage && contactPage.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={contactPage && contactPage.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            contactPage && contactPage.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={contactPage && contactPage.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={contactPage && contactPage.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={contactPage && contactPage.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={contactPage && contactPage.yoast_head_json.canonical} />
        <meta name="twitter:card" content={contactPage && contactPage.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={contactPage && contactPage.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={contactPage && contactPage.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={contactPage && contactPage.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={contactPage && contactPage.yoast_head_json.og_locale} />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(contactPage && contactPage.yoast_head_json.schema)}
        </script>
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
          BASE_URL={process.env.NEXT_PUBLIC_BASE_URL}
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