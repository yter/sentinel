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



class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {detail: {}};
    this._fetchListing = this._fetchListing.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderPeople = this._renderPeople.bind(this);
    }

    componentDidMount() {
        this._fetchListing();
    }

    _fetchListing(next=false) {
        const {state} = this.props.navigation;
        let url = '';
        // Get listing details
        if (next) {
            url = next;
        } else {
            url = state.params.info;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {console.log(data); this.setState({detail: data})})
            .catch((error) => {
                console.error(error);
            });
    }

    _renderPeople(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = '';
        if (dat) {
            dates = (
                <View style={styles.container}>
                    <Text>Name: {dat.name}</Text>
                    <Text>Height: {dat.height}</Text>
                    <Text>Mass: {dat.mass}</Text>
                    <Text>Hair color: {dat.hair_color}</Text>
                    <Text>Skin color: {dat.skin_color}</Text>
                    <Text>Eye color: {dat.eye_color}</Text>
                    <Text>Birthday: {dat.birth_year}</Text>
                    <Text>Gender: {dat.gender}</Text>
                    <Button
                        onPress={() => navigate('DetailScreen', {info: dat.homeworld, base: "planets"})}
                        title="Home world"
                    />
                </View>
            );
        } else {
            return null;
        }

        return dates;
    }

    _renderPlanets(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View style={styles.container}>
                <Text>Name: {dat.name}</Text>
                <Text>Rotation period: {dat.rotation_period}</Text>
                <Text>orbital_period: {dat.orbital_period}</Text>
                <Text>diameter: {dat.diameter}</Text>
                <Text>climate: {dat.climate}</Text>
                <Text>gravity: {dat.gravity}</Text>
                <Text>terrain: {dat.terrain}</Text>
                <Text>surface_water: {dat.surface_water}</Text>
                <Text>population: {dat.population}</Text>
            </View>
        );

        return dates;
    }

    _renderInfo() {
        let data = this.state.detail;
        let base = this.props.navigation.state.params.base;
        switch (base) {
            case 'people':
            return this._renderPeople(data);
            break;

            case 'planets':
            return this._renderPlanets(data);
            break;

            default:
                console.log('go back young jedi!')

        }
    }



    render() {
      return (
        <View style={styles.container}>
            {this._renderInfo()}
        </View>
      );
    }
}

DetailScreen.navigationOptions = {
    title: 'DetailScreen',
    info: ''
};

export default DetailScreen