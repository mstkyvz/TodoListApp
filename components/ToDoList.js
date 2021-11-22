//ToDo List
import React from 'react';
//Elements from React-Native
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native'
//External Components
import Colors from './Colors'
import TodoModal from './ToDoModal'
import Firebase from '../Fire'
import AwesomeAlert from 'react-native-awesome-alerts';


export default class ToDoProjects extends React.Component {

    state = {
        showListVisible: false,
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }


    render() {
        //Variables containing Completed and Remaing Values based on todo Array Length
        //Completed based on true from todo list
        //Remaining total todo - completed
        //list contains the list passed from MainWindow as parameter
        const list = this.props.list
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;
        return (
            <View>
                
                <Modal
                    animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal
                        list={list}
                        closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList}
                    />
                </Modal>

                <TouchableOpacity
                    style={[styles.listContainer, { backgroundColor: list.color }]}
                    onPress={() => this.toggleListModal()}
                    onLongPress={() => this.props.toggleShowAlert(list)}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

        )

    }


};

//StyleSheets Used
const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },

    test: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }

})