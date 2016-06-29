'use strict';
import React, {
  StyleSheet,
  Dimensions,
} from 'react-native';

module.exports = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  login: {
    backgroundColor: '#d01d65',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: .25
  },
  inputPassword: {
    marginLeft: 15,
    width: 20,
    height: 21
  },
  inputEmail: {
    marginLeft: 15,
    width: 20,
    height: 20
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  input: {
    position: 'absolute',
    left: 61,
    top: 0,
    right: 0,
    height: 40,
    fontSize: 14
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
});
