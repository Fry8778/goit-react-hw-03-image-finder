import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const api = async (query, page) => {
    const searchParams = new URLSearchParams({
        q: query,
        page,
        key: '28570265-dd79f6ce79ed9d2926b94f1d9',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });

    const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

    if (data.totalHits === 0) {
        Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            { timeout: 1500 }
        );
    }
    return data;
};


export default api;