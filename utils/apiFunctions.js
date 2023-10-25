import axios from 'axios';

const fetchData = async ({ url }) => {
 
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Error performing Axios GET method: ' + error);
    return 'Failed';
  }
};

const postData = async ({ url, body}) => {
  
  try {
    const response = axios.post(url, body);
    return response;
  } catch (error) {
    console.log('Error performing Axios POST method: ' + error);
    return 'Failed';
  }
};

export { fetchData, postData };
