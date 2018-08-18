import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Map from './app/components/Map';
import { Location, Permissions } from 'expo';
import YelpService from './app/services/yelp';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends Component {
  state = {
    region: null,
    restaurants: []
  };

  componentWillMount() {
    this.getLocationAsync();
  }

  getRestaurants = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const restaurants = await YelpService.getRestaurants(userLocation);
    this.setState({ restaurants });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });

    await this.getRestaurants();
  };

  // showPlaces() {
  //   return this.state.coffeeShops.map((place, i) => (
  //     <Text key={i}>
  //       { place.name }
  //       {/* { place.coords } */}
  //     </Text>
  //   ))
  // }

  render() {
    const { region, restaurants } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} places={restaurants} />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '80%',
  }
}
