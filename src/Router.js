import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import TestPage from './components/TestPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainMap from './components/MainMap';
import NewCat from './components/NewCat';

const RouterComponent = () => {
  return (
    <Router sceneStyle={ styles.global }>
      <Scene key="auth" initial>
        <Scene key="login" component={LoginForm} title="Login" initial />
        <Scene key="signup" component={SignupForm} title="Signup" />
      </Scene>
      <Scene key="test">
        <Scene key="testpage" component={TestPage} title="Login" initial />
      </Scene>
      <Scene key="main">
        <Scene
          key="map"
          component={MainMap}
          title="PocketCats"
          onRight={() => Actions.new()}
          rightTitle="+" />
        <Scene key="new" component={NewCat} title="Log Cat" />
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
