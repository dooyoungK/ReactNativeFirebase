'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';


import Login from './src/pages/login';
import Signup from './src/pages/signup';
import Account from './src/pages/account';

import Header from './src/components/header';

import Firebase from 'firebase';

let app = new Firebase('https://sweltering-fire-6217.firebaseio.com/');

import styles from './src/styles/common-styles.js';

let currentState;

class rsFirebase extends Component {

    constructor(props){
      super(props);
      this.state = {
        component: null,
        title: '',
        loaded: false
      };
    }

    componentWillMount(){
      AsyncStorage.getItem('user_data').then((user_data_json) => {

        let user_data = JSON.parse(user_data_json);
        let component = {component: Login,  title: 'Log in'};
        if(user_data != null){
          app.authWithCustomToken(user_data.token, (error, authData) => {
            if(error){
              this.setState(component);
            }else{
              this.setState({component: Account, title: 'Main'});
            }
          });
        }else{
          this.setState(component);
        }
      });

    }


    render(){
      if(this.state.component){
        currentState = this.state;
        return (
          <Navigator
            initialRoute={{component: this.state.component}}
            configureScene={() => {
              return Navigator.SceneConfigs.FloatFromRight;
            }}
            renderScene={this.renderScene}
            navigationBar={
              <Navigator.NavigationBar
                  style={styles.nav}
                  navigationStyles={Navigator.NavigationBar.StylesIOS}
                  routeMapper={NavigationBarRouteMapper}/>}/>
      );
      }else{
        return (
          <View style={styles.container}>
            <Header text="Authenticating..." loaded={this.state.loaded} />
            <View style={styles.block_header}></View>
          </View>
        );
      }

    }


    renderScene(route, navigator){
      if(route.component){
        return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator });
      }
    }
}

var NavigationBarRouteMapper = {
LeftButton(route, navigator, index, navState) {
  if(index > 0) {
    return (
      <TouchableHighlight
         underlayColor="transparent"
         onPress={() => { if (index > 0) { navigator.pop() } }}>
        <Text style={ styles.leftNavButtonText }>back</Text>
      </TouchableHighlight>
  )}
  else { return null }
},
RightButton(route, navigator, index, navState) {
  if(route.onPress) return (<TouchableHighlight
                        onPress={ () => {route.onPress()}}>
                        <Text style={ styles.rightNavButtonText }>
                            { route.rightText || 'Menu' }
                        </Text>
                      </TouchableHighlight> )
},
Title(route, navigator, index, navState) {
  var title = '';
  if(!route.title){
    title = currentState.title;
  }else{
    title = route.title;
  }
  return <Text style={ styles.titleText }>{title}</Text>
}
};




AppRegistry.registerComponent('rsFirebase', () => rsFirebase);
