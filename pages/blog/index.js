import HireUs from '@/components/HireUs';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const BlogList = dynamic(() => import('@/components/BlogList'), { 
  ssr: false,
  loading: () => null 
})


const BASE_URL = 'https://wordpress-1074629-4621962.cloudwaysapps.com';

const Blog = ({ initialBlogPageData, initialHireUsData ,initialBlogblogYoastData }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{initialBlogblogYoastData && initialBlogblogYoastData.title?.rendered || "Codeandcore - Web development studio"}</title>
        <meta
          property="og:title"
          content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        {/* <meta
          property="og:description"
          content={
            initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        /> */}
        <meta property="og:type" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(initialBlogblogYoastData && initialBlogblogYoastData.yoast_head_json.schema)}
        </script>
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
  try {
    const blogResponse = await fetch(
      `${BASE_URL}/wp-json/wp/v2/pages/1219?_fields=acf`
    );

    const blogYoast = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/1219`);

    const hireUsResponse = await fetch(
      `${BASE_URL}/wp-json/wp/v2/pages/7?_fields=acf`
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