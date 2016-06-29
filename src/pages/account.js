'use strict';
import React, {
  Component
} from 'react';


import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  ListView,
  ToolbarAndroid,
  Alert,
} from 'react-native';

var CheckBox = require('react-native-checkbox');
import Button from '../components/button';

import Login from './login';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';

let app = new Firebase('FIREBASE_URL');


export default class account extends Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.msgRef = app.child('messages');
    this.msgs = [];
    this.state = {
      refreshing: false,
      loaded: false,
      newMsg: '',
      username: '',
      boolState: false,
      msgSource: ds,
      db: this.msgs
    };

  }


  componentWillMount(){
    console.log('Account: componentWillMount');

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });

    });
    this.msgRef.on('child_added', (dataSnapshot) => {
                 this.msgs.push({
                    id: dataSnapshot.key(),
                    msg: dataSnapshot.val().msg,
                    username: dataSnapshot.val().username,
                    timestamp: dataSnapshot.val().timestamp,
                    state: dataSnapshot.val().state,
                });

        this.setState({
            msgSource: this.state.msgSource.cloneWithRows(this.msgs)
        });
    });

    this.msgRef.on('child_removed', (dataSnapshot) => {
        // dataSnapshot.forEach((child) => {
        //     this.msgs = this.msgs.filter((x) => x.id !== child.key());
        // });
        this.msgs = this.msgs.filter((x) => x.id !== dataSnapshot.key());
        this.setState({
            msgSource: this.state.msgSource.cloneWithRows(this.msgs)
        });
    });
    //  const rowData = Array.from(new Array(10))
    //   .map((val, i) => ({
    //     text: 'Loaded row ' + (+this.state.loaded + i),
    //     clicks: 0,
    //   }))
    this.msgRef.on('child_changed', (dataSnapshot) => {
        var newMsgs = this.msgs.slice();
        var changedMsg = dataSnapshot.val();
        var changedMsgKey = dataSnapshot.key();
        newMsgs.forEach((msg, index) => {
          console.log(changedMsgKey, ' ? ', msg.id);
            if(msg.id == changedMsgKey)
            {
              console.log(index);
              newMsgs[index] = changedMsg;
              newMsgs[index].id = changedMsgKey;
            }
        });
        console.log(newMsgs);
        this.setState({
            msgSource: this.state.msgSource.cloneWithRows(newMsgs),
            db: newMsgs,
        });
        this.msgs = newMsgs;

    });
  }


render() {
  let delimiter = /\s+/;
  let token, index, parts = [];
  let newMsgText;
  return (
    <View style={styles.container}>
            { this.state.user &&
             <View style={page_styles.account_container}>
                <Image style={page_styles.profileImage}
                       source={{uri: this.state.user.password.profileImageURL}}/>
                <Text style={page_styles.account_text}>
                    {this.state.user.password.email}</Text>
              </View>
         }
      <View style={page_styles.input_container}>
          <TextInput style={page_styles.input}
                     placeholder={'Enter your message here.'}
                     placeholderTextColor="#808080"
                     underlineColorAndroid="transparent"
                     onChangeText={(text) => this.setState({newMsg: text})}
                     value={this.state.newMsg}/>
          <TouchableHighlight style={page_styles.button}
                              onPress={this.sendMsg.bind(this)}>
                              <Text style={page_styles.buttonText}>Send</Text>
          </TouchableHighlight>

      </View>
      <View style={styles.separator} />
      <ListView
        dataSource={this.state.msgSource}
        renderRow={this.renderRow.bind(this)} />

        <Button
            text="Logout"
            onpress={this.logout.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

    </View>
  );
}

renderRow(rowData) { console.log('Account: render row');
    return (
        <TouchableHighlight
          underlayColor='#dddddd'
          onPress={() => this.showAlert(rowData)}>
          <View>
            <View style={styles.row}>
              <Text style={styles.msgText}>{rowData.msg}</Text>
              <Text style={styles.msgText}>{rowData.timestamp}</Text>
              <CheckBox label="state" checked={rowData.state} />
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    }


  onRefresh(){
    console.log('refresh: ');
    var newMsgs = this.msgs.slice();
    this.setState({
        msgSource: this.state.msgSource.cloneWithRows(newMsgs),
        db: newMsgs,
    });
    // this.setState({refreshing: true});
    // setTimeout(() => {
    //   const rowData = Array.from(new Array(10))
    //   .map((val, i) => ({
    //     text: 'Loaded row ' + (+this.state.loaded + i),
    //     clicks: 0,
    //   }))
    //   .concat(this.state.rowData);
    //
    //   this.setState({
    //     loaded: this.state.loaded + 10,
    //     refreshing: false,
    //     rowData: rowData,
    //   });
    // }, 5000);
  }

  logout(){
    AsyncStorage.removeMsg('user_data').then(() => {
      app.unauth();
      this.props.navigator.replace({
        component: Login,
        title: 'Log in',
      });
    });

  }


 sendMsg(){
    let text = this.state.newMsg;
    let splited = text.split(',');
    this.state.newMsg = splited[0];


    var today = new Date();
    this.state.timestamp = today.toUTCString();
    if (this.state.newMsg !== ''){
        this.msgRef.push({
            msg: this.state.newMsg,
            username: this.state.user.password.email,
            timestamp: this.state.timestamp,
            state: this.state.boolState,
        });
    this.setState({
            newMsg: '',
            username: '',
            timestamp: '',
            boolState: false,
            loaded: false
        });

    }
 }

 billsAction(rowData){

 }


 removeMsg(rowData){
    this.msgRef.child(rowData.id).remove();
 }

 showAlert(rowData){
   let stateText;
   if(rowData.state){
     stateText = 'View state';
   }else{
     stateText = 'Add state';
   }
    Alert.alert(
          'Delete?',
          'Message',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: stateText, onPress: () => this.billsAction(rowData)},
        {text: 'Delete', onPress: () => this.removeMsg(rowData)},
      ]

    );
 }


}

const page_styles = StyleSheet.create({
  account_container: {
    backgroundColor: '#ffa85a',
    paddingTop: 50,
    paddingBottom: 5,
    flexDirection: 'row'
  },
  account_text: {
    fontSize: 14,
    marginTop: 17
  },
  profileImage: {
    margin: 13,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  input_container: {
    padding: 10,
    flexDirection: 'row'
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'black',
    fontSize: 16,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ffa85a',
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    height: 40
    },
  buttonText: {
    color: "#FFF"
  }
});
