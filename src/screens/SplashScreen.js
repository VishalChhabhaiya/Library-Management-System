import React, {Component} from 'react';
import { StyleSheet, View, Image} from 'react-native';
import {screenSize} from '../common/GConstant';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
        <Image
          source={require('../assets/images/Logo.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundVideo: {
    height: screenSize.height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
