import React from 'react'
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const LIST_TODOS_QUERY = gql`
  query LIST_TODOS_QUERY {
    listTodos {
      items {
        id
        name
        description
        completed
      }
    }
  }
`;

const ListTodos = () => {
  return (
    <Query query={LIST_TODOS_QUERY}>
      {({ data: { listTodos }, error, loading }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>{error.message}</Text>
        console.log("TODOS", listTodos);
        return (
          <FlatList
            keyExtractor={(item, index) =>
                index.toString()
            }
            data={listTodos.items}
            renderItem={({ item }) => {
              console.log("TODO", item);
              return (
                <TouchableOpacity key={item.id}>
                  <View style={{ padding: 10 }}>
                    <View>
                      <Text>
                        <Text>{item.name} - </Text>
                        <Text>{item.description}</Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        );
      }}

    </Query>
  );
}

export default ListTodos;
export { LIST_TODOS_QUERY }
