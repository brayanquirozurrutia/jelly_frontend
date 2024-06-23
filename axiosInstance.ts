import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
}, error => {
    return Promise.reject(error);
});


function getCookie(name: string) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export default axiosInstance;
