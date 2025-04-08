import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Rest_API from '../../Api';

// Dummy leaderboard data
const dummyLeaderboard = [
  { id: 1, name: 'John Doe', score: 95, rank: 1, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', score: 90, rank: 2, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Mike Johnson', score: 88, rank: 3, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'Sarah Williams', score: 85, rank: 4, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'David Brown', score: 82, rank: 5, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const Result = ({route, navigation}) => {
  const [view, setView] = useState(false);
  const [newArr, setNewArr] = useState(0);
  const {score, arr, optionTextArray, Questions, name} = route.params;
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    optionTextArray.map((item) => {
      if(item === "good") {
        setNewArr((newArr) => newArr + 1);
      }
    });
  }, []);

  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .score { font-size: 24px; font-weight: bold; margin: 10px 0; }
              .details { margin: 20px 0; }
              .question { margin: 15px 0; padding: 10px; background: #f5f5f5; }
              .correct { color: green; }
              .incorrect { color: red; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${name} Quiz Result</h1>
              <div class="score">Score: ${newArr}/${Questions.length}</div>
              <div>Percentage: ${((newArr / Questions.length) * 100).toFixed(1)}%</div>
            </div>
            <div class="details">
              ${Questions.map((q, index) => `
                <div class="question">
                  <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                  <p>Your Answer: ${q[`option${arr[index]}`]}</p>
                  <p class="${optionTextArray[index] === 'good' ? 'correct' : 'incorrect'}">
                    Correct Answer: ${q.answer}
                  </p>
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `;

      const options = {
        html,
        fileName: `${name}_Quiz_Result`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert(
        'Success',
        `PDF saved to: ${file.filePath}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };

  const renderItems = ({ item }) => {
    const isCorrect = optionTextArray[item.id-1] === 'good';
    return (
      <View key={item.id} style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <View style={[styles.statusIcon, { backgroundColor: isCorrect ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)' }]}>
            {isCorrect ? (
              <Icon2 name='check' size={20} color='#00ff00' />
            ) : (
              <Icon2 name='cross' size={20} color='#ff0000' />
            )}
          </View>
          <Text style={[styles.questionNumber, { color: isCorrect ? '#00ff00' : '#ff0000' }]}>
            {item.id}.
          </Text>
          <Text style={[styles.question, { color: isCorrect ? '#00ff00' : '#ff0000' }]}>
            {item.question}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
            <View key={idx} style={styles.optionItem}>
              <Text style={styles.optionText}>{`${String.fromCharCode(97 + idx)}) ${item[option]}`}</Text>
              <RadioButton
                value={idx + 1}
                status={arr[item.id - 1] === idx + 1 ? 'checked' : 'unchecked'}
                color={isCorrect ? '#00ff00' : '#ff0000'}
              />
            </View>
          ))}
        </View>
        <Text style={styles.answerText}>Correct Answer: {item.answer}</Text>
      </View>
    );
  };

  const renderLeaderboardItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{item.rank}</Text>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles.leaderboardImage}
      />
      <View style={styles.leaderboardInfo}>
        <Text style={styles.leaderboardName}>{item.name}</Text>
        <Text style={styles.leaderboardScore}>Score: {item.score}</Text>
      </View>
      {index === 0 && (
        <View style={styles.crownContainer}>
          <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
        </View>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={['#48ADD7', '#AE4BE1', '#252C7D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeArea}>
          {!view ? (
            <View style={styles.summaryContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="emoji-events" size={60} color="white" />
              </View>
              <Text style={styles.congratsText}>Congratulations!</Text>
              <Text style={styles.scoreText}>Your Score</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreNumber}>{newArr}</Text>
                <Text style={styles.totalScore}>/ {Questions.length}</Text>
              </View>
              <Text style={styles.percentageText}>
                {((newArr / Questions.length) * 100).toFixed(1)}%
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.viewResultButton}
                  onPress={() => setView(true)}
                >
                  <Text style={styles.viewResultText}>View Detailed Results</Text>
                  <MaterialIcons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={generatePDF}
                >
                  <MaterialIcons name="download" size={24} color="white" />
                  <Text style={styles.downloadText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.resultsContainer}>
              <View style={styles.headerContainer}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setView(false)}
                >
                  <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.resultsTitle}>Detailed Results</Text>
              </View>
              <FlatList
                data={Questions}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
          )}

          {/* Leaderboard Section */}
          <View style={styles.leaderboardContainer}>
            <TouchableOpacity
              style={styles.leaderboardHeader}
              onPress={() => setShowLeaderboard(!showLeaderboard)}
            >
              <Text style={styles.leaderboardTitle}>Leaderboard</Text>
              <MaterialIcons
                name={showLeaderboard ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {showLeaderboard && (
              <View style={styles.leaderboardContent}>
                <FlatList
                  data={dummyLeaderboard}
                  renderItem={renderLeaderboardItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop:hp('12%')
  },
  summaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('5%'),
    borderRadius: 50,
    marginBottom: hp('3%'),
  },
  congratsText: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  scoreText: {
    color: 'white',
    fontSize: hp('2.5%'),
    marginBottom: hp('2%'),
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: hp('1%'),
  },
  scoreNumber: {
    color: 'white',
    fontSize: hp('6%'),
    fontWeight: 'bold',
  },
  totalScore: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: hp('3%'),
  },
  percentageText: {
    color: 'white',
    fontSize: hp('2.5%'),
    marginBottom: hp('5%'),
  },
  viewResultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 25,
  },
  viewResultText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginRight: wp('2%'),
  },
  resultsContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
    marginTop: hp('2%'),
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('3%'),
    borderRadius: 20,
    marginRight: wp('3%'),
  },
  resultsTitle: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  flatListContent: {
    padding: wp('5%'),
  },
  questionContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  statusIcon: {
    padding: wp('3%'),
    borderRadius: 20,
    marginRight: wp('3%'),
  },
  questionNumber: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginRight: wp('2%'),
  },
  question: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    flex: 1,
  },
  optionsContainer: {
    marginTop: hp('2%'),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  optionText: {
    color: 'white',
    fontSize: hp('1.8%'),
    flex: 1,
  },
  answerText: {
    color: 'white',
    fontSize: hp('1.8%'),
    marginTop: hp('2%'),
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection:'column',
    justifyContent: 'space-around',
    gap:10,
    width: '100%',
    marginTop: hp('2%'),
    borderColor:'red'
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 25,
  },
  downloadText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginLeft: wp('2%'),
  },
  leaderboardContainer: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('4%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
  },
  leaderboardTitle: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  leaderboardContent: {
    padding: wp('2%'),
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: wp('3%'),
    borderRadius: 10,
    marginBottom: hp('1%'),
  },
  rankContainer: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  rankText: {
    color: 'white',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  leaderboardImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('3%'),
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    color: 'white',
    fontSize: hp('1.8%'),
    fontWeight: '500',
  },
  leaderboardScore: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: hp('1.6%'),
  },
  crownContainer: {
    marginLeft: wp('2%'),
  },
});
