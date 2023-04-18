/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React from 'react';
import {View, Text} from 'react-native';
import MainNavigation, {navigationRef} from './src/Navigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Splash from './src/screens/SplashScreen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initialStack: 'WelcomeScreen',
      isLoading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2500);

    
  }
  render() {
    return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        {this.state.isLoading ? (
          <Splash />
        ) : (
            <MainNavigation
              initialStack={this.state.initialStack}
              ref={navigationRef}
            />
        )}
      </View>
    </GestureHandlerRootView>
    );
  }
}
