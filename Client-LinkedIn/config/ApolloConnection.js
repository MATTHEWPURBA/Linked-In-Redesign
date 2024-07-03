import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://server-linkedin.jobsearch.my.id/",
  cache: new InMemoryCache(),
});
export default client;
