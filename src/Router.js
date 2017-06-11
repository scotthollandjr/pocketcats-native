import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import TestPage from './components/TestPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainMap from './components/MainMap';
import NewCat from './components/NewCat';
import LandingPage from './components/LandingPage';

const RouterComponent = () => {
  return (
    <Router sceneStyle={ styles.global } navigationBarStyle={ styles.navBar } titleStyle={ styles.navTitle }>
      <Scene key="title" initial>
        <Scene key="landing" component={LandingPage} title="PocketCats" initial />
      </Scene>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" initial />
        <Scene key="signup" component={SignupForm} title="Signup" />
      </Scene>
      <Scene key="main">
        <Scene
          key="map"
          component={MainMap}
          title="PocketCats"
          onRight={() => Actions.new()}
          rightTitle="Add Cat"
          initial />
        <Scene key="new" component={NewCat} title="Log Cat" />
      </Scene>
    </Router>
  )
};

const styles = {
  global: {
    paddingTop: 65,
  },
  navBar: {
    backgroundColor: '#664c63',
    backgroundColor: '#fff',
  },
  navTitle: {
    color: '#000',
  }
}

export default RouterComponent;
