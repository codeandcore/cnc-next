import React, { useEffect, useState } from 'react';
import ReviewBanner from '@/components/ReviewBanner';
import ReviewClientsay from '@/components/ReviewClientsay';
import ReviewAwards from '@/components/ReviewAwards';
import Head from 'next/head';

const Review = ({ initialReviewpage }) => {
  const [ReviewpageData, setReviewpageData] = useState(initialReviewpage);

  useEffect(() => {
    const fetchReviewPageData = async () => {
      try {
        if (!ReviewpageData) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/2896`);
          const data = await response.json();
          setReviewpageData(data);
        }
      } catch (error) {
        console.error('Error fetching data from WordPress API:', error);
      }
    };

    fetchReviewPageData();
  }, [ReviewpageData]);

  if (!ReviewpageData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{ReviewpageData && ReviewpageData.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          property="og:title"
          content={ReviewpageData && ReviewpageData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            ReviewpageData && ReviewpageData.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={ReviewpageData && ReviewpageData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={ReviewpageData && ReviewpageData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={ReviewpageData && ReviewpageData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={ReviewpageData && ReviewpageData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={ReviewpageData && ReviewpageData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={ReviewpageData && ReviewpageData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={ReviewpageData && ReviewpageData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={ReviewpageData && ReviewpageData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={ReviewpageData && ReviewpageData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(ReviewpageData && ReviewpageData.yoast_head_json.schema)}
        </script>
      </Head>
      {ReviewpageData.acf.banner_title ||
        ReviewpageData.acf.banner_description ||
        ReviewpageData.acf.right_side_title ||
        ReviewpageData.acf.discover_more ? (
        <ReviewBanner
          banner_title={ReviewpageData.acf.banner_title}
          banner_description={ReviewpageData.acf.banner_description}
          right_side_title={ReviewpageData.acf.right_side_title}
          discover_more={ReviewpageData.acf.discover_more}
        />
      ) : null}

      {(ReviewpageData.acf.what_client_say_title || 
        ReviewpageData.acf.client_listing || 
        ReviewpageData.acf.client_reviews) ? (
        <ReviewClientsay
          what_client_say_title={ReviewpageData.acf.what_client_say_title}
          client_listing={ReviewpageData.acf.client_listing}
          client_reviews={ReviewpageData.acf.client_reviews}
        />
      ) : null}

      {ReviewpageData.acf.awards_title ||
        ReviewpageData.acf.awards_subtitle ||
        ReviewpageData.acf.awards_listing_ltr ||
        ReviewpageData.acf.awards_listing_rtl ? (
        <ReviewAwards
          awards_title={ReviewpageData.acf.awards_title}
          awards_subtitle={ReviewpageData.acf.awards_subtitle}
          awards_listing_ltr={ReviewpageData.acf.awards_listing_ltr}
          awards_listing_rtl={ReviewpageData.acf.awards_listing_rtl}
        />
      ) : null}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/2896`);
    const initialReviewpage = await res.json();

    return {
      props: {
        initialReviewpage,
      },
    };
  } catch (error) {
    console.error('Error fetching data from server:', error);
    return {
      props: {
        initialReviewpage: null,
      },
    };
  }
}

export default Review;