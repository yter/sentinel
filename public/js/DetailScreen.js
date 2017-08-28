import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableHighlight
} from 'react-native';

const Images = {
    people: require('../images/people.jpg'),
    films: require('../images/main.png'),
    starships: require('../images/starships.jpg'),
    starship: require('../images/starship.jpg'),
    vehicles: require('../images/vehicles.png'),
    planets: require('../images/planets.jpg'),
    species: require('../images/species.jpg'),
    luke: require('../images/Luke.png'),
    kenobi: require('../images/Kenobi.jpeg'),
    vader: require('../images/Vader.jpg'),
    padme: require('../images/padme.jpg'),
    anakin: require('../images/anakin.jpeg'),
    destroyer: require('../images/destroyer.png'),
    falcon: require('../images/falcon.jpg'),
    star: require('../images/Star.jpg'),
    main: require('../images/default.jpg')
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
    welcome: {
        fontSize: 10,
        margin: 10,
    },
    listItem: {
        margin: 5,
        padding: 5,
        borderColor: '#2d3400',
        borderWidth: 1,
        backgroundColor: '#4a55ce',
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        color: 'white'
    },
    listItemPlanet: {
        margin: 5,
        padding: 5,
        borderColor: '#2d3400',
        borderWidth: 1,
        backgroundColor: '#4a55ce',
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        color: 'white'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#558B2F'
    },
    listText: {
        fontSize: 18,
        color: 'white',
    },
    imgStyles: {
        width: 200,
        height: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
});



class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        detail: {}
    };
    this._fetchListing = this._fetchListing.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderPeople = this._renderPeople.bind(this);
    }

    componentDidMount() {
        this._fetchListing();
    }

    _fetchListing(next=false, ) {
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
        let image = Images.main;
        switch (dat.name) {
            case 'Luke Skywalker':
                image = Images.luke;
                break;
            case 'Obi-Wan Kenobi':
                image = Images.kenobi;
                break;
            case 'Anakin Skywalker':
                image = Images.anakin;
                break;
            case 'Padmé Amidala':
                image = Images.padme;
                break;
            case 'Darth Vader':
                image = Images.vader;
                break;

            default:
                console.log('go back young jedi!')
        }
        let dates = '';
        if (dat) {
            dates = (
                <View>
                    <Image alt="" source={image} style={styles.imgStyles}/>
                    <Text style={styles.listItem}>Name: {dat.name}</Text>
                    <Text style={styles.listItem}>Height: {dat.height}</Text>
                    <Text style={styles.listItem}>Mass: {dat.mass}</Text>
                    <Text style={styles.listItem}>Hair color: {dat.hair_color}</Text>
                    <Text style={styles.listItem}>Skin color: {dat.skin_color}</Text>
                    <Text style={styles.listItem}>Eye color: {dat.eye_color}</Text>
                    <Text style={styles.listItem}>Birthday: {dat.birth_year}</Text>
                    <Text style={styles.listItem}>Gender: {dat.gender}</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigate('DetailScreen', {info: dat.homeworld, base: "planets"})}
                    >
                        <Text style={styles.listText}>Home world</Text>
                    </TouchableHighlight>
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
                <Text style={styles.listItem}>Name: {dat.name}</Text>
                <Text style={styles.listItem}>Rotation period: {dat.rotation_period}</Text>
                <Text style={styles.listItem}>orbital_period: {dat.orbital_period}</Text>
                <Text style={styles.listItem}>diameter: {dat.diameter}</Text>
                <Text style={styles.listItem}>climate: {dat.climate}</Text>
                <Text style={styles.listItem}>gravity: {dat.gravity}</Text>
                <Text style={styles.listItem}>terrain: {dat.terrain}</Text>
                <Text style={styles.listItem}>surface_water: {dat.surface_water}</Text>
                <Text style={styles.listItem}>population: {dat.population}</Text>
            </View>
        );

        return dates;
    }

    _renderFilms(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text style={styles.listItem}>Title: {dat.title}</Text>
                <Text style={styles.listItem}>Episode_id: {dat.episode_id}</Text>
                <Text style={styles.listItem}>Director: {dat.director}</Text>
                <Text style={styles.listItem}>Producer: {dat.producer}</Text>
                <Text style={styles.listItem}>Release_date: {dat.release_date}</Text>
                <Text style={styles.listItem}>Opening Crawl: {dat.opening_crawl}</Text>
            </View>
        );

        return dates;
    }

    _renderStarships(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let image = Images.starships;
        switch (dat.name) {
            case 'Star Destroyer':
                image = Images.destroyer;
                break;
            case 'Death Star':
                image = Images.star;
                break;
            case 'Millennium Falcon':
                image = Images.falcon;
                break;

            default:
                console.log('go back young jedi!')
        }
        let dates = (
            <View>
                <Image alt="" source={image} style={styles.imgStyles}/>
                <Text style={styles.listItem}>Name: {dat.name}</Text>
                <Text style={styles.listItem}>Model: {dat.model}</Text>
                <Text style={styles.listItem}>Manufacturer: {dat.manufacturer}</Text>
                <Text style={styles.listItem}>Cost: {dat.cost_in_credits}</Text>
                <Text style={styles.listItem}>Length: {dat.length}</Text>
                <Text style={styles.listItem}>Max atmosphering speed: {dat.max_atmosphering_speed}</Text>
                <Text style={styles.listItem}>Crew: {dat.crew}</Text>
                <Text style={styles.listItem}>Passengers: {dat.passengers}</Text>
                <Text style={styles.listItem}>Starship class: {dat.starship_class}</Text>
                <Text style={styles.listItem}>Hyperdrive rating: {dat.hyperdrive_rating}</Text>
            </View>
        );

        return dates;
    }

    _renderVehicles(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text style={styles.listItem}>Name: {dat.name}</Text>
                <Text style={styles.listItem}>Model: {dat.model}</Text>
                <Text style={styles.listItem}>Manufacturer: {dat.manufacturer}</Text>
                <Text style={styles.listItem}>Cost: {dat.cost_in_credits}</Text>
                <Text style={styles.listItem}>Length: {dat.length}</Text>
                <Text style={styles.listItem}>Max atmosphering speed: {dat.max_atmosphering_speed}</Text>
                <Text style={styles.listItem}>Crew: {dat.crew}</Text>
                <Text style={styles.listItem}>Passengers: {dat.passengers}</Text>
                <Text style={styles.listItem}>Vehicle class: {dat.vehicle_class}</Text>
            </View>
        );

        return dates;
    }

    _renderSpecies(data) {
        const { navigate } = this.props.navigation;
        let dat = data;
        let dates = (
            <View>
                <Text style={styles.listItem}>Name: {dat.name}</Text>
                <Text style={styles.listItem}>Classification: {dat.classification}</Text>
                <Text style={styles.listItem}>Designation: {dat.designation}</Text>
                <Text style={styles.listItem}>Average height: {dat.average_height}</Text>
                <Text style={styles.listItem}>Skin colors: {dat.skin_colors}</Text>
                <Text style={styles.listItem}>Hair colors: {dat.hair_colors}</Text>
                <Text style={styles.listItem}>Eye colors: {dat.eye_colors}</Text>
                <Text style={styles.listItem}>Average lifespan: {dat.average_lifespan}</Text>
                <Text style={styles.listItem}>Language: {dat.language}</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigate('DetailScreen', {info: dat.homeworld, base: "planets"})}
                >
                    <Text style={styles.listText}>Home world</Text>
                </TouchableHighlight>
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
                return Images.starship;
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