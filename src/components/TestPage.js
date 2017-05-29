import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

import Realm from 'realm';

class TestPage extends Component {

  render() {
    let realm = new Realm({
      schema: [{name: 'Cat', properties: {name: 'string'}}]
    })

    realm.write(() => {
      realm.create('Cat', {name: 'Appa'});
    });

    return (
      <View>
        <Card>
          <CardSection>
            <Text style={styles.text}>
              Count of Cats in Realm: {realm.objects('Cat').length}
            </Text>
          </CardSection>
        </Card>
      </View>
    )
  }
}

const styles = {
  text: {
    padding: 5,
    color: 'red',
    fontSize: 20,
  }
};

export default TestPage;
