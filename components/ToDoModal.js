import { Swipeable } from 'react-native-gesture-handler'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
//ToDo List
import React from 'react';
//Elements from React-Native
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    Animated
} from 'react-native'

//External Components
import colors from './Colors'


import { AntDesign, Ionicons } from '@expo/vector-icons';

export default class ToDoModal extends React.Component {

    state = {
        newTodo: ""
    }

    toggleToDOCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list)
    }

    renderTodo = (todo, index) => {
        return (
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleToDOCompleted(index)}>
                        <Ionicons
                            name={todo.completed ? "ios-square" : "ios-square-outline"}
                            size={24}
                            color={colors.gray}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.todo,
                            {
                                color: todo.completed ? colors.gray : colors.black,
                                textDecorationLine: todo.completed ? "line-through" : "none",
                            }
                        ]}
                    >
                        {todo.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.deleteToDo(index)}
                        style={{ position: "absolute", right: 1, zIndex: 10, borderWidth: 1, borderColor: 'red', borderRadius: 22 }}
                    >
                        <AntDesign name={"close"} size={24} color={colors.black} />
                    </TouchableOpacity>
                </View>
            </Swipeable>
        )
    }

    rightActions = (dragX, index) => {
        return (
            <TouchableOpacity>
                <Animated.View>
                    <Animated.Text>
                        Delete
                 </Animated.Text>
                </Animated.View>
            </TouchableOpacity>

        )
    }

    deleteToDo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);
        this.props.updateList(list);

    }

    addToDO = () => {
        // alert("Hello")

        if (this.state.newTodo.length < 1) {
            alert("Task Cannot Be Empty")
        }
        else {
            let list = this.props.list
            list.todos.push({ title: this.state.newTodo, completed: false })

            this.props.updateList(list)
            this.setState({ newTodo: "" })
            Keyboard.dismiss()
        }
    }

    render() {

        const list = this.props.list
        const taskCount = list.todos.length
        const completedCount = list.todos.filter(todo => todo.completed).length

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.closeModal}
                    style={{ position: "absolute", top: 44, right: 18, zIndex: 10 }}
                >
                    <AntDesign name={"close"} size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: list.color }]} >
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} Tasks
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList
                        data={list.todos}
                        renderItem={({ item, index }) => this.renderTodo(item, index)}
                        keyExtractor={item => item.title}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        showsVerticalScrollIndicator={false}
                    />


                </View>

                <View style={[styles.section, styles.footer]} >
                    <TextInput
                        style={[styles.input, { borderColor: list.color }]}
                        onChangeText={text => this.setState({ newTodo: text })}
                        value={this.state.newTodo}

                    />


                    <TouchableOpacity
                        style={[styles.addToDO, { backgroundColor: list.color }]}
                        onPress={() => this.addToDO()}
                    >
                        <AntDesign name="plus" size={16} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 6

    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addToDO: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16

    }
});