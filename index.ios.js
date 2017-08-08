import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './App'
import { StackNavigator } from 'react-navigation';
import NextScreen from './public/js/NextScreen'

class reactNavigationSample extends Component {
    static navigationOptions = {
        title: 'Home Screen',
    };

    render(){
        const { navigation } = this.props;
        return (
            <App navigation={ navigation }/>
        );
    }
}

const sentinel = StackNavigator({
    Home: { screen: reactNavigationSample },
    NextScreen: { screen: NextScreen, title: 'next' },
});

AppRegistry.registerComponent('sentinel', () => sentinel);