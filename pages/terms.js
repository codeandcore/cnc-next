import Head from 'next/head';
import he from 'he';
import HireUs from '../components/HireUs';

function Termsofuse({ hireUs, prefetchedData }) {
  
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{prefetchedData.title?.rendered || "Codeandcore - Web development studio"}</title>
        {/* <meta
          name="description"
          content={
            prefetchedData.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={prefetchedData.yoast_head_json.og_keywords} /> */}
        <meta
          property="og:title"
          content={prefetchedData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
    
        <meta property="og:type" content={prefetchedData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={prefetchedData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={prefetchedData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={prefetchedData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={prefetchedData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={prefetchedData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={prefetchedData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={prefetchedData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={prefetchedData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(prefetchedData.yoast_head_json.schema)}
        </script>
      </Head>

      {prefetchedData && (
        <div className="policy-page Warranty_page">
          <div className="wrapper">
            <div className="title">
              {prefetchedData.title && <h1>{prefetchedData.title.rendered}</h1>}
            </div>
            {prefetchedData.acf.content_editor && (
              <div
                className="inner"
                dangerouslySetInnerHTML={{
                  __html: he.decode(prefetchedData.acf.content_editor),
                }}
              ></div>
            )}
          </div>
        </div>
      )}

      {hireUs.acf &&
        (hireUs.acf.hireus_title ||
          hireUs.acf.hireus_subtitle ||
          hireUs.acf.hireus_button_text ||
          hireUs.acf.hireus_list) && (
          <HireUs
            hireus_title={hireUs.acf.hireus_title}
            hireus_subtitle={hireUs.acf.hireus_subtitle}
            hireus_button_text={hireUs.acf.hireus_button_text}
            hireus_list={hireUs.acf.hireus_list}
          />
        )}
    </>
  );
}

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    
  let hireUs = null;
  let pageData = null;
  try {
    const resPage = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/terms`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3621`);
    pageData = await resPage.json();
    
    const resHome = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    hireUs = await resHome.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        error: true,
        message: error.message
      }
    };
  }

  return {
    props: {
      hireUs,
      prefetchedData: pageData,
    },
  };
}

export default Termsofuse;