import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import React from 'react'
import {decode, encode} from 'base-64'
import { YellowBox } from 'react-native';
import _ from 'lodash';

import MainWindow from './components/MainWindow'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export function registerScreens() {
  Navigation.registerComponent('example.MainWindow', () => gestureHandlerRootHOC(MainWindow));
}

export default function App(){
  return(
    <MainWindow></MainWindow>

  )
}

