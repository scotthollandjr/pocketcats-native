import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainMap from './components/MainMap';

const RouterComponent = () => {
  return (
    <Router sceneStyle={ styles.global }>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" initial />
        <Scene key="signup" component={SignupForm} title="Signup" />
      </Scene>
      <Scene key="main" initial>
        <Scene key="map" component={MainMap} title="PocketCats" initial />
      </Scene>
    </Router>
  )
};

const styles = {
  global: {
    paddingTop: 65,
  }
}

export default RouterComponent;
