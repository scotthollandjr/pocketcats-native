import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onLinkClick() {
    Actions.signup({ type: 'reset' });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        text="Login"
        onPress={this.onButtonPress.bind(this)}
      >
      </Button>
    );
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="name@domain.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              secureTextEntry
            />
          </CardSection>

          <Text style={styles.errorText}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
        <TouchableWithoutFeedback onPress={this.onLinkClick}>
          <View>
            <Text style={styles.linkText}>
              Need an account? Sign up.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = {
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center'
  },
  linkText: {
    paddingTop: 15,
    backgroundColor: 'transparent',
    color: '#00c9ff',
    alignSelf: 'center',
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
}

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
