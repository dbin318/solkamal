import React, { Component } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native'

import results from './results'
import ResultItem from '../components/ResultItem'

export default class ResultScreen extends Component {
  static navigationOptions = {
    title: '결과보기',
  };

  render() {    
    return (
      <View style={styles.container}>
        <FlatList 
          data={results}
          renderItem={this._renderItem}>
        </FlatList>
      </View>
    )
  }

  _renderItem = ({item}) => {
    return (
      <ResultItem result={item} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
})
