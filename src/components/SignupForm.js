import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  emailChanged,
  passwordChanged,
  conPasswordChanged,
  signupUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConPasswordChange(text) {
    this.props.conPasswordChanged(text);
  }

  onButtonPress() {
    const { email, password, conPassword } = this.props;

    this.props.signupUser({ email, password, conPassword });
  }

  onLinkClick() {
    Actions.login({ type: 'reset' });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        text="Signup"
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
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="confirm password"
              onChangeText={this.onConPasswordChange.bind(this)}
              value={this.props.conPassword}
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
              Already have an account? Log in.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = {
  errorText: {
    padding: 5,
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
  const { email, password, conPassword, error, loading } = auth;

  return { email, password, conPassword, error, loading };
}

export default connect(mapStateToProps, {emailChanged, passwordChanged, conPasswordChanged, signupUser})(SignupForm);
