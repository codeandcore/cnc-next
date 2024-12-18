import Highlights from '@/components/Highlights';
import BlogDetailContent from '@/components/BlogDetailContent';
import Head from 'next/head';

const BlogDetails = ({ blogData , initialHireUsData }) => {
  return (
    <>
       <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>
          {(blogData && blogData.title?.rendered) || "Codeandcore - Web development studio"}
        </title>
        <meta
          name="description"
          content={
            (blogData && blogData.yoast_head_json.description) ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={blogData && blogData.yoast_head_json.og_keywords} />
        <meta
          property="og:title"
          content={
            (blogData && blogData.yoast_head_json.og_title) ||
            "Codeandcore - Web development studio"
          }
        />
        <meta
          property="og:description"
          content={
            (blogData && blogData.yoast_head_json.og_description) ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={blogData && blogData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={
            (blogData && blogData.yoast_head_json.og_url) || 
            (typeof window !== 'undefined' ? window.location.href : '')
          }
        />
        <meta property="og:image" content={blogData && blogData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={blogData && blogData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={blogData && blogData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={blogData && blogData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={blogData && blogData.yoast_head_json.twitter_title} />
        <meta
          name="twitter:description"
          content={blogData && blogData.yoast_head_json.twitter_description}
        />
        <meta property="og:locale" content={blogData && blogData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(blogData && blogData.yoast_head_json.schema)}
        </script>
      </Head>
      <div className='main_wrapper'>
      {blogData && (
        <BlogDetailContent 
          blogData={blogData} 
        />
      )}

      {/* {hireUsData && (
        (hireUsData.hireus_title || hireUsData.hireus_subtitle || hireUsData.hireus_button_text || hireUsData.hireus_list) && (
          <HireUs
            hireus_title={hireUsData.hireus_title}
            hireus_subtitle={hireUsData.hireus_subtitle}
            hireus_button_text={hireUsData.hireus_button_text}
            hireus_list={hireUsData.hireus_list}
          />
        )
      )} */}

      {initialHireUsData && (
          <Highlights 
            className='perpalbg' 
            our_blogs_title={initialHireUsData.acf.our_blogs_title} 
            our_blogs_subtitle={initialHireUsData.acf.our_blogs_subtitle} 
            our_blogs={initialHireUsData.acf.our_blogs}
          />
      )}
    </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  let blogData = null;
  let initialHireUsData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?slug=${slug}`);
    const data = await res.json();
    blogData = data.length > 0 ? data[0] : null; 

    const hireUsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/7`);
    initialHireUsData = await hireUsResponse.json();

  } catch (error) {
    console.error('Error fetching blog data:', error);
  }

  return {
    props: {
      blogData,
      initialHireUsData
    },
  };
}

export default BlogDetails;
