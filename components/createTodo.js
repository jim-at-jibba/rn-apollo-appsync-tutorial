import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LIST_TODOS_QUERY } from './listTodos'
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


class CreateTodo extends React.Component {
  state = {
    name: '',
    description: ''
  }

  render() {
    console.log(this.state)
    return (
      <Mutation mutation={CREATE_TODO_MUTATION} variables={{ ...this.state }} refetchQueries={[{query: LIST_TODOS_QUERY}]}>
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
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
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
                  onChangeText={text => this.setState({ description: text })}
                  value={this.state.description}
                />
              </View>
              <Button onPress={() => {
                createTodo()
                this.setState({ name: "", description: "" })
              }} title='Create Todo' />
            </View>
          );
        }}
      </Mutation>
    )
  }
}

export default CreateTodo;
