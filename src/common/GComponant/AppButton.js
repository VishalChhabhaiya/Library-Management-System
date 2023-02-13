import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {color} from '../GColors';
import {fontSize, getHeight, opacity} from '../GConstant';
import PropTypes from 'prop-types';

export default function AppButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={opacity}
      style={[style.btnStyleBlue, props.style]}
      onPress={props.onPress}>
      <Text style={style.lblWhite}>{props.title}</Text>
    </TouchableOpacity>
  );
}

// Class Styles

const style = StyleSheet.create({
  btnStyleBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getHeight(53) / 2,
    height: getHeight(53),
    backgroundColor: color.darkBlue,
  },
  lblWhite: {
    fontWeight: 'bold',
    fontSize: fontSize.size18,
    color: color.white,
    letterSpacing: 0.02,
  },
});

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  btnStyle: PropTypes.object,
  onPress: PropTypes.func,
};
