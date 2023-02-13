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
import AdminLoginScreen from './src/screens/Admin/AdminLoginScreen';
import Splash from './src/screens/SplashScreen';
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import WelcomeScreenOther from './src/screens/WelcomeScreenOther';

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
      <View
        style={{
          flex: 1,
        }}>
        {this.state.isLoading ? (
          <Splash />
        ) : (
          // <AdminLoginScreen />
          // <WelcomeScreenOther />
          
            <MainNavigation
              initialStack={this.state.initialStack}
              ref={navigationRef}
            />
        )}
      </View>
    );
  }
}
