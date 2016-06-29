'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import Firebase from 'firebase';

let app = new Firebase('https://sweltering-fire-6217.firebaseio.com/');

import styles from '../styles/common-styles.js';
import login_styles from '../styles/login-styles.js';

export default class signup extends Component {

	constructor(props){
		super(props);

		this.state = {
      loaded: true,
			email: '',
			password: ''
		};
	}

  signup(){
    this.setState({
      loaded: false
    });

    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {

      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }

      }else{
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login,
      title: 'Log in'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block_header}>
        </View>
        <View style={login_styles.inputs}>
            <View style={login_styles.inputContainer}>
                <Image style={login_styles.inputEmail} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                <TextInput
                      style={[login_styles.input, styles.whiteFont]}
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                      placeholder={"Email Address"}
                      placeholderTextColor="#FFF" />
            </View>
            <View style={login_styles.inputContainer}>
                <Image style={login_styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                <TextInput
                      style={[login_styles.input, styles.whiteFont]}
                      onChangeText={(text) => this.setState({password: text})}
                      value={this.state.password}
                      placeholder={"Password"}
                      secureTextEntry={true}
                      placeholderTextColor="#FFF" />
            </View>
            <View style={login_styles.login}>
              <Text style={styles.whiteFont}
                    onPress={this.signup.bind(this)}>Sign up</Text>
            </View>
        </View>
      </View>
    );
  }
}
