import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import Profile from './Profile';
import Repositories from './Repositories';
import {api} from '../Utils/api';
import Notes from './Notes';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends Component {
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(btn === 0){
      obj.backgroundColor = '#48BBEC'
    }else if(btn === 1){
      obj.backgroundColor = '#DDD'
    }else{
      obj.backgroundColor = '#E77AAE'
    }
    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    })
  }
  goToRepos(){
    api.getRepos(this.props.userInfo.login).then((res) => {
      this.props.navigator.push({
        component: Repositories,
        title: 'Repos Page',
        passProps: {
          userInfo: this.props.userInfo,
          repos: res
        }
      });
    });
  }
  goToNotes(){
    api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          component: Notes,
          title: 'Notes Page',
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        })
      })
  }
  render() {
    console.log(this.props.userInfo);
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#000">
          <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor="#000">
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor="#000">
          <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
