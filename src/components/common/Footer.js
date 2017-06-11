import React from 'react';
import { Text, View } from 'react-native';

const Footer = (props) => {
  const {
    buttonStyle,
    viewStyle,
    rowOne,
    rowTwo,
    rowThree,
    rowFour,
  } = styles;

  return (
    <View style={viewStyle}>
      <View style={rowOne}>
        <Text>V</Text>
      </View>
      <View style={rowTwo}>
        <Text>Search Bar</Text>
      </View>
      <View style={rowThree}>
        <Text>Filter Dropdown</Text>
      </View>
      <View style={rowFour}>
        <Text style={styles.buttonStyle}>1</Text>
        <Text style={styles.buttonStyle}>2</Text>
        <Text style={styles.buttonStyle}>3</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    height: 120,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    elevation: 2,
    position: 'relative',
  },
  rowOne: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTwo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowThree: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFour: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 35,
  }
};

export { Footer };
