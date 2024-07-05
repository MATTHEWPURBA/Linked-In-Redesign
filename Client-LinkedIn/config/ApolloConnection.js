import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://server-linkedin.jobsearch.my.id/",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      // nah j adi headers ini  dibuat dari authLink
      // headers ini yang berfungsi untuk oper hasil
      // dari decrypt accessToken
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // nah ini juga untuk mengisi Authorization
      // bearer token yang sebelumnya diisi manual
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
// nah karena ini udah di oper langsung ke TabNavigator,
// jadi dari si Query nya gaperlu tambahan apapun
