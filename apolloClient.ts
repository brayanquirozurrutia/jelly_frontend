import {ApolloClient, createHttpLink, from, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const CSRF_URL = import.meta.env.VITE_CSRF_URL as string;

// Obtener el CSRF Token de las cookies
const getCsrfToken = () => {
    const match = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return match ? match.split('=')[1] : '';
};

// Verificar si el CSRF Token es válido
const isCsrfTokenValid = () => {
    const csrfToken = getCsrfToken();
    return !!csrfToken;
};

// Obtener un nuevo token CSRF si no es válido
const fetchCsrfToken = async () => {
    const response = await fetch(`${API_URL}${CSRF_URL}`,{ credentials: 'include' });
    if (response.ok) {
        return getCsrfToken();
    }
    throw new Error('Failed to fetch CSRF token');
};

// Configuración del enlace HTTP
const httpLink = createHttpLink({
    uri: `${API_URL}graphql`,
    credentials: 'include',
});

// Configuración del contexto para incluir el token CSRF
const authLink = setContext(async (_, { headers }) => {
    let csrfToken = getCsrfToken();

    if (!isCsrfTokenValid()) {
        csrfToken = await fetchCsrfToken();
    }

    return {
        headers: {
            ...headers,
            'X-CSRFToken': csrfToken,
        },
    };
});

// Middleware para manejar errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(
            ({
                 message,
                 locations,
                 path
            }) => {
            console.error('[GraphQL error]: Message:', message, 'Location:', locations, 'Path:', path);
        });
    }

    if (networkError) {
        console.error('[Network error]');
    }
});

// Crear el cliente Apollo
const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;
