import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {api} from '../Utils/api';
import Dashboard from './Dashboard'

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

export default class githubNotetaker extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false,
    }
  }

  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit(){
    //update spinner
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username).then((res) => {
      console.log(res);
      if(res.message === 'Not Found'){
        this.setState({
          error: 'User not found',
          isLoading: false
        });
      }else {
        this.props.navigator.push({
          title: res[0].owner.name || "Select an option",
          component: Dashboard,
          passProps: { userInfo: res[0].owner }
        });
        this.setState({
          isLoading:false,
          error: false,
          username: ''
        })
      }
    });
  }

  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Procure alguem no github: </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}/>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> SEARCH </Text>
          </TouchableHighlight>
          {showErr}
      </View>
    )
  }
}
