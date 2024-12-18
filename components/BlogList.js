import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import blogImg1 from '../public/images/blogImg1.png';
import dateIcon from '../public/images/dateIcon.svg';
import cncIcon from '../public/images/cnc-icon.svg';
import rotateRight from '../public/images/rotate-right.png';
const BlogList = ({
  blog_heading,
  blog_content,
  blog_all_categories_label,
  BASE_URL,
}) => {
  const [catData, setCatData] = useState(null);
  const [blogData, setBlogsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const blogsListRef = useRef(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    fetch(`${BASE_URL}/wp-json/wp/v2/categories`)
      .then((response) => response.json())
      .then((data) => setCatData(data))
      .catch((error) =>
        console.error('Error fetching categories from WordPress API:', error)
      );
  }, [BASE_URL]);

  const fetchBlogs = (category = null, page = 1) => {
    if (loadingRef.current) return;
    setIsLoading(true);
    loadingRef.current = true;

    let url = `${BASE_URL}/wp-json/wp/v2/posts?per_page=9&page=${page}`;
    if (category) {
      url += `&categories=${category}`;
    }
    fetch(url)
      .then((response) => {
        setTotalPosts(parseInt(response.headers.get('X-Wp-Total')));
        setTotalPages(parseInt(response.headers.get('X-Wp-Totalpages')));
        return response.json();
      })
      .then((data) => {
        const transformedData = [];
        for (let i = 0; i < data.length; i += 3) {
          const mainPost = {
            id: data[i].id,
            slug: data[i].slug,
            categories_names: data[i].categories_names,
            title: data[i].title.rendered,
            image: data[i].featured_image_url || blogImg1,
            date: new Date(data[i].date).toLocaleDateString('en-GB'),
            author: data[i].author_name || 'Codeandcore',
            duration: data[i].human_time_diff,
            link: data[i].link,
            innerdata: [],
          };

          for (let j = 1; j <= 2; j++) {
            if (i + j < data.length) {
              mainPost.innerdata.push({
                id: data[i + j].id,
                slug: data[i + j].slug,
                categories_names: data[i + j].categories_names,
                title: data[i + j].title.rendered,
                image: data[i + j].featured_image_url || blogImg1,
                date: new Date(data[i + j].date).toLocaleDateString('en-GB'),
                author: data[i + j].author_name || 'Codeandcore',
                duration: data[i + j].human_time_diff,
                link: data[i + j].link,
              });
            }
          }
          transformedData.push(mainPost);
        }
        setBlogsData((prevBlogs) => [...prevBlogs, ...transformedData]);
        loadingRef.current = false;
      })
      .catch((error) => {
        console.error('Error fetching data from WordPress API:', error);
        loadingRef.current = false;
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, [BASE_URL]);

  useEffect(() => {
    const handleScroll = () => {
      if (blogsListRef.current) {
        const blogsBottom = blogsListRef.current.getBoundingClientRect().bottom + 100;
        if (blogsBottom <= window.innerHeight && !loadingRef.current && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchBlogs(currentCategory, currentPage);
  }, [currentPage, currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    setBlogsData([]);
    fetchBlogs(category, 1);
  };

  return (
    <div className="blog_main" ref={blogsListRef}>
      <div className="blog_page_title">
        <div className="wrapper d_flex">
          <div className="left_col">
            {blog_heading && (
              <h1>
                {blog_heading} <span>{totalPosts}</span>
              </h1>
            )}
            {blog_content && (
              <p dangerouslySetInnerHTML={{ __html: blog_content }}></p>
            )}
          </div>
          {catData && (
            <ul className="right_col d_flex">
              {blog_all_categories_label && (
                <li
                  className={`category ${currentCategory === null ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(null)}
                >
                  {blog_all_categories_label}
                </li>
              )}
              {catData.map((cat) => (
                <li
                  key={cat.id}
                  className={`category ${currentCategory === cat.id ? 'active' : ''}`}
                  dangerouslySetInnerHTML={{ __html: cat.name }}
                  onClick={() => handleCategoryChange(cat.id)}
                ></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="loader_blog">
          <img src={rotateRight.src} alt="Loading" />
        </div>
      )}
      <div className="blog_section">
        <div className="wrapper">
          {blogData.map((blog) => (
            <div key={blog.id} className="blog_row">
              <div className="blog_list">
                <Link href={`/blog/${blog.slug}`} className="blog_img">
                  <img style={{objectFit:'contain'}}  
                     src={blog.image} alt={blog.title} />
                </Link>
                <div className="blog-content">
                  <div className="blog_info d_flex">
                    <div className="col-left d_flex">
                      <a href={blog.link} className="btnmix">
                        <em
                          dangerouslySetInnerHTML={{ __html: blog.categories_names }}
                        ></em>
                      </a>
                      <span className="date">
                        <img src={dateIcon.src} alt="date_icon" /> {blog.date}
                      </span>
                    </div>
                    <div className="col-right">
                      <label className="d_flex">
                        <img src={cncIcon.src} alt="time_icon" /> By{' '}
                        <a href="#">{blog.author}</a>
                        <span>{blog.duration}</span>
                      </label>
                    </div>
                  </div>
                  <h3>
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title.replace(/<\/?br\s*\/?>/gi, ' ')}
                    </Link>
                  </h3>
                </div>
              </div>
              <div className="blog_list">
                {blog.innerdata.map((innerItem) => (
                  <div key={innerItem.id} className="blog_small">
                    <Link href={`/blog/${innerItem.slug}`} className="blog_img">
                      <img  src={innerItem.image} alt={innerItem.title} />
                    </Link>
                    <div className="blog-content">
                      <div className="blog_info d_flex">
                        <div className="col-left d_flex">
                          <a href={innerItem.link} className="btnmix">
                            <em
                              dangerouslySetInnerHTML={{ __html: innerItem.categories_names }}
                            ></em>
                          </a>
                          <span className="date">
                            <img src={dateIcon.src} alt="date_icon" /> {innerItem.date}
                          </span>
                        </div>
                      </div>
                      <h3>
                        <Link href={`/blog/${innerItem.slug}`}>{innerItem.title}</Link>
                      </h3>
                      <div className="col-right">
                        <label className="d_flex">
                          <img  src={cncIcon.src} alt="time_icon" /> By{' '}
                          <a href="#">{innerItem.author}</a>
                          <span>{innerItem.duration}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
