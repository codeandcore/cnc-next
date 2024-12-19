const env = process.env.NODE_ENV;
const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const res = await fetch(endpoint, {
      ...options,
      next: { 
        revalidate: options.revalidate || 3600, // 1 hour cache by default
        tags: options.tags || ['api-fetch'] // Optional cache tags
      }
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
  const endpoints = [
    `${process.env.NEXT_PUBLIC_API_URL}/options/all`,
    `${process.env.NEXT_PUBLIC_API_URL}/general-setting`,
    `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/settings`
  ];

  for (const endpoint of endpoints) {
    const result = await fetchFromAPI(endpoint, {
      tags: ['general-settings']
    });
    if (result) return result;
  }

  return null;
};

// Fetch Home Page
export const fetchHomePage = async () => {
  const endpoint = process.env.NEXT_PUBLIC_ENV
    ? `${process.env.NEXT_PUBLIC_API_URL}/pages/home`
    : `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/7`;

  return await fetchFromAPI(endpoint, {
    tags: ['home-page']
  });
};

// Fetch Contact Page
export const fetchContactPage = async () => {
  const endpoint = process.env.NEXT_PUBLIC_ENV
    ? `${process.env.NEXT_PUBLIC_API_URL}/pages/contactus`
    : `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/1282`;

  return await fetchFromAPI(endpoint, {
    tags: ['contact-page']
  });
};

// Fetch Career Page
export const fetchCareerPage = async () => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/pages/655`;
  return await fetchFromAPI(endpoint, {
    tags: ['career-page']
  });
};