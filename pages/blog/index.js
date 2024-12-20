import HireUs from '@/components/HireUs';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const BlogList = dynamic(() => import('@/components/BlogList'), { 
  ssr: false,
  loading: () => null 
})
const defaultTitle = "Codeandcore - Web development studio";
const defaultDescription = "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce.";

const BASE_URL = 'https://wordpress-1074629-4621962.cloudwaysapps.com';


const Blog = ({ initialBlogPageData, initialHireUsData ,initialBlogblogYoastData }) => {
  console.log(initialBlogblogYoastData)

  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Essential SEO tags */}
      <title>{initialBlogblogYoastData?.title?.rendered || defaultTitle}</title>
      <meta name="description" content={initialBlogblogYoastData?.yoast_head_json?.og_description || defaultDescription} />
      <link rel="canonical" href={initialBlogblogYoastData?.yoast_head_json?.canonical || (typeof window !== 'undefined' ? window.location.href : '')} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={initialBlogblogYoastData?.yoast_head_json?.og_title || defaultTitle} />
      <meta property="og:description" content={initialBlogblogYoastData?.yoast_head_json?.og_description || defaultDescription} />
      <meta property="og:type" content={initialBlogblogYoastData?.yoast_head_json?.og_type || "website"} />
      <meta property="og:url" content={initialBlogblogYoastData?.yoast_head_json?.og_url || (typeof window !== 'undefined' ? window.location.href : '')} />
      {initialBlogblogYoastData?.yoast_head_json?.og_image?.[0]?.url && (
        <meta property="og:image" content={initialBlogblogYoastData.yoast_head_json.og_image[0].url} />
      )}
      <meta property="og:locale" content={initialBlogblogYoastData?.yoast_head_json?.og_locale || "en_US"} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content={initialBlogblogYoastData?.yoast_head_json?.twitter_card || "summary_large_image"} />
      <meta name="twitter:site" content={initialBlogblogYoastData?.yoast_head_json?.twitter_site || "@CodeandCore"} />
      <meta name="twitter:title" content={initialBlogblogYoastData?.yoast_head_json?.twitter_title || defaultTitle} />
      <meta name="twitter:description" content={initialBlogblogYoastData?.yoast_head_json?.twitter_description || defaultDescription} />
      
      {/* Schema.org JSON-LD */}
      {initialBlogblogYoastData?.yoast_head_json?.schema && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(initialBlogblogYoastData.yoast_head_json.schema)
          }}
        />
      )}
    </Head>
      <div className="main_wrapper">
      {initialBlogPageData?.acf && (
        <BlogList
          blog_heading={initialBlogPageData.acf.blog_heading || ''}
          blog_content={initialBlogPageData.acf.blog_content || ''}
          blog_all_categories_label={initialBlogPageData.acf.blog_all_categories_label || ''}
          BASE_URL={BASE_URL}
        />
      )}
      {initialHireUsData?.acf && (
        <HireUs
          BASE_URL={BASE_URL}
          hireus_title={initialHireUsData.acf.hireus_title || ''}
          hireus_subtitle={initialHireUsData.acf.hireus_subtitle || ''}
          hireus_button_text={initialHireUsData.acf.hireus_button_text || ''}
          hireus_list={initialHireUsData.acf.hireus_list || []}
        />
      )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;    

  try {
    const blogResponse = await fetch(
      `${BASE_URL}/wp-json/wp/v2/pages/1219?_fields=acf`
    );

    const blogYoast = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1219`
    );

    const hireUsResponse = await fetch(`https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`
    );
    

    const initialBlogPageData = blogResponse.ok 
      ? await blogResponse.json() 
      : null;

    const initialBlogblogYoastData = blogYoast.ok 
      ? await blogYoast.json() 
      : null;

    const initialHireUsData = hireUsResponse.ok
      ? await hireUsResponse.json()
      : null;

    return {
      props: {
        initialBlogPageData,
        initialHireUsData,
        initialBlogblogYoastData
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      props: {
        initialBlogPageData: null,
        initialHireUsData: null
      }
    };
  }
}

export default Blog;