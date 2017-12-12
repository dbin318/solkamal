
import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native'
import polls from '../screens/polls'
import Moment from 'moment'
import 'moment/locale/ko'

export default class ResultItem extends Component {
  render() {
    const result = this.props.result
    const poll = this._getPoll(result.pollId)

    if (!poll) return null

    return (
      <View style={styles.resultItemContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.resultItem}>{poll.question}</Text>
          <Text style={styles.resultItem}>{`${result.personNumber}명이 님을 선택습니다.`}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.resultItem}>{Moment(result.date).startOf('day').fromNow()}</Text>
        </View>
      </View>
    )
  }

  _getPoll = (pollId) => polls.find((poll) => poll.pollId === pollId)
}

const styles = StyleSheet.create({
  resultItemContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    borderWidth: 2,
    margin: 10,
  },
  resultItem: {
  }
})