import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  const baseURL =
    process.env.ENVIRONMENT === "PRODUCTION"
      ? process.env.SERVER
      : process.env.LOCAL_BACKEND;
  return `${baseURL}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @param {Object} multi Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(
  path = "",
  urlParamsObject = {},
  options = {},
  multi = ''
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    ...options,
  };
  console.log(mergedOptions);

  // Build request URL
  let queryString = qs.stringify(urlParamsObject);
  if (multi) {
    if (queryString) {
      queryString = queryString + `&filters[type][$containsi]=${multi}`;
    } else {
      queryString = `filters[type][$containsi]=${multi}`;
    }
  }
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;
  // Trigger API call
  console.log(requestUrl);

  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.log(requestUrl, "yyy555");
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
