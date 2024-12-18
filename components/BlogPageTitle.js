import { useEffect, useState } from 'react';
import '../styles/BlogPageTitle.css';

const BlogPageTitle = ({
  blog_heading,
  blog_content,
  blog_all_categories_label,
  blogCount,
  BASE_URL,
}) => {
  const [catData, setCatData] = useState(null);
  const [blogsData, setBlogsData] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/wp-json/wp/v2/categories`)
      .then((response) => response.json())
      .then((data) => setCatData(data))
      .catch((error) =>
        console.error('Error fetching categories from WordPress API:', error)
      );
  }, [BASE_URL]);

  const fetchBlogs = (category = null, page = 1) => {
    let url = `${BASE_URL}/wp-json/wp/v2/posts?per_page=9&page=${page}`;
    if (category) {
      url += `&categories=${category}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setBlogsData(data))
      .catch((error) =>
        console.error('Error fetching blogs from WordPress API:', error)
      );
  };

  useEffect(() => {
    fetchBlogs();
  }, [BASE_URL]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1); 
    fetchBlogs(category, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBlogs(currentCategory, page);
  };

  return (
    <div className="blog_page_title">
      <div className="wrapper d_flex">
        <div className="left_col">
          {blog_heading && (
            <h1>
              {blog_heading} <span>{blogCount}</span>
            </h1>
          )}
          {blog_content && (
            <p
              dangerouslySetInnerHTML={{ __html: blog_content }}
            ></p>
          )}
        </div>
        {catData && (
          <ul className="right_col d_flex">
            {blog_all_categories_label && (
              <li
                className={`category ${
                  currentCategory === null ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(null)}
              >
                {blog_all_categories_label}
              </li>
            )}
            {catData.map((cat) => (
              <li
                key={cat.id}
                className={`category ${
                  currentCategory === cat.id ? 'active' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: cat.name }}
                onClick={() => handleCategoryChange(cat.id)}
              ></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogPageTitle;
