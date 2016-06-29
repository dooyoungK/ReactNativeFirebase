'use strict';
import React, {
  StyleSheet,
  Dimensions,
} from 'react-native';

var windowSize = Dimensions.get('window');

module.exports = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffa85a'
  },
  block_header: {
    flex: .2,
    backgroundColor: 'transparent'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#fff'
  },
  navContainer:{
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  body: {
    flex: 9,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  bottom:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  titleView:{
    backgroundColor: '#ffa85a',
    paddingTop: 30,
    paddingBottom: 5,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 27,
    width: 55,
    flexDirection: 'row',
    backgroundColor: '#ffa85a',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 27,
    width: 150,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ffa85a',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
  },
  msgText: {
    flex: 1,
    fontSize: 14,
    color: '#fff'
  },
  textinput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#cc8648',
    fontSize: 16
  },
  primary_button: {
    margin: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa85a',
    borderRadius: 4,
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    margin: 10,
    width: 30,
    height: 30
  },
  buttonBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  nav: {
    backgroundColor: '#ffa85a',
    alignItems: 'center',
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  leftNavButtonText: {
    color: '#fff',
  	fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    color: '#fff',
  	fontSize: 18,
    marginRight:13,
    marginTop:2
  }

});
