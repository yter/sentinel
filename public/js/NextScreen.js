import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Keyboard
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: null,
        height: null
    },
    welcome: {
        flexDirection: 'row'
    },
    search: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 10,
    },
    button: {
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#558B2F'
    },
    listItem: {
        margin: 5,
        padding: 5,
        borderColor: '#2d3400',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#4a55ce',
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    listText:{
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    input: {
        minWidth: 130,
        height: 30,
        color: 'white',
        backgroundColor: 'transparent',
        margin: 5,
        padding: 5,
        borderColor: '#2d3400',
        borderWidth: 1,
    },
    inputSubmit: {
        minWidth: 50,
        height: 30,
        margin: 5,
        padding: 5,
        color: 'white',
        backgroundColor: '#4a55ce',
        borderColor: '#2d3400',
        borderWidth: 1
    }
});

class NextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        detail: {}
    };
    this._fetchListing = this._fetchListing.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderNextButton = this._renderNextButton.bind(this);
    this._renderPreviousButton = this._renderPreviousButton.bind(this);
    }

    componentDidMount() {
        this._fetchListing();
    }

    _renderInfo(){
      const { navigate, state } = this.props.navigation;
      let data = this.state.detail.results;
      let dates = [];
      let buttons = null;
      if (data) {
          for (let i = 0; i < data.length; i++) {
              let obj = {};
              obj["name"] = data[i].name ? data[i].name: data[i].title;
              obj["url"] = data[i].url;
              dates.push(obj);
          }

          buttons = dates.map((data, i) =>
              <TouchableHighlight
                  key={i}
                  onPress={() => navigate('DetailScreen', {info: data.url, base: state.params.info})}
                  style={styles.listItem}
              >
                  <Text style={styles.listText}>{data.name}</Text>
              </TouchableHighlight>
          );
      }

      return buttons;
    }

    _renderNextButton() {
        let nextPage = this.state.detail.next;
        let button = '';
        if (nextPage) {
            button =(
            <TouchableHighlight
                onPress={() => this._fetchListing(nextPage)}
                style={styles.button}
            >
              <Text style={styles.buttonText}>Next page</Text>
            </TouchableHighlight>
            );
            return button;
        } else {
            return null;
        }
    }

    _renderPreviousButton() {
        let previousPage = this.state.detail.previous;
        let button = '';
        if (previousPage) {
            button =(
                <TouchableHighlight
                    onPress={() => this._fetchListing(previousPage)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Previous page</Text>
                </TouchableHighlight>);
            return button;
        } else {
            return null;
        }
    }

    _fetchListing(next=false) {
        const {state} = this.props.navigation;
        let a = state.params.text ? state.params.text: '';
        let url = '';
        // Get listing details
        if (next) {
            url = next;
        } else {
            url = 'https://swapi.co/api/' + state.params.info + '/'+'?search='+a;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {this.setState({detail: data})})
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
      const {setParams, state} = this.props.navigation;
      return (
        <Image source={require('../images/Next.jpg')} style={styles.container}>
            <View style={styles.search}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setParams({text: text})}
                value={state.params.text}
                placeholder="Search"
            />
            <TouchableHighlight
                onPress = {() => {this._fetchListing();Keyboard.dismiss();}}>
                <Text style={styles.inputSubmit}>
                    Submit
                </Text>
            </TouchableHighlight>
            </View>
           {this._renderInfo()}
           <View style={styles.welcome}>
             {this._renderPreviousButton()}
             {this._renderNextButton()}
           </View>
        </Image>
      );
    }
}

NextScreen.navigationOptions = {
    title: 'UNIVERSE',
    info: '',
    text: ''
};

export default NextScreen