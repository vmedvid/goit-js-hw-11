import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export class PixabayAPI {
  #API_KEY = '34729074-3827824f208858ff842e5fedb';
  #BASE_URL = 'https://pixabay.com/api/';

  query = null;
  page = 1;
  perPage = 40;

  baseSearchParams = {
    key: this.#API_KEY,
    per_page: this.perPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  async getImages() {
    const response = await axios.get(`${this.#BASE_URL}`, {
      params: {
        q: this.query,
        page: this.page,
        ...this.baseSearchParams,
      },
    });
    Loading.standard();
    return await response.data;
  }
}
