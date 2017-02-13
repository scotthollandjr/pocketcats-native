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
var {height, width} = Dimensions.get('window');
import MapView, { Marker } from 'react-native-maps';

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class NewCat extends Component {
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
            <Text>
              Sup
            </Text>
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

const mapStateToProps = ({ map }) => {
  const { cat } = map;

  return { cat };
}

export default connect(mapStateToProps, {})(NewCat);
