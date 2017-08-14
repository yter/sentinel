import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    PickerIOS,
    Dimensions,
    Platform,
    Image,
    TouchableHighlight
} from 'react-native';

let PickerItemIOS = PickerIOS.Item;
let SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: null,
        height: null
    },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
        color: 'blue',
        fontWeight: 'bold',

    },
    textStyle: {
        margin: 10,
        fontSize: 24,
        backgroundColor: 'transparent',
        color: '#32E20A',
        fontWeight: 'bold',
    },
    buttonStyle: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#32E20A'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    PickerIOS : {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 30,

    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {info: 'people'};
    }
    render(){
    let options = [{label: 'People', value: 'people'},{label: 'Films', value: 'films'},{label: 'Starships', value: 'starships'},{label: 'Vehicles', value: 'vehicles'},{label: 'Planets', value: 'planets'},{label: 'Species', value: 'species'}];
    const { navigate } = this.props.navigation;
    return (
        <Image source={require('./public/images/top.jpg')} style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to STAR WARS WORLD! What Information do you want to know?
            </Text>
            <PickerIOS
                selectedValue={this.state.info}
                onValueChange={(option) => this.setState({info: option})}
                style={styles.bottomPicker}
                itemStyle={styles.PickerIOS}
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
            <Text style={styles.textStyle}>I want to know about {this.state.info}!</Text>
            <TouchableHighlight
                style={styles.buttonStyle}
                onPress={() => navigate('NextScreen', {info: this.state.info})}
                title="The force will be with you!"
            >
              <Text style={styles.buttonText}>The force will be with you!</Text>
            </TouchableHighlight>
        </Image>
    );
}
}

export default App

