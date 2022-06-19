import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  split,
  from
} from "@apollo/client";
import { getMainDefinition } from 'apollo-utilities'
import { onError } from '@apollo/client/link/error'
import UserStatus from './UserStatus';
import UserStatusUpdates from './UserStatusUpdates';
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import ServerUpdates from './ServerUpdates';


function App() {
    
  const auth = {
    type: "API_KEY",
    apiKey: process.env.REACT_APP_APPSYNC_API_KEY
  };

  const url = process.env.REACT_APP_APPSYNC_URL
  const region = 'us-east-1'
  const httpLink = new HttpLink({ uri: url });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const handleErrorLink = onError(({a, b, c, d}) => {
    console(a,b,c,d);
  })

  const client = new ApolloClient({link: from([
    handleErrorLink,
    link
  ]),
  cache: new InMemoryCache()});

  return (
    <div className="App">
      <header className="App-header">

        <ApolloProvider client={client}>
          <UserStatus />
          <UserStatusUpdates />
          <ServerUpdates />
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;