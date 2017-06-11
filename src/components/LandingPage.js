import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button } from './common';

class LandingPage extends Component {
  onMapButtonPress() {
    Actions.main();
  }
  onLoginButtonPress() {
    Actions.auth();
  }
  onSignupButtonPress() {
    Actions.auth({type:ActionConst.RESET});
    Actions.signup();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Button
          text="MAP"
          onPress={this.onMapButtonPress.bind(this)}
        >
        </Button>
        <Button
          text="LOGIN"
          onPress={this.onLoginButtonPress.bind(this)}
        >
        </Button>
        <Button
          text="SIGNUP"
          onPress={this.onSignupButtonPress.bind(this)}
        >
        </Button>
      </View>
    )
  }
}

export default LandingPage;
