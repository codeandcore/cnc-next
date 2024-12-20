import { useRouter } from 'next/router';
import HireUs from '@/components/HireUs';
import ExploreWork from '@/components/ExploreWork';
import Head from 'next/head';

const Thankyou = ({ GeneralSetting , initialHireUsData}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>Thank You</title>
      </Head>
      {GeneralSetting && (
        <div className='main_wrapper'>
          <div className='error_sec thankyou_sec'>
            <div className='wrapper d_flex '>
              <div className='left_col'>
                <div className='img_col'>
                  {GeneralSetting.thankyou_image_title && (
                    <span dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_image_title }}></span>
                  )}
                  {GeneralSetting.thankyou_image && (
                    <img src={GeneralSetting.thankyou_image.url} alt={GeneralSetting.thankyou_image.title} />
                  )}
                </div>
              </div>
              <div className='right_col'>
                {GeneralSetting.thankyou_title && (
                  <h1 dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_title }}></h1>
                )}
                {GeneralSetting.thankyou_content && (
                  <p dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_content }}></p>
                )}
                <button style={{color:'white',fontSize:'17px',fontWeight:'600',cursor:'pointer'}} className="btn" onClick={() => router.push('/')}>
                  <em>Back to Home</em>
                </button>
                {GeneralSetting.thankyou_social_links && (
                  <div className='social_icon d_flex d_flex_js'>
                    {GeneralSetting.thankyou_social_links.map((page, index) => (
                      <a href={page.url} target='_blank' rel="noreferrer" key={index}>
                        <img src={page.icon.url} alt={page.icon.title} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {GeneralSetting && (
            <ExploreWork 
              title={GeneralSetting.thankyou_portfolio_title}
              subtitle={GeneralSetting.thankyou_portfolio_subtitle}
              button={GeneralSetting.thankyou_portfolio_button}
              items={GeneralSetting.thankyou_portfolio_list}
            />
          )}
          {initialHireUsData && (
            <HireUs
              hireus_title={initialHireUsData?.acf.hireus_title}
              hireus_subtitle={initialHireUsData?.acf.hireus_subtitle}
              hireus_button_text={initialHireUsData?.acf.hireus_button_text}
              hireus_list={initialHireUsData?.acf.hireus_list}
            />
          )}
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const env = process.env.NODE_ENV;    

  const fetchGeneralSetting = await fetch(env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/data/general-setting`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all`);
  const GeneralSetting = await fetchGeneralSetting.json();

  const hireUsResponse = await fetch(env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/data/pages/home`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`);
  const initialHireUsData = await hireUsResponse.json();

  return {
    props: {
      GeneralSetting,
      initialHireUsData
    },
  };
};

export default Thankyou;
