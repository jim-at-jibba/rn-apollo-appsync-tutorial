import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from "aws-amplify-react-native";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

import CreateTodo from './components/createTodo';
import ListTodos from './components/listTodos';

Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});


class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <View style={styles.container}>
            <Text style={styles.header}>Todos</Text>
            <View style={{flex: 1, width: '100%'}}>
              <ListTodos />
            </View>
            <View style={{ flex: 1, width: '100%'}}>
              <CreateTodo />
            </View>
          </View>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    padding: 40
  },
  header: {
    fontSize: 18
  }
});

export default withAuthenticator(App, true)
