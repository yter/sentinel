import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    PickerIOS,
    Dimensions,
    Platform,
} from 'react-native';

let PickerItemIOS = PickerIOS.Item;
let SCREEN_WIDTH = Dimensions.get('window').width;

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
    containerStyle: {
        borderWidth: 1,
        borderColor: '#cecece',
        padding: 10
    },
    textStyle: {
        fontSize: 18
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {info: 'people'};
    }
    render(){
    let options = [{label: 'People', value: 'people'},{label: 'Films', value: 'films'},{label: 'Starships', value: 'starships'},{label: 'Vehicles', value: 'vehicles'},{label: 'Planets', value: 'planets'}];
    const { setParams, navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to STAR WARS WORLD! What Information do you want to know?
            </Text>
            <PickerIOS
                selectedValue={this.state.info}
                onValueChange={(option) => this.setState({info: option})}
                style={styles.bottomPicker}
                ref={'picker'}
            >
                {options.map((option, i) => {
                    return (
                        <PickerItemIOS
                            key={i}
                            value={option.value}
                            label={option.label}
                        />
                    )
                })}
            </PickerIOS>
            <Text>I want to know about {this.state.info}!</Text>
            <Button
                onPress={() => navigate('NextScreen', {info: this.state.info})}
                title="The force will be with you!"
            />
        </View>
    );
}
}

export default App

