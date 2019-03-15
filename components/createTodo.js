import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LIST_TODOS_QUERY } from './listTodos';

// Mutation
const CREATE_TODO_MUTATION = gql`
  mutation CREATE_TODO_MUTATION($name: String!, $description: String!) {
    createTodo(
      input: { name: $name, description: $description, completed: false }
    ) {
      name
      id
    }
  }
`;

/**
 * state = {
    name: '',
    description: ''
  }
 */
const CreateTodo = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    return (
      <Mutation
        mutation={CREATE_TODO_MUTATION}
        variables={{ name, description }}
        refetchQueries={[{ query: LIST_TODOS_QUERY }]}>
        {(createTodo, { data }) => {
          console.log("MUTATION DATA: ", data);
          return (
            <View style={{ flex: 1, width: "100%" }}>
              <View style={{ paddingBottom: 20 }}>
                <TextInput
                  placeholder='name'
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1
                  }}
                  onChangeText={text => setName(text)}
                  value={name}
                />
              </View>
              <View style={{ paddingBottom: 20 }}>
                <TextInput
                  style={{ paddingTop: 20 }}
                  placeholder='description'
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1
                  }}
                  onChangeText={text =>
                    setDescription(text)
                  }
                  value={description}
                />
              </View>
              <Button onPress={() => {
                createTodo()
                setName('')
                setDescription('')
                }} title='Create Todo' />
            </View>
          );
        }}
      </Mutation>
    );
  }

export default CreateTodo;
