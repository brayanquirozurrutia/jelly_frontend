
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

async function fetchCsrfToken() {
    const response = await fetch('http://localhost:8000/jelly/v1/authentication/csrf-token/', {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
    const csrfToken = await fetchCsrfToken();

    return {
        headers: {
            ...headers,
            'X-CSRFToken': csrfToken || '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
