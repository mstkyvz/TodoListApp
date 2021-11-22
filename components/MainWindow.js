import React from 'react';
//Importing Elements from React-Native
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator

} from 'react-native';

//Using AntDesign Module
import { AntDesign } from '@expo/vector-icons'

//External Components
import Colors from './Colors.js';
import tempData from './tempData';
import TodoList from './ToDoList'
import AddToDoList from './AddListModal'
import AwesomeAlert from 'react-native-awesome-alerts';

import Fire from '../Fire'

export default class Main extends React.Component {

  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
    showAlert: false,
    listTemp: {}
  }

  //this is lifeCycle Method that runs when the component is loaded/rendered
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Hmmm , Something Went Wrong");
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });

        })
      })
      console.log(user.uid)
      this.setState({ user })
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  //Make Modal Visible & !Visible when Add Projects is pressed
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }

  //Method that renders all the list of projects
  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList} toggleShowAlert={this.toggleShowAlert} />
  };

  //add New Todo Project
  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    });
  };

  //update entire List
  updateList = list => {
    firebase.updateList(list);
  };

  //show Alert and pass selected Project to temporay list
  toggleShowAlert = list => {
    this.setState({ showAlert: true })
    this.setState({ listTemp: list })
  }

  //Delete Project/List from Firebase
  deleteList = () => {
    firebase.deleteList(this.state.listTemp);
    this.setState({ showAlert: false })
    this.setState({ listTemp: {} })
  };

  //Hide Alert
  toggleHideAlert = () => {
    this.setState({ showAlert: false })
  }

  //Render
  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddToDoList closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>



        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.Title}>
            My <Text style={{ fontWeight: "300", color: Colors.blue }}>Projects</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>

          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={Colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add Projects</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              this.renderList(item)
            )}
            keyboardShouldPersistTaps="always"

          />
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Delete Project"
          message={"Do you want to Delete Project " + this.state.listTemp.name + "!"}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.toggleHideAlert();
          }}
          onConfirmPressed={() => {
            this.deleteList();
          }}
        />
      </View>
    );
  }
}

//StylSheet Used For MainWindow
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  divider: {
    backgroundColor: Colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  Title: {
    fontWeight: "bold",
    fontSize: 28,
    color: Colors.black,
    paddingHorizontal: 64

  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",

  },
  add: {
    color: Colors.blue,
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 8

  },
});
