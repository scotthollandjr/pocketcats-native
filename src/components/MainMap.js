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
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectCat } from '../actions';
var {height, width} = Dimensions.get('window');
import MapView, { Marker } from 'react-native-maps';
import { realm } from './common';

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;
let popupHidden = true;

let cats = realm.objects('Cat');
let catsArray = cats.map(x => Object.assign({}, x));

class MainMap extends Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(190),
      markers: [],
      region: {
        latitude: 45.526977,
        longitude: -122.683028,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  togglePopup(toggler) {
    let toValue;

    if (toggler) {
      toValue = 0;
      popupHidden = false;
    }

    if (!toggler) {
      toValue = 190;
      popupHidden = true;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 1,
        tension: 1,
        friction: 5,
      }
    ).start();
  }

  onMapPress() {
    return;
  }

  onMarkerClick(cat) {
    let lat = cat.location.latitude - .01;
    let long = cat.location.longitude + .01;

    this.setState({ region: {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      },
    });

    this.togglePopup(true);
    this.props.selectCat({ cat });
  }

  onCalloutClick(cat) {
    this.togglePopup(false);
  }

  popupRender() {
    if (this.props.cat) {
      let cat = this.props.cat.cat;
      return (
        <TouchableWithoutFeedback
          onPress={() => this.onCalloutClick(cat)}>
          <View
            style={styles.popupContainer}>
            <Text style={styles.popupText1}>
              {cat.name}
            </Text>
            <Text style={styles.popupText4}>
              Type: {cat.type}
            </Text>
            <Text style={styles.popupText2}>
              {cat.description}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
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
            {cats.map(cat => (
              <MapView.Marker
                key={cat.id}
                coordinate={cat.location}
                title={cat.first_name}
                onPress={() => this.onMarkerClick(cat)}
                >
                <MapView.Callout
                  tooltip>
                  <CustomCallout>
                    <Image
                      style={styles.avatarImageStyle}
                      source={{uri: cat.image}}
                    />
                  </CustomCallout>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
        </View>
        <Animated.View
          style={[styles.popup,
            {transform: [{translateY: this.state.bounceValue}]}]}
        >
          {this.popupRender()}
        </Animated.View>
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

const mapStateToProps = ({ map }) => {
  const { cat } = map;

  return { cat };
}

export default connect(mapStateToProps, {selectCat})(MainMap);
