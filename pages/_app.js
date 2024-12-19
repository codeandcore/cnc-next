import '../styles/globals.css';
import '../styles/components/menu.css';
import '../styles/components/banner.css';
import '../styles/components/case-studies.css'; 
import '../styles/components/clients-say.css'; 
import '../styles/components/highlights.css'; 
import '../styles/components/industries-slider.css';
import '../styles/components/life.css'; 
import '../styles/components/stack-technologies.css';
import '../styles/components/tab-containt.css';
import '../styles/components/why-choose.css'; 
import '../styles/components/hire-us.css';
import '../styles/components/about-banner.css';
import '../styles/components/who-we-are.css';
import '../styles/components/vision-video.css';
import '../styles/components/our-awards.css';
import '../styles/components/our-employee-and-tech.css';
import '../styles/components/year-of-growing.css';
import '../styles/components/new-look.css';
import '../styles/components/recognitions-awards.css';
import '../styles/components/career-banner.css';
import '../styles/components/awards-logo.css';
import '../styles/components/perks-and-benefits.css';
import '../styles/components/job-openings.css';
import '../styles/components/career-popup.css';
import '../styles/components/solving-industries-challenges.css';
import '../styles/pages/portfolio-features.css';
import '../styles/components/casestuding-containts.css';
import '../styles/components/blog-page-title.css';
import '../styles/components/blog-list.css';
import '../styles/components/services-banner.css';
import '../styles/components/services-list.css';
import '../styles/components/our-approach.css';
import '../styles/components/services-details-banner.css';
import '../styles/components/digital-solution.css';
import '../styles/components/how-we-help.css';
import '../styles/components/explore-done.css';
import '../styles/components/why-choose-company-design.css';
import '../styles/components/questions-answered.css';
import '../styles/components/industry-banner.css';
import '../styles/components/services-list.css';
import '../styles/components/industrys-list.css';
import '../styles/components/casestuding-explore-data.css';
import '../styles/components/casestuding-banner.css';
import '../styles/components/contact-banner.css';
import '../styles/components/contact-form.css';
import '../styles/components/project-contries.css';
import '../styles/components/techno-banner.css';
import '../styles/components/techno-list.css';
import '../styles/components/healthcare-sector.css';
import '../styles/components/healthcare-software.css';
import '../styles/components/healthcare-solution.css';
import '../styles/components/portfolio-features.css';
import '../styles/components/techno-detail-containts.css';
import '../styles/components/happy-hours.css';
import '../styles/components/festival-celebration.css';
import '../styles/components/socialmedia-life.css';
import '../styles/components/review-clientsay.css';
import '../styles/components/review-awards.css';
import '../styles/components/review-banner.css';
import '../styles/components/explore-work.css';
import '../styles/components/blog-detail-content.css';
import '../styles/pages/_app.css';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../public/static/css/main.10710fc3.css";
import { fetchGeneralSettings } from './api/fetchData';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';



// const Header = dynamic(() => import('@/components/Header'), { 
//   ssr: false,
//   loading: () => null 
// })


export default function App({ Component, pageProps }) {
  const [generalData, setGeneralData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGeneralSettings();
      setGeneralData(data);
    };

    fetchData(); 
  }, []); 

  

  
  return (
    <>
      <Header
        logo={generalData?.header_white_logo}
        header_black_logo={generalData?.header_black_logo}
        button_text={generalData?.header_button_text}
        button_url={generalData?.header_button_url}
        main_menu={generalData?.main_menu}
        industry_menu={generalData?.industry_menu}
        services_menu={generalData?.services_menu}
        ApiData={{...pageProps}}
      />

      <Component
        logo={generalData?.header_white_logo}
        header_black_logo={generalData?.header_black_logo}
        button_text={generalData?.header_button_text}
        button_url={generalData?.header_button_url}
        main_menu={generalData?.main_menu}
        industry_menu={generalData?.industry_menu}
        services_menu={generalData?.services_menu}
        additional_css={generalData?.additional_css}
        {...pageProps}
      />

      <Footer 
        ApiData={generalData}
         />
    </>
  );
}











