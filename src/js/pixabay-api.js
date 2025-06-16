import axios from 'axios';
const API_KEY = '23587423-82924c7bf0de5f5bd871046c4';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('❌ Axios error:', error);
    throw error;
  }
}
