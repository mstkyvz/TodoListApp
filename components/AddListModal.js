//This Component Renders the modal when users click add Projects

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput


} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from './Colors'
import tempData from './tempData'
import Colors from './Colors'

export default class AddListModal extends React.Component {

    //Array containing all colors
    backgroundColors = ["#D88559", "#5CD859", "#D85963", "#24A6D9", "#D159D8", "#5958D9", "#8022D9"]

    //variable state
    state = {
        name: "",
        color: this.backgroundColors[0],
        createAlert: null
    };
    //renderColor method to render all colors as boxes (clickable) for user to pick
    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        })
    }

    //Create List pushes Name of Project to New Project
    createTodo = () => {

        if (this.state.name.length < 1) {
            // alert("Project Name Cannot be Empty")
            this.setState({ createAlert: "Project Name Cannot be Empty !!" });
        }
        else {
            //constant
            const { name, color } = this.state
            const list = { name, color };

            this.props.addList(list)
            //set name as default
            this.setState({ name: "" });
            this.setState({ createAlert: null });

            //close modal
            this.props.closeModal();
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 14, right: 12 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>

                    <Text style={styles.title}> Create Project</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Project Name"
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <Text style={styles.createAlert}>
                        {this.state.createAlert}
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        {this.renderColors()}
                    </View>


                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}

                    >
                        <Text style={{ color: colors.white, fontWeight: "600" }}>
                            Create..
                            </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    createAlert: {
        textAlign: "center",
        color: Colors.red
    }
});   