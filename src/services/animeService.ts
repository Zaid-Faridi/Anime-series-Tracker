import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const AnimeService = {
    getTopAnime: async () => {
        try {
            const response = await api.get('/top/anime');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching top anime:', error);
            return [];
        }
    },
    getTrendingAnime: async () => {
        try {
            const response = await api.get('/seasons/now');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching trending anime:', error);
            return [];
        }
    },
    searchAnime: async (query: string) => {
        try {
            const response = await api.get(`/anime?q=${query}`);
            return response.data.data;
        } catch (error) {
            console.error('Error searching anime:', error);
            return [];
        }
    },
};
