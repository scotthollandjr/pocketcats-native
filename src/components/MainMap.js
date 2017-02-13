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

import CustomCallout from './CustomCallout';
const ASPECT_RATIO = width / height;
const LATITUDE = 45.526977;
const LONGITUDE = -122.683028;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

let popupHidden = true;

let cats = [
  {
    id: 0,
    name: "Appa",
    type: "Siamese",
    collar: false,
    gender: "Male",
    notes: "Very aggressive, blue eyes",
    age: 4,
    verified: false,
    owner: null,
    image: "https://s-media-cache-ak0.pinimg.com/736x/58/2b/fa/582bfac8dab69c53984c2fa8642db942.jpg",
    coordinate: {
      longitude: -122.6804352795281,
      latitude: 45.49031028995796,
    }
  },
  {
    id: 1,
    name: "Eli",
    type: "Black",
    collar: false,
    gender: "Male",
    notes: "Crooked ear and cuts on back",
    age: 7,
    verified: false,
    owner: null,
    image: "https://s-media-cache-ak0.pinimg.com/736x/85/a7/39/85a739f5737ceced2aedbb8f31178d74.jpg",
    coordinate: {
      longitude: -122.6927766289744,
      latitude: 45.52556019729369,
    }
  },
  {
    id: 2,
    name: "Breakfast",
    type: "Maine Coon",
    collar: true,
    gender: "Female",
    notes: "Loud meowing",
    age: 3,
    verified: false,
    owner: null,
    image: "https://pbs.twimg.com/profile_images/506522217052528640/wBUjUJSK_400x400.jpeg",
    coordinate: {
      longitude: -122.6799167354337,
      latitude: 45.52846642077944,
    }
  },
  {
    id: 3,
    name: "Quee",
    type: "Mix",
    collar: true,
    gender: "Unknown",
    notes: "Fighting other cats in neighborhood",
    age: null,
    verified: false,
    owner: null,
    image: "https://pbs.twimg.com/profile_images/708067740888801280/7rTsSuBP.jpg",
    coordinate: {
      longitude: -122.6789833560638,
      latitude: 45.52120058053362,
    }
  },
  {
    id: 4,
    name: "Chester",
    type: "Orange Tabby",
    collar: true,
    gender: "Male",
    notes: "Seems to be indoor cat",
    age: null,
    verified: false,
    owner: null,
    image: "https://pbs.twimg.com/profile_images/668439459986350081/gfVktJWg.jpg",
    coordinate: {
      longitude: -122.6861392645663,
      latitude: 45.51553257367652,
    }
  },
  {
    id: 5,
    name: "Riff-Raff",
    type: "Orange Tabby",
    collar: false,
    gender: "Male",
    notes: "Fat and chunky. Mrow",
    age: 13,
    verified: false,
    owner: null,
    image: "https://ih1.redbubble.net/image.73670090.0092/flat,1000x1000,075,f.u2.jpg",
    coordinate: {
      longitude: -122.6968212729106,
      latitude: 45.51989262962709,
    }
  },
  {
    id: 6,
    name: "Lil' Douggie",
    type: "Tabby",
    collar: false,
    gender: "Male",
    notes: "Seems to be an indoor cat",
    age: 1,
    verified: false,
    owner: null,
    image: "https://s-media-cache-ak0.pinimg.com/236x/1b/92/e2/1b92e2949becda1f180d46fc4b546690.jpg",
    coordinate: {
      longitude: -122.6551303277222,
      latitude: 45.52011062355635,
    }
  },
  {
    id: 7,
    name: "Feli",
    type: "Black",
    collar: false,
    gender: "Unknown",
    notes: "None",
    age: null,
    verified: false,
    owner: null,
    image: "https://s-media-cache-ak0.pinimg.com/originals/95/ed/a7/95eda7740e1745ccd6ac85250e7b42f6.jpg",
    coordinate: {
      longitude: -122.6635307420512,
      latitude: 45.53260752981592,
    },
  },
  {
    id: 8,
    name: "Zoe",
    type: "Tortoise Shell",
    collar: true,
    gender: "Female",
    notes: "Lorem ipsum dolar",
    age: null,
    verified: false,
    owner: null,
    image: "https://s-media-cache-ak0.pinimg.com/736x/34/ba/db/34badbcd09831ed25743cb2850177737.jpg",
    coordinate: {
      longitude: -122.6758720914976,
      latitude: 45.53979925769482,
    }
  },
  {
    id: 9,
    name: "Bohdi",
    type: "Tabby",
    collar: false,
    gender: "Male",
    notes: "Caught eating dim sum",
    age: 13,
    verified: false,
    owner: null,
    image: "https://www.sturbridgeyankee.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/r/brown_tabby_cat_1.jpg",
    coordinate: {
      longitude: -122.6698569800027,
      latitude: 45.50717485546119,
    }
  }
]

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
    let lat = cat.coordinate.latitude - .01;
    let long = cat.coordinate.longitude + .01;



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
              Notes: {cat.notes}
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
                coordinate={cat.coordinate}
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
