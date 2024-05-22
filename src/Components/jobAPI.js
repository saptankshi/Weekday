// jobAPI.js

const fetchJobData = async (filters = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 500,
    "offset": 0,
    ...filters  // Include the filters in the request body
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };

  try {
    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

export default fetchJobData;
