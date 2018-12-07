/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet,
    Text, 
    View,
    Image,
} from 'react-native';


import { YellowBox } from 'react-native';


import {
    createStackNavigator,
} from 'react-navigation';

import Home from './src/Home';
import Profile from './src/Profile';
import SampleAppMovies from './src/SampleAppMovies';
import Animate from './src/Animate';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


const RootStack = createStackNavigator({
    Home: { screen: Home },
    Profile: { screen: Profile },
    SampleAppMovies: { screen: SampleAppMovies },
    Animate: { screen: Animate },
});

export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
