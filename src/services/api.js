import axios from "axios"; 

export const createShortUrl = async (longUrl) => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL; // Retrieve API base URL from environment variables.
    console.log("API Base URL:", baseUrl);

    // Check if the API base URL is set; if not, log an error and return null.
    if (!baseUrl) {
      console.error("API Base URL is not defined in environment variables.");
      return null;
    }

    // Send a POST request to the backend to create a shortened URL.
    const response = await axios.post(`${baseUrl}/shorten`, { longUrl });
    console.log("response:", response);

    // If the response contains a valid short URL, return it.
    if (response.data && response.data.shortUrl) {
      return { existing: false, shortUrl: `${response.data.shortUrl}` };
    } 
    // If the backend returns that the URL already exists, return it with a flag.
    else if (response.data && response.data.message === "URL already exists") {
      return { 
        existing: true, 
        message: "URL already exists", 
        shortUrl: `${baseUrl}/${response.data.url.shortUrl}` 
      };
    } 
    // If the response structure is unexpected, log an error and return null.
    else {
      console.error("Unexpected response data:", response.data);
      return null;
    }
  } catch (error) {

    console.error("Error creating short URL:", error);
    return null;
  }
};
