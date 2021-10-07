import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const config = {
  CONTENTFUL: {
    SPACE: '',
    TOKEN: '',
  },
}

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${config.CONTENTFUL.SPACE}/environments/master`,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${config.CONTENTFUL.TOKEN}`,
  },
}));

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;