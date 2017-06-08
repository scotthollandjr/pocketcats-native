import React from 'react';
import { Text, View } from 'react-native';

const Footer = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={styles.textStyle}>1</Text>
      <Text style={styles.textStyle}>2</Text>
      <Text style={styles.textStyle}>3</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 35,
    margin: 10,
  }
};

export { Footer };
