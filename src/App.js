import React from 'react';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const graphQLClient = new ApolloClient({
  uri: 'https://graphql-jenkins.g4v.dev/graphql/',
  // credentials: 'include'
});

const graphQLStr = `query {
     allItems {
         name
         id
         url
         fullDisplayName
         ... on hudson_model_Job {
             color
             healthReport {
                 _class
                 iconClassName
                 description
                 iconUrl
                 score
             }
         }
     }
 }`;
const query = gql(graphQLStr);


function App() {
  return (
    <ApolloProvider client={graphQLClient}>
      <div className="App">
        <header className="App-header">
        </header>
        <pre><xmp>{ graphQLStr }</xmp></pre>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading data from Apollo Client...</p>;

            return <pre><xmp>{JSON.stringify({ loading, error, data }, null, "\t")}</xmp></pre>;
          }}
        </Query>

        <a href="https://github.com/halkeye/graphql-apollo-test">Github Source</a>
      </div>
    </ApolloProvider>
  );
}

export default App;
