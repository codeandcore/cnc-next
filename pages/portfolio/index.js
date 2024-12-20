import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import CasestudingExploreData from "@/components/CasestudingExploreData";
import OurAwards from "@/components/OurAwards";
import HireUs from "@/components/HireUs";
import loader from "@/public/images/rotate-right.png";
import CasestudingBanner from "@/components/CasestudingBanner";


export default function PortfolioHome({ 
  initialCaseStudyPageData, 
  initialOurAwardsData, 
  initialHireUsData, 
  initialYoastData 
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://wordpress-1074629-4621962.cloudwaysapps.com/";

  const menuList = initialOurAwardsData.acf.portfolio_list[0].industries
 


  
  const [CaseStudycptData, setCaseStudycptData] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/wp-json/custom/v1/case-study-list?page=${page}&per_page=${perPage}&industry=${selectedIndustry}&services=${selectedService}`
      );
      const data = await response.json();

      setHasMorePages(data.current_page < data.total_pages);
      setCaseStudycptData((prevData) => 
        page === 1 ? data.data : [...prevData, ...data.data]
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching case study data:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleIndustryChange = (value) => {
    setPage(1);
    setSelectedIndustry(value);
    setCaseStudycptData([]);
  };

  const handleServiceChange = (value) => {
    setPage(1);
    setSelectedService(value);
    setCaseStudycptData([]);
  };

  useEffect(() => {
    fetchData();
  }, [page, selectedIndustry, selectedService]);

  
  return (
    <div className="main_wrapper">
         <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>{initialCaseStudyPageData && initialCaseStudyPageData.title?.rendered || "Codeandcore - Web development studio"}</title>
        {/* <meta
          name="description"
          content={
            initialCaseStudyPageData.yoast_head_json.description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta name="keywords" content={initialCaseStudyPageData.yoast_head_json.og_keywords} /> */}
        <meta
          property="og:title"
          content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_title || "Codeandcore - Web development studio"}
        />
        <meta
          property="og:description"
          content={
            initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_description ||
            "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
          }
        />
        <meta property="og:type" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_type || "website"} />
        <meta
          property="og:url"
          content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_url || (typeof window !== 'undefined' ? window.location.href : '')}
        />
        <meta property="og:image" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_image[0].url} />
        <link rel="canonical" href={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.canonical} />
        <meta name="twitter:card" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.twitter_card} />
        <meta name="twitter:site" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.twitter_site} />
        <meta name="twitter:title" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.twitter_title} />
        <meta name="twitter:description" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.twitter_description} />
        <meta property="og:locale" content={initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.og_locale} />

        <script type="application/ld+json">
          {JSON.stringify(initialCaseStudyPageData && initialCaseStudyPageData.yoast_head_json.schema)}
        </script>
      </Head>

      {initialCaseStudyPageData && (
        <CasestudingBanner
          career_awards_logo_new={initialCaseStudyPageData.acf.banner_clients_list}
          banner_background_image_mobile={initialCaseStudyPageData.acf?.banner_background_image_mobile}
          casestuding_banner_image={initialCaseStudyPageData.acf?.casestuding_banner_image}
          casestuding_banner_video={initialCaseStudyPageData.acf?.casestuding_banner_video}
          casestuding_banner_title={initialCaseStudyPageData.acf?.casestuding_banner_title}
          casestuding_banner_description={initialCaseStudyPageData.acf?.casestuding_banner_description}
          IndustryTaxonomyData={[]}  
          ServicesTaxonomyData={[]} 
          onIndustryChange={handleIndustryChange}
          onServiceChange={handleServiceChange}
          menuList={menuList}
        />
      )}

      {isLoading && (
        <div className="loader_blog">
          <Image src={loader} alt="rotate-right" height={20} width={20} />
        </div>
      )}

      {CaseStudycptData.length > 0 && (
        <CasestudingExploreData
          CaseStudycptData={CaseStudycptData}
          onLoadMore={handleLoadMore}
          hasMorePages={hasMorePages}
          isLoading={isLoading}
        />
      )}

      {initialOurAwardsData?.acf && (
        <OurAwards
          className="ourawardgray"
          title={initialOurAwardsData?.acf.our_awards_title}
          content={initialOurAwardsData?.acf?.our_awards_subtitle}
          our_awards_images={initialOurAwardsData?.acf?.our_awards_list}
        />
      )}

      
       {initialHireUsData && (
        <HireUs
          BASE_URL={BASE_URL}
          hireus_title={initialHireUsData?.hireus_title}
          hireus_subtitle={initialHireUsData?.hireus_subtitle}
          hireus_button_text={initialHireUsData?.hireus_button_text}
          hireus_list={initialHireUsData?.hireus_list}
        />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://wordpress-1074629-4621962.cloudwaysapps.com/";
  const env = process.env.NODE_ENV;    
  

  try {
    const caseStudyPageResponse = await fetch(`${BASE_URL}/wp-json/wp/v2/pages?slug=portfolio`);
    const caseStudyPageData = await caseStudyPageResponse.json();
    const initialCaseStudyPageData = caseStudyPageData[0] || null;

    const additionalPageResponse = await fetch(env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
    const additionalPageData = await additionalPageResponse.json();

    return {
      props: {
        initialCaseStudyPageData,
        initialOurAwardsData : additionalPageData,
        initialHireUsData: additionalPageData?.acf || null,
        initialYoastData: initialCaseStudyPageData?.yoast_head_json || null,
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);

    return {
      props: {
        initialCaseStudyPageData: null,
        initialOurAwardsData: null,
        initialHireUsData: null,
        initialYoastData: null,
      },
    };
  }
}