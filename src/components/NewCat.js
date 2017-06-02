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
  ageChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Realm from 'realm';

let realm = new Realm({
  schema: [{
    name: 'Cat',
    primaryKey: 'id',
    properties: {
      id:          { type: 'string', indexed: true },
      name:        { type: 'string', indexed: true },
      type:        { type: 'string', indexed: true },
      location:    { type: 'string', indexed: true },
      description: 'string',
      age:         'int',
      logged:      'date',
      collar:      'bool',
      gender:      'string',
      user:        { type: 'string', indexed: true },
      image:       'string'
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

  onAgeChange(text) {
    this.props.ageChanged(text);
  }

  // componentWillMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var initialPosition = JSON.stringify(position);
  //       this.setState({initialPosition});
  //     },
  //     (error) => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //   );
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     var lastPosition = JSON.stringify(position);
  //     this.setState({lastPosition});
  //   });
  // }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 45.526977,
        longitude: -122.683028,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  createCat(cat) {
    realm.write(() => {
      realm.create('Cat', {
        id:          cat.id,
        name:        cat.name,
        type:        cat.type,
        location:    cat.location,
        description: cat.description,
        age:         cat.age,
        logged:      cat.logged,
        collar:      cat.collar,
        gender:      cat.gender,
        user:        cat.user,
        image:       cat.image
      });
    });
  }

  onMapPress() {
    return;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onPress={(event) => this.onMapPress()}
          >

          </MapView>
          <View style={{flex:1}}>
            <Card>
              <CardSection>
                <Input
                  label="Name"
                  placeholder="If known"
                  onChangeText={this.onNameChange.bind(this)}
                  value={this.props.name}
                />
                <Input
                  label="Type"
                  placeholder="Color or type"
                  onChangeText={this.onTypeChange.bind(this)}
                  value={this.props.type}
                />
                <Input
                  label="Description"
                  placeholder="A short note"
                  onChangeText={this.onDescriptionChange.bind(this)}
                  value={this.props.description}
                />
                <Input
                  label="Age"
                  placeholder="Estimation"
                  onChangeText={this.onAgeChange.bind(this)}
                  value={this.props.age}
                />
              </CardSection>
            </Card>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: width,
    height: height,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  popup: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    height: 190,
  },
  avatarImageStyle: {
    height: 150,
    width: 150,
  },
  popupContainer: {
    padding: 15,
    flexDirection: 'column',
  },
  popupText1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  popupText2: {
    paddingTop: 5,
    fontStyle: 'italic',
  },
  popupText3: {
    paddingTop: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  popupText4: {
    paddingTop: 5,
    fontSize: 15,
  },
  popupText5: {
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

const mapStateToProps = ({ newCat }) => {
  const { name, type, description, age } = newCat;

  return { name, type, description, age };
}

export default connect(mapStateToProps, {nameChanged, typeChanged, descriptionChanged, ageChanged})(NewCat);
