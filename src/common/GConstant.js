import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Dimensions, View,Text
} from 'react-native';
import { color } from './GColors';

export const screenSize = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

//Global function
export function getWidth(size) {
  return (size / 375) * screenSize.width;
}

export function getHeight(size) {
  return (size / 812) * screenSize.height;
}

// Font Size
export const fontSize = {
  size9: getWidth(9),
  size10: getWidth(10),
  size11: getWidth(11),
  size12: getWidth(12),
  size13: getWidth(13),
  size14: getWidth(14),
  size15: getWidth(15),
  size16: getWidth(16),
  size17: getWidth(17),
  size18: getWidth(18),
  size19: getWidth(19),
  size20: getWidth(20),
  size21: getWidth(21),
  size22: getWidth(22),
  size23: getWidth(23),
  size24: getWidth(24),
  size25: getWidth(25),
  size26: getWidth(26),
  size27: getWidth(27),
  size28: getWidth(28),
  size29: getWidth(29),
  size30: getWidth(30),
  size31: getWidth(31),
  size32: getWidth(32),
  size33: getWidth(33),
  size34: getWidth(34),
  size35: getWidth(35),
  size36: getWidth(36),
};

// Touchable opacity alpha
export const opacity = 0.6;


export const emptyComponent = msg => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: fontSize.size16,
          color: color.darkBlue,
        }}>
        {msg}
      </Text>
    </View>
  );
};


// Set value in encrypted storage
export async function setData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('[Async Storage] Error in set data : ', error);
  }
}

// Get value from Encrypted storage
export async function getData(key, callback) {
  try {
    var value = await AsyncStorage.getItem(key);

    callback(JSON.parse(value));
  } catch (error) {
    console.log('[Async Storage] Error in get data : ', error);
  }
}


export const asyncStorageKey = {
  userData: 'userData',
};