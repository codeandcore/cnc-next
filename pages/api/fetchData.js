// Get the current environment
const env = process.env.NODE_ENV;

// Reusable function to fetch data from an API
const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const res = await fetch(endpoint, {
      ...options,
      next: {
        revalidate: options.revalidate || 3600, // Default to 1 hour cache
        tags: options.tags || ['api-fetch'],   // Default cache tags
      },
    });

    if (res.ok) {
      return await res.json();
    } else {
      console.error(`Failed to fetch from ${endpoint}: ${res.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
  }

  return null;
};

// Fetch General Settings
export const fetchGeneralSettings = async () => {
  const endpoint = env !== "development"
    ? `/data/general-setting`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all`;

  const result = await fetchFromAPI(endpoint, {
    tags: ['general-settings'],
  });

  return result || null;
};

// Fetch Home Page
export const fetchHomePage = async () => {
  const endpoint = env !== "development"
    ? `/data/pages`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`;

  return await fetchFromAPI(endpoint, {
    tags: ['home-page'],
  });
};

// Fetch Contact Page
export const fetchContactPage = async () => {
  const endpoint = env !== "development"
    ? `/data/pages`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`;

  return await fetchFromAPI(endpoint, {
    tags: ['contact-page'],
  });
};

// Fetch Career Page
export const fetchCareerPage = async () => {
  const endpoint = env !== "development"
    ? `/data/pages/career`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/655`;

  return await fetchFromAPI(endpoint, {
    tags: ['career-page'],
  });
};
