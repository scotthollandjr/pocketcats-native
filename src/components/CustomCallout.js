import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class CustomCallout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 150,
    height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 5,
    overflow: 'hidden',
  },
});

export default CustomCallout;
