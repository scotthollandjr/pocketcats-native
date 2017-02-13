import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const {
    containerStyle,
    textStyle,
    cardSectionStyle,
    yesButtonStyle,
    noButtonStyle
  } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={onDecline} text="NO"></Button>
          <Button onPress={onAccept} text="YES"></Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyConten: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  // yesButtonStyle: {
  //     backgroundColor: '#fff',
  //     color: '#42ff00',
  //     borderColor: '#42ff00'
  // },
  // noButtonStyle: {
  //   backgroundColor: '#fff',
  //   color: '#ff0000',
  //   borderColor: '#ff0000'
  // }
};

export { Confirm };
