import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';

const Images = {
    people: require('../images/people.jpg'),
    films: require('../images/main.png'),
    starships: require('../images/starships.jpg'),
    vehicles: require('../images/vehicles.png'),
    planets: require('../images/planets.jpg'),
    species: require('../images/species.jpg'),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: null,
        height: null
    },
    listItem: {
        margin: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'blue'
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
            .then((data) => {this.setState({detail: data})})
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
                <View>
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
            <View>
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

    _renderFilms(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text>Title: {dat.title}</Text>
                <Text>Episode_id: {dat.episode_id}</Text>
                <Text>Director: {dat.director}</Text>
                <Text>Producer: {dat.producer}</Text>
                <Text>Opening Crawl: {dat.opening_crawl}</Text>
                <Text>Release_date: {dat.release_date}</Text>
            </View>
        );

        return dates;
    }

    _renderStarships(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text>Name: {dat.name}</Text>
                <Text>Model: {dat.model}</Text>
                <Text>Manufacturer: {dat.manufacturer}</Text>
                <Text>Cost: {dat.cost_in_credits}</Text>
                <Text>Length: {dat.length}</Text>
                <Text>Max atmosphering speed: {dat.max_atmosphering_speed}</Text>
                <Text>Crew: {dat.crew}</Text>
                <Text>Passengers: {dat.passengers}</Text>
                <Text>Starship class: {dat.starship_class}</Text>
                <Text>Hyperdrive rating: {dat.hyperdrive_rating}</Text>
            </View>
        );

        return dates;
    }

    _renderVehicles(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text>Name: {dat.name}</Text>
                <Text>Model: {dat.model}</Text>
                <Text>Manufacturer: {dat.manufacturer}</Text>
                <Text>Cost: {dat.cost_in_credits}</Text>
                <Text>Length: {dat.length}</Text>
                <Text>Max atmosphering speed: {dat.max_atmosphering_speed}</Text>
                <Text>Crew: {dat.crew}</Text>
                <Text>Passengers: {dat.passengers}</Text>
                <Text>Vehicle class: {dat.vehicle_class}</Text>
            </View>
        );

        return dates;
    }

    _renderSpecies(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text>Name: {dat.name}</Text>
                <Text>Classification: {dat.classification}</Text>
                <Text>Designation: {dat.designation}</Text>
                <Text>Average height: {dat.average_height}</Text>
                <Text>Skin colors: {dat.skin_colors}</Text>
                <Text>Hair colors: {dat.hair_colors}</Text>
                <Text>Eye colors: {dat.eye_colors}</Text>
                <Text>Average lifespan: {dat.average_lifespan}</Text>
                <Text>Language: {dat.language}</Text>
                <Button
                    onPress={() => navigate('DetailScreen', {info: dat.homeworld, base: "planets"})}
                    title="Home world"
                />
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

            case 'films':
            return this._renderFilms(data);
            break;

            case 'starships':
            return this._renderStarships(data);
            break;

            case 'vehicles':
            return this._renderVehicles(data);
            break;

            case 'species':
            return this._renderSpecies(data);
            break;

            default:
              console.log('go back young jedi!')
        }
    }

    _renderImg() {
        let data = this.state.detail;
        let base = this.props.navigation.state.params.base;
        switch (base) {
            case 'people':
                return Images.people;
                break;

            case 'planets':
                return Images.planets;
                break;

            case 'films':
                return Images.films;
                break;

            case 'starships':
                return Images.starships;
                break;

            case 'vehicles':
                return Images.vehicles;
                break;

            case 'species':
                return Images.species;
                break;

            default:
                console.log('go back young jedi!')
        }
    }

    render() {
      let img = this._renderImg();

      return (
        <Image alt="" source={img} style={styles.container}>
            {this._renderInfo()}
        </Image>
      );
    }
}

DetailScreen.navigationOptions = {
    title: 'DetailScreen',
    info: ''
};

export default DetailScreen