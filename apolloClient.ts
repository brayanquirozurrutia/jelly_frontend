import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;

const httpLink = createHttpLink({
    uri: `${API_URL}graphql`,
    credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(
            ({ message, locations, path }) => {
                console.error('[GraphQL error]: Message:', message, 'Location:', locations, 'Path:', path);
            }
        );
    }

    if (networkError) {
        console.error('[Network error]');
    }
});

export const createApolloClient = () => {
    return new ApolloClient({
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
        credentials: 'include',
    });
};
