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
  idChanged,
  ageChanged,
  descriptionChanged,
  genderChanged,
  imageChanged,
  locationChanged,
  loggedChanged,
  nameChanged,
  taggedChanged,
  typeChanged,
  userChanged,
  addCat } from '../actions';
import { Card, CardSection, Input, Button, Spinner, realm } from './common';
import Utils from '../Utils';
import firebase from 'firebase';

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.041;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

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
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

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

  onButtonSubmit() {
    const id = Utils.guid();
    const age = 0;
    const description = this.props.description;
    const gender = 'null';
    const image = 'null';
    const location = this.state.marker.coordinate;
    const logged = new Date();
    const name = this.props.name;
    const tagged = false;
    const type = this.props.type;
    // const user = this.props.user.uid;
    const user = "G5PlSVLyzIQM8CKNZpSmI9ZMQpY2";

    this.props.addCat(id, age, description, gender, image, location, logged, name, tagged, type, user);
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
                onPress={this.onButtonSubmit.bind(this)}
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
  const { id, age, description, gender, image, location, logged, name, tagged, type } = newCat;
  const { user } = auth;

  return { id, age, description, gender, image, location, logged, name, tagged, type };
}

export default connect(mapStateToProps, {idChanged, ageChanged, descriptionChanged, genderChanged, imageChanged, locationChanged, loggedChanged, nameChanged, taggedChanged, typeChanged, userChanged, addCat})(NewCat);
