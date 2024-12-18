import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import "react-owl-carousel2/src/owl.carousel.css";
import DateIcon from '../public/images/date.svg';
import dynamic from 'next/dynamic';
// import UseOnScreen from './UseOnScreen';

const OwlCarousel = dynamic(() => import('react-owl-carousel2'), { ssr: false });


const Highlights = ({
  our_blogs_title,
  our_blogs_subtitle,
  our_blogs,
}) => {
  const router = useRouter();
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const owlCarouselRef = useRef(null);
  // const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  const handleTranslated = () => {
    if (owlCarouselRef.current && owlCarouselRef.current.props) {
      const itemCount = owlCarouselRef.current.props.children.length - 3;
      const currentIndex = owlCarouselRef.current.currentPosition;

      setIsPrevDisabled(currentIndex === 0);
      setIsNextDisabled(currentIndex === itemCount);
    }
  };

  const options = {
    items: 4,
    loop: false,
    nav: true,
    dots: false,
    autoWidth: true,
    onTranslated: handleTranslated,
  };

  const dateFormatCnc = (postDate) => {
    const date = new Date(postDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    handleTranslated();
  }, [owlCarouselRef]);

  return (
    <div className="our_highlights">
      <div className='wrapper'>
        {our_blogs_title && <h2>{our_blogs_title}</h2>}
        {our_blogs_subtitle && <p>{our_blogs_subtitle}</p>}
      </div>
      <div className='inner'>
        {our_blogs && our_blogs.length > 0 ? (
          <OwlCarousel options={options} ref={owlCarouselRef}>
            {our_blogs.map((item, index) => (
              <div className='col' key={index}>
                <Link href={`/blog/${item.post_name}`} className='img'>
                  <div className='bg' style={{ backgroundImage: `url(${item.featured_image_url})` }}></div>
                </Link>
                <div className='text'>
                  <div className='btn_col d_flex'>
                    <Link href={`/blog/${item.post_name}`} className='btnmix'>
                      <em dangerouslySetInnerHTML={{ __html: item.categories_names }}></em>
                    </Link>
                    <span className='date'><img src={DateIcon.src} alt="Date Icon" /> {dateFormatCnc(item.post_date)}</span>
                  </div>
                  <Link href={`/blog/${item.post_name}`} className='link'>
                    {item.post_title}
                  </Link>
                  <label className='d_flex'>By <Link href={`/blog/${item.post_name}`}>{item.author_name}</Link><span>{item.relative_modified_date}</span></label>
                </div>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <div>No blogs available</div>
        )}
      </div>
    </div>
  );
};

export default Highlights;
