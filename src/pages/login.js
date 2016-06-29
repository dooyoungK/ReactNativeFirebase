'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Image
} from 'react-native';

import styles from '../styles/common-styles.js';
import login_styles from '../styles/login-styles.js';
import Button from '../components/button';

import Signup from './signup';
import Account from './account';

import Firebase from 'firebase';

let app = new Firebase("https://sweltering-fire-6217.firebaseio.com/");



export default class login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
        <View style={styles.container}>
          <View style={styles.header}>
          <Image style={login_styles.logo}
                 source={{uri: 'LOGO IMAGE URL'}}/>
          </View>
          <View style={login_styles.inputs}>
              <View style={login_styles.inputContainer}>
              <Image style={login_styles.inputEmail} source={{uri: 'SOURCE IMAGE URL'}}/>
              <TextInput
                  style={[login_styles.input, styles.whiteFont]}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  underlineColorAndroid="transparent"
                  placeholder={"Email Address"}
                  placeholderTextColor="#FFF" />
              </View>
              <View style={login_styles.inputContainer}>
              <Image style={login_styles.inputPassword} source={{uri: 'SOURCE IMAGE URL'}}/>
              <TextInput
                  style={[login_styles.input, styles.whiteFont]}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  placeholder={"Password"}
                  placeholderTextColor="#FFF" />
              </View>

              <View style={login_styles.forgotContainer}>
                  <Text style={styles.greyFont}>Forgot Password</Text>
              </View>

              <View style={login_styles.login}>
                <Text style={[styles.whiteFont,]}
                      onPress={this.login.bind(this)}>Log In</Text>
            </View>
          </View>
          <View style={login_styles.signup}>
                <Text style={styles.greyFont}>New here?
                  <Text style={[styles.whiteFont,]}
                        onPress={this.goToSignup.bind(this)}>  Sign Up</Text>
                </Text>
          </View>
      </View>

    );
  }

  login(){

    this.setState({
      loaded: false
    });

    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true
      });

      if(error){
        alert('Login Failed. Please try again');
      }else{
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Account,
          title: 'Main'
        });
      }
    });


  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup,
      title: 'Sign up'
    });
  }

}
AppRegistry.registerComponent('login', () => login);
