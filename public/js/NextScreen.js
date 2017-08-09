import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 10,
        margin: 10,
    },
});



class NextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {detail: {}};
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
      let nextPage = this.state.detail.next;
      let dates = [];
      let buttons = null;
      if (data) {
          for (let i = 0; i < data.length; i++) {
              let obj = {};
              obj["name"] = data[i].name;
              obj["url"] = data[i].url;
              dates.push(obj);
          }

          buttons = dates.map((data, i) =>
              <Button
                  key={i}
                  onPress={() => navigate('DetailScreen', {info: data.url, base: state.params.info})}
                  title={data.name}
              />
          );
      }

      return buttons;
    }

    _renderNextButton() {
        let nextPage = this.state.detail.next;
        let button = '';
        if (nextPage) {
            button =(
            <Button
                onPress={() => this._fetchListing(nextPage)}
                title="Next page"
            />);
            return button;
        } else {
            return null;
        }
    }

    _renderPreviousButton() {
        let nextPage = this.state.detail.previous;
        let button = '';
        if (nextPage) {
            button =(
                <Button
                    onPress={() => this._fetchListing(nextPage)}
                    title="Previous page"
                />);
            return button;
        } else {
            return null;
        }
    }

    _fetchListing(next=false) {
        const {state} = this.props.navigation;
        let url = '';
        // Get listing details
        if (next) {
            url = next;
        } else {
            url = 'https://swapi.co/api/' + state.params.info + '/';
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {console.log(data); this.setState({detail: data})})
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
      return (
        <View style={styles.container}>
          {this._renderInfo()}
          {this._renderNextButton()}
          {this._renderPreviousButton()}
        </View>
      );
    }
}

NextScreen.navigationOptions = {
    title: 'UNIVERSE',
    info: ''
};

export default NextScreen