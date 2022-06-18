import Axios from 'axios';

export const BaseAxios = Axios.create({
  baseURL: `http://localhost:8080/api`,
});
