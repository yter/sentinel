import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
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
});



class NextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {detail: ''};
    this._fetchListing = this._fetchListing.bind(this);
    }
    componentDidMount() {
        //this._fetchListing();
    }

    _fetchListing() {
        const {state} = this.props.navigation;
        // Get listing details
        let url = 'https://swapi.co/api/'+state.params.info+'/1/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {this.setState({detail: data.name})})
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
          console.log(this.state.detail);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.detail}
                </Text>
            </View>
        );
    }
}

NextScreen.navigationOptions = {
    title: 'UNIVERSE',
    info: ''
};

export default NextScreen