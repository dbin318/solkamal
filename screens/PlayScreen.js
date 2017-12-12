import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
//import polls from './polls'
import * as firebase from 'firebase'

export default class PlayScreen extends Component {
  static navigationOptions = {
    title: '게임하기',
  };

  constructor(props) {
    super(props)

    this.state = {
      pollIndex: 0,
    }
  }

  render() {
    const { pollIndex, polls, users } = this.state

    if (!polls) {
      console.log('polls empty')
      return null
    }

    if (!users) {
      console.log('users empty')
      return null
    }

    const poll = polls[pollIndex]
    const fourUsers = users.slice(0, 4)
    // make 4 answers using answers[0]
    while (fourUsers.length < 4) {
      fourUsers.push(fourUsers[0])
    }
    const answers = fourUsers.map(answer => answer.name)
    // const answers = ['윤신원1', '윤신원2', '윤신원3', '윤신원4']

     
    console.log('poll', poll)

    return (
      <View style={styles.container}>
        <View style={styles.pollContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {`${pollIndex + 1}. ${poll.question}`}
            </Text>
          </View>
          <View style={styles.answerContainer}>
            <View style={styles.answerRowContainer}>
              <View style={styles.answerItem}>
                <Text 
                  onPress={this._handleAnswerPress.bind(this, 0)}
                  style={styles.answerText}>
                  {`1. ${answers[0]}`} 
                </Text>
              </View>
              <View style={styles.answerItem}>
                <Text 
                  onPress={this._handleAnswerPress.bind(this, 1)}
                  style={styles.answerText}>
                  {`2. ${answers[1]}`} 
                </Text>
              </View>
            </View>
            <View style={styles.answerRowContainer}>
              <View style={styles.answerItem}>
                <Text 
                  onPress={this._handleAnswerPress.bind(this, 2)}
                  style={styles.answerText}>
                  {`3. ${answers[2]}`} 
                </Text>
              </View>
              <View style={styles.answerItem}>
                <Text 
                  onPress={this._handleAnswerPress.bind(this, 3)}
                  style={styles.answerText}>
                  {`4. ${answers[0]}`} 
                </Text>
              </View>
            </View>          
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button 
            style={{height: 50}} 
            onPress={this._handleSkipPress}
            title='통과'/>
        </View>        
      </View>
    )
  }  

  _handleAnswerPress = (answerIndex) => {
    const { pollIndex } = this.state
    if (pollIndex >= polls.length - 1) {
      // end of play
      this.props.navigation.navigate('Main', {})
      return
    }
    this.setState({ pollIndex: pollIndex + 1 })
  }

  componentDidMount() {
    this.pollsRef = firebase.database().ref('polls')
    this.pollsRef.on('value', this._getPolls)      

    this.usersRef = firebase.database().ref('users')
    this.usersRef.on('value', this._getUsers)
  }

  _handleSkipPress = () => {
    const { pollIndex } = this.state
    if (pollIndex >= polls.length - 1) {
      // end of play
      this.props.navigation.navigate('Main', {})
      return
    }
    this.setState({ pollIndex: pollIndex + 1})    
  }

  _getUsers = (snapshot) => {
    console.log('_getUsers snapshot', snapshot.val())

    const users = []

    snapshot.forEach((child) => {
      users.push(child.val())
    })

    if (users) this.setState({users})
    console.log('_getUsers users', users)
  }

  // firebase listener
  _getPolls = (snapshot) => {
    console.log('_getPolls snapshot', snapshot.val())

    const polls = []
    snapshot.forEach((child) => {
      // console.log('child for snapshot', child)

      polls.push(child.val())
    })

    if (polls) this.setState({polls})

    console.log('_getPolls polls', polls)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  pollContainer: {
    flex: 1, 
  },
  questionContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    textAlign: 'center',
  },  
  answerContainer: {
    flex: 1, 
    flexDirection: 'column',
    // backgroundColor: 'yellow',
  },  
  answerRowContainer: {
    flex: 1, 
    flexDirection: 'row',
  },
  answerItem: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',    
    // backgroundColor: 'green',
  },  
  answerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
  },
});
