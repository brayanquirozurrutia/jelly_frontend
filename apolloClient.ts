import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const CSRF_URL = import.meta.env.VITE_CSRF_URL as string;

async function fetchCsrfToken() {
    const response = await fetch(`${API_URL}${CSRF_URL}`, {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

const httpLink = createHttpLink({
    uri: `${API_URL}graphql`,
    credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
    const csrfToken = await fetchCsrfToken();
    const accessToken = getCookie('access_token');

    return {
        headers: {
            ...headers,
            'X-CSRFToken': csrfToken || '',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
