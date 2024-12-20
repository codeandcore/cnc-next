import Head from 'next/head';
import CareerBanner from '../components/CareerBanner';
import Perksandbenefits from '../components/Perksandbenefits';
import SolvingIndustriesChallenges from '../components/SolvingIndustriesChallenges';
import Life from '../components/Life';
import dynamic from 'next/dynamic';
const JobOpenings = dynamic(() => import('../components/JobOpenings'), { 
  ssr: false,
  loading: () => <p>Loading...</p> 
});

export default function Career({ 
  CareerpageData, 
  initialCncData
}) {
  

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{CareerpageData?.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          name="description"
          content={
            CareerpageData?.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={CareerpageData?.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={CareerpageData?.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            CareerpageData?.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={CareerpageData?.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={CareerpageData?.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={CareerpageData?.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={CareerpageData?.yoast_head_json.canonical} />
        <meta name="twitter:card" content={CareerpageData?.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={CareerpageData?.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={CareerpageData?.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={CareerpageData?.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={CareerpageData?.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(CareerpageData?.yoast_head_json.schema)}
        </script>
      </Head>

      <div className="main_wrapper">
        {CareerpageData && (
          <CareerBanner
            career_banner_background_image={CareerpageData.acf.career_banner_background_image}
            career_banner_title={CareerpageData.acf.career_banner_title}
            career_banner_description={CareerpageData.acf.career_banner_description}
            career_openings_label={CareerpageData.acf.career_openings_label}
            career_opening_link={CareerpageData.acf.career_opening_link}
            select_opening_job={CareerpageData.acf.select_opening_job}
            career_right_side_banner_title={CareerpageData.acf.career_right_side_banner_title}
            learn_more_about_codeandcore={CareerpageData.acf.learn_more_about_codeandcore}
            career_awards_logo={CareerpageData.acf.banner_clients_list}
          />
        )}

        {CareerpageData && (
          <Perksandbenefits
            c_b_title={CareerpageData.acf.c_b_title}
            c_b_description={CareerpageData.acf.c_b_description}
            c_benifitis={CareerpageData.acf.c_benifitis}
          />
        )}

        {CareerpageData && (
          <JobOpenings
            jon_opening_title={CareerpageData.acf.jon_opening_title}
            job_opening_description={CareerpageData.acf.job_opening_description}
            select_opening_job={CareerpageData.acf.select_opening_job}
            connect_content_info={CareerpageData.acf.connect_content_info}
            CareerpageData={CareerpageData}
          />
        )}

        {CareerpageData && (
          <SolvingIndustriesChallenges
            sic_title={CareerpageData.acf.sic_title}
            solving_industries={CareerpageData.acf.solving_industries}
            sic_button_name={CareerpageData.acf.sic_button_name}
            sic_button_link={CareerpageData.acf.sic_button_link}
          />
        )}

    {initialCncData && (initialCncData.acf.life_codeandcore_title || initialCncData.acf.life_codeandcore_button_text || initialCncData.acf.life_codeandcore_highlights || initialCncData.acf.life_codeandcore_bottom_text ) && ( 
        <Life
        className={'lifebanner'}
          life_codeandcore_title={initialCncData.acf.life_codeandcore_title}
          life_codeandcore_button_text={initialCncData.acf.life_codeandcore_button_text}
          life_codeandcore_button_url={initialCncData.acf.life_codeandcore_button_url}
          life_codeandcore_highlights={initialCncData.acf.life_codeandcore_highlights}
          life_codeandcore_big_images={initialCncData.acf.life_codeandcore_big_images}
          life_codeandcore_medium_images={initialCncData.acf.life_codeandcore_medium_images}
          life_codeandcore_small_images={initialCncData.acf.life_codeandcore_small_images}
          life_codeandcore_bottom_text={initialCncData.acf.life_codeandcore_bottom_text}
        ></Life>
             )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    

  try {
    // const homePageRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/46`);
    // const HomePage = await homePageRes.json();

    // const contactPageRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/49`);
    // const ContactPage = await contactPageRes.json();
    

    const careerPageRes = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/career`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/655`);

    const CareerpageData = await careerPageRes.json();

    const otherComponentsResponse = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);

    const initialCncData = await otherComponentsResponse.json();

    return {
      props: {
        // HomePage,
        // ContactPage,
        CareerpageData,
        initialCncData
      }
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      props: {
        // HomePage: null,
        // ContactPage: null,
        CareerpageData: null,
        yoastData: null,
        initialCncData : null
      }
    };
  }
}