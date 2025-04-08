import {TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FirstScreen = ({route}) => {
  const {Questions, name, image} = route.params;
  const navigation = useNavigation();
  
  return (
    
    <ImageBackground
      source={require('../../Assets/QuestionBack2.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(72, 173, 215, 0.9)', 'rgba(174, 75, 225, 0.9)', 'rgba(37, 44, 125, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      >
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
          <Text style={styles.heading}>{name} MCQ Test</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="timer" size={24} color="white" />
            <Text style={styles.infoText}>5 minutes</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="help-outline" size={24} color="white" />
            <Text style={styles.infoText}>10 Questions</Text>
          </View>
        </View>

        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>Quiz Rules:</Text>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="white" />
            <Text style={styles.ruleText}>Each question has 4 options</Text>
          </View>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="white" />
            <Text style={styles.ruleText}>Only one option is correct</Text>
          </View>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="white" />
            <Text style={styles.ruleText}>No negative marking</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('QuestionScreen', {Questions,name})}
        >
          <Text style={styles.startButtonText}>Start Test</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
    </ImageBackground>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  heading: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: hp('5%'),
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('4%'),
    borderRadius: 15,
    width: '40%',
  },
  infoText: {
    color: 'white',
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    fontWeight: '500',
  },
  rulesContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: wp('5%'),
    borderRadius: 15,
    marginBottom: hp('5%'),
  },
  rulesTitle: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  ruleText: {
    color: 'white',
    fontSize: hp('2%'),
    marginLeft: wp('2%'),
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 30,
    marginTop: hp('2%'),
  },
  startButtonText: {
    color: '#252C7D',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    // marginRight: wp('2%'),
  },
  imageContainer: {
    width: wp('30%'),
    height: wp('30%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: wp('15%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});