import React, {Component} from 'react';
import {
  Animated,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
var {height, width} = Dimensions.get('window');
import MapView, { Marker } from 'react-native-maps';
import {
  nameChanged,
  typeChanged,
  descriptionChanged,
  locationChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import Utils from '../Utils';
import firebase from 'firebase';

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.041;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

import Realm from 'realm';

let realm = new Realm({
  schema: [{
    name: 'Cat',
    primaryKey: 'id',
    properties: {
      id:          { type: 'string', indexed: true },
      name:        { type: 'string', indexed: true },
      type:        { type: 'string', indexed: true },
      location:    'Coordinate',
      description: 'string',
      age:         'int',
      logged:      'date',
      collar:      'bool',
      gender:      'string',
      user:        { type: 'string', indexed: true },
      image:       'string'
    }
  }, {
    name: 'Coordinate',
    properties: {
      latitude:  'float',
      longitude: 'float',
    }
  }]
});

class NewCat extends Component {
  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onTypeChange(text) {
    this.props.typeChanged(text);
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          marker: {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            key: id++,
          },
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      // this.onRegionChange(newRegion);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      },
      marker: {
        coordinate: {
          latitude: 0.0,
          longitude: 0.0,
        },
        key: id++,
      },
    };
  }


  createCat() {
    const date = new Date();
    const id = Utils.guid();
    const coord = this.state.marker.coordinate;

    realm.write(() => {
      realm.create('Cat', {
        id:          id,
        name:        this.props.name,
        type:        this.props.type,
        location:    {latitude: coord.latitude, longitude: coord.longitude},
        description: this.props.description,
        age:         0,
        logged:      date,
        collar:      false,
        gender:      'null',
        // user:        this.props.user.uid,
        user:        'G5PlSVLyzIQM8CKNZpSmI9ZMQpY2', //no log in
        image:       'null'
      });
    });

    let cats = realm.objects('Cat');
    let catsArray = cats.map(x => Object.assign({}, x));
    console.log("Cats: ", catsArray)
  }

  onMapPress(e) {
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: id++,
      },
    });
    console.log("marker: ", this.state.marker)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onPress={(event) => this.onMapPress(event)}
          >
          <MapView.Marker
            key={this.state.marker.key}
            coordinate={this.state.marker.coordinate}
          />
        </MapView>
        <View style={styles.form}>
          <Card>
            <CardSection>
              <Input
                label="Name"
                placeholder="If known"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.name}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Type"
                placeholder="Color or type"
                onChangeText={this.onTypeChange.bind(this)}
                value={this.props.type}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Description"
                placeholder="A short note"
                onChangeText={this.onDescriptionChange.bind(this)}
                value={this.props.description}
              />
            </CardSection>
            <CardSection>
              <Button
                text="Meow!"
                onPress={this.createCat.bind(this)}
              >
              </Button>
            </CardSection>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
});

const mapStateToProps = ({ newCat, auth }) => {
  const { name, type, description, location } = newCat;
  const { user } = auth;

  return { user, name, type, description, location };
}

export default connect(mapStateToProps, {nameChanged, typeChanged, descriptionChanged, locationChanged})(NewCat);
