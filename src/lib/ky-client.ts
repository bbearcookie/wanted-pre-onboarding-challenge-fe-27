import { LOCAL_STORAGE_KEYS } from '@/constants/storage-keys';
import ky from 'ky';

const api = ky.create({
  prefixUrl: 'http://localhost:8080',
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export default api;
