import React, { Component } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Picker,
  View,
  ToastAndroid,
  BackHandler,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import schools from './schools'
import * as firebase from 'firebase'

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: '가입하기',
  }

  constructor(props) {
    super(props)

    const defaultSchool = schools[0]

    this.state = {
      school: defaultSchool,
      grade: defaultSchool.grades[0], 
      classNum: 1,
    }
  }

  render() {  
    const {school, grade, classNum} = this.state
    const {maxClassNum} = grade
    // [1, 2, ..., maxClassNum]
    // key is required to render array
    const classNumArray = [...Array(maxClassNum).keys()].map(classNum => classNum + 1) 

    return (
      <View style={styles.container}>
        <ScrollView           
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.schoolContainer}>
            <Picker 
              selectedValue={school}
              onValueChange={(itemValue, itemIndex) => this.setState({school: itemValue})}>
              {schools.map((schoolTmp) => (<Picker.Item key={`${schoolTmp.id}`} label={`${schoolTmp.name}`} value={schoolTmp}/>))}
            </Picker>
          </View>
          <View style={styles.gradeContainer}>
            <Picker
              selectedValue={grade}
              onValueChange={(itemValue, itemIndex) => this.setState({grade: itemValue})}>
              {school.grades.map((gradeTmp) => (<Picker.Item key={`${gradeTmp.value}`} label={`${gradeTmp.value}학년`} value={gradeTmp}/>))}
            </Picker>
          </View>
          <View style={styles.classContainer}>
            <Picker
              selectedValue={classNum}
              onValueChange={(itemValue, itemIndex) => this.setState({classNum: itemValue})}>
              {classNumArray.map((classNumTmp) => (<Picker.Item key={classNumTmp} label={`${classNumTmp}반`} value={classNumTmp} />))}
            </Picker>
          </View>
          <TextInput
            style={{height: 40}}
            placeholder="이름"
            onChangeText={(name) => this.setState({name})}
          />
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.cancelButtonStyle} 
              onPress={this._handleCancelPress}
              title='취소'/>        
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.completeButtonStyle} 
              onPress={this._handleCompletePress}
              title='완료'/>
          </View>
        </View>                
      </View>
    )
  }

  _handleCancelPress = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('사용자 등록을 취소하며 앱을 종료합니다.', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.dispatch('Play', {})
    } else if (Platform.OS === 'ios') {
    }  

    BackHandler.exitApp()
  }

  _handleCompletePress = async () => {
    const { school, grade, classNum, name } = this.state

    // validation
    if (!name) {
      ToastAndroid.show('이름을 넣어 주세요.', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }

    const user = { 
      school: { 
        id: school.id, 
        name: school.name,
      }, 
      gradeNum: grade.value, 
      classNum,
      name,
    }
    try {
      await firebase.database().ref(`/users/${name}`).set(user)
      await AsyncStorage.setItem('@poll:user', JSON.stringify(user))
    } catch( err ) {
      console.log(err)
      ToastAndroid.show('사용자 저장에 에러가 발생했습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return      
    }

    // show a complete messsage
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${name}님 가입하셨습니다.`, ToastAndroid.SHORT, ToastAndroid.CENTER)
    } else if (Platform.OS === 'ios') {
    } 

    // clear stack and navigate to Main
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1, 
    paddingTop: 30,
  },
  schoolContainer: {
  },
  gradeContainer: {
  },
  classContainer: {
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1, 
  },
  cancelButtonStyle: {
    height: 50,
    padding: 10,
    // backgroundColor: 'yellow',
  },
  completeButtonStyle: {
    height: 50, 
    padding: 10,
    // backgroundColor: 'blue',
  },
})
