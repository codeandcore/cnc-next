import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGeneralSettings, fetchHomePage, fetchContactPage, fetchCareerPage } from './api/fetchData';
import HireUs from '@/components/HireUs';
import ExploreWork from '@/components/ExploreWork';

export async function getStaticProps() {
  try {
    const [GeneralSetting, HomePage, CareerpageData] = await Promise.all([
      fetchGeneralSettings(),
      fetchHomePage(),
      fetchContactPage(),
      fetchCareerPage()
    ]);

    return {
      props: {
        GeneralSetting,
        HomePage,
        CareerpageData
      },
      revalidate: 3600 
    };
  } catch (error) {
    console.error('Error fetching data for 404 page:', error);
    return {
      props: {
        GeneralSetting: null,
        HomePage: null,
        CareerpageData: null
      }
    };
  }
}

const Custom404 = ({ 
  GeneralSetting, 
  HomePage, 
}) => {
  const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
  };

  if (!GeneralSetting || isEmpty(GeneralSetting)) {
    return (
      <div className="error-fallback">
        <h1>404 - Page Not Found</h1>
        <p>We couldn't load the page details. Please try again later.</p>
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="main_wrapper">
      <div className="error_sec">
        <div className="wrapper d_flex d_flex_at">
          <div className="left_col">
            {GeneralSetting.error_background_image && (
              <Image
                width={500}
                height={500}
                src={GeneralSetting.error_background_image.url}
                alt={GeneralSetting.error_background_image.title || "Error Background"}
                priority
              />
            )}
          </div>
          <div className="right_col">
            {GeneralSetting.error_title && (
              <h1 dangerouslySetInnerHTML={{ __html: GeneralSetting.error_title }}></h1>
            )}
            {GeneralSetting.error_content && (
              <div dangerouslySetInnerHTML={{ __html: GeneralSetting.error_content }}></div>
            )}
            <Link href="/" className="btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {GeneralSetting.error_you_may_like_title && (
        <div className="pages_loop">
          <div className="wrapper">
            <h2 dangerouslySetInnerHTML={{ __html: GeneralSetting.error_you_may_like_title }}></h2>
            {GeneralSetting.error_like_pages_list && (
              <div className="inner d_flex d_flex_jc">
                {GeneralSetting.error_like_pages_list.map((page, index) => (
                  <Link 
                    key={index} 
                    href={`/${page.post_name}`} 
                    className="btn"
                  >
                    {page.post_title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {GeneralSetting && (GeneralSetting.portfolio_title || GeneralSetting.portfolio_subtitle || GeneralSetting.portfolio_button || HomePage?.industry_portfolio_list) && (
        <ExploreWork
          title={GeneralSetting.portfolio_title}
          subtitle={GeneralSetting.portfolio_subtitle}
          button={GeneralSetting.portfolio_button}
          items={GeneralSetting.industry_portfolio_list}
        />
      )}

      {HomePage && (HomePage.acf?.hireus_title || HomePage.acf?.hireus_subtitle || HomePage.acf?.hireus_button_text || HomePage.acf?.hireus_list) && (
        <HireUs
          hireus_title={HomePage.acf.hireus_title}
          hireus_subtitle={HomePage.acf.hireus_subtitle}
          hireus_button_text={HomePage.acf.hireus_button_text}
          hireus_list={HomePage.acf.hireus_list}
        />
      )}
    </div>
  );
};

export default Custom404;