import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Rest_API from '../../Api';
const QuestionScreen = ({route}) => {
  const {Questions,name} = route.params;
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(299); // Total time in seconds (10 minutes)
  const [optionArray, setOptionArray] = useState(new Array(Questions.length).fill(""));
  const [optionTextArray, setOptionTextArray] = useState(new Array(Questions.length).fill("wrong"));
  const [arr, setArr] = useState(new Array(Questions.length).fill(0));
  const [next, setNext] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === Questions.length - 1 || time === 0) {
      setNext(true);
    }
  }, [index, time]);

  const handlePress = (optionId, selectedOption) => {
    const newArr = [...arr];
    newArr[index] = optionId;
    setArr(newArr);

    const newOptionArray = [...optionArray];
    newOptionArray[index] = selectedOption;
    setOptionArray(newOptionArray);

    const newOptionTextArray = [...optionTextArray];
    if (selectedOption === Questions[index].answer) {
      setScore((prevScore) => prevScore + 1);
      newOptionTextArray[index] = "good";
    } else {
      newOptionTextArray[index] = "wrong";
    }
    setOptionTextArray(newOptionTextArray);
  };

  const handleSubmit =async () => {
    try{
      const userId = await AsyncStorage.getItem('userId');
      const res=await axios.post(`http://${Rest_API}:9000/LeaderBoardRoute/create`,{
        testName:name,
        user:userId,
        score:score
      })
      console.log(res.data);
      navigation.navigate('ResultScreen', {
        score: score,
        arr: arr,
        optionTextArray: optionTextArray,
        Questions: Questions,
        name: name,
      });

    }catch(err){
      console.log("error :",err); 
    }
  };

  const minute = Math.floor(time / 60);
  const second = time % 60;

  return (
    <LinearGradient
      colors={['#48ADD7', '#AE4BE1', '#252C7D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.timerContainer}>
            <MaterialIcons name="timer" size={24} color="white" />
            <Text style={styles.timerText}>
              {minute < 10 ? '0' + minute : minute}:
              {second < 10 ? '0' + second : second}
            </Text>
          </View>
          <View style={styles.questionCounter}>
            <Text style={styles.counterText}>Question {index + 1}/{Questions.length}</Text>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{Questions[index].question}</Text>
          
          <View style={styles.optionsContainer}>
            {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  arr[index] === idx + 1 && styles.selectedOption
                ]}
                onPress={() => handlePress(idx + 1, Questions[index][option])}
              >
                <View style={styles.optionContent}>
                  <View style={styles.radioContainer}>
                    <RadioButton
                      value={idx + 1}
                      status={arr[index] === idx + 1 ? 'checked' : 'unchecked'}
                      color="#48ADD7"
                    />
                  </View>
                  <Text style={styles.optionText}>
                    {String.fromCharCode(97 + idx)}) {Questions[index][option]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, index === 0 && styles.disabledButton]}
            onPress={() => setIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
            disabled={index === 0}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          {next ? (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
              <MaterialIcons name="check-circle" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setIndex((prevIndex) => Math.min(prevIndex + 1, Questions.length - 1))}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
    marginTop: hp('2%'),
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('3%'),
    borderRadius: 20,
  },
  timerText: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
  },
  questionCounter: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('3%'),
    borderRadius: 20,
  },
  counterText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  questionContainer: {
    flex: 1,
    padding: wp('5%'),
  },
  questionText: {
    color: 'white',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    lineHeight: hp('3.5%'),
  },
  optionsContainer: {
    marginTop: hp('2%'),
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    marginBottom: hp('2%'),
    padding: wp('4%'),
  },
  selectedOption: {
    backgroundColor: 'rgba(72,173,215,0.3)',
    borderColor: '#48ADD7',
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginRight: wp('3%'),
  },
  optionText: {
    color: 'white',
    fontSize: hp('2%'),
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 25,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginHorizontal: wp('2%'),
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#48ADD7',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 25,
  },
  submitButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginRight: wp('2%'),
  },
});
