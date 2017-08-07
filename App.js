import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const App = (props)  => {
    const { navigate } = props.navigation;

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to STAR WARS WORLD!
            </Text>
            <Button
                onPress={() => navigate('NextScreen')}
                title="The force will be with you!"
            />
        </View>
    );
}

export default App

