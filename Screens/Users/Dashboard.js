import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import course images
import Python from '../../Assets/Pyhton.png';
import ReactNative from '../../Assets/Reactnative.png';
import Java from '../../Assets/Java.png';
import Cpp from '../../Assets/C++.png';
import Ai from '../../Assets/AI.png';
import Js from '../../Assets/javascript.png';
import logo from '../../Assets/logo2.png';
import { ReactNativeQuestions, JavaQuestions, JavaScriptQuestions, AIQuestions, PythonQuestions, CppQuestions } from '../../AllQuestions';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Rest_API from '../../Api';
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Weekly");
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const courses = [
    { id: 1, name: "React Native", image: ReactNative, color: "#61DAFB", Questions: ReactNativeQuestions },
    { id: 2, name: "JavaScript", image: Js, color: "#F7DF1E", Questions: JavaScriptQuestions },
    { id: 3, name: "Python", image: Python, color: "#3776AB", Questions: PythonQuestions },
    { id: 4, name: "Java", image: Java, color: "#007396", Questions: JavaQuestions },
    { id: 5, name: "C++", image: Cpp, color: "#00599C", Questions: CppQuestions },
    { id: 6, name: "AI/ML", image: Ai, color: "#FF6B6B", Questions: AIQuestions },
  ];

    // Refresh tests when the screen comes into focus
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       fetchTests();
  //     }, [])
  //   );

  // const fetchTests = async () => {
  //   setLoading(true);
  //   try {
  //     // Try to fetch from API first
  //     const response = await axios.get(`http://${Rest_API}:9000/testroute/alltests`);
  //     setTests(response.data.data);
  //     console.log(response.data);
      
  //   } catch (error) {
  //     console.error('Error fetching tests:', error);
  //     // Try to get from AsyncStorage as fallback
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const getProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    // const userId = parseInt(id, 16)
    console.log('====================================');
    console.log("profile :", userId);
    console.log('====================================');
    if (!userId) {
      console.log('No user ID found');
      return; // Handle the case where userId is null
    }


    try {
      const res = await axios.get(`http://${Rest_API}:9000/usersroute/profile/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log("Profile fetching error =", err);
      Alert.alert("Error", "Failed to fetch profile data.");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  const latestCourse = {
    title: "Advanced React Native",
    description: "Master React Native with advanced concepts and real-world projects",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    instructor: "John Doe",
    rating: 4.8,
    students: 1200
  };

  const featuredCourses = [
    {
      id: 1,
      title: "Advanced React Native",
      description: "Master React Native with advanced concepts",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.8,
      students: 1200
    },
    {
      id: 2,
      title: "Python Programming",
      description: "Learn Python from basics to advanced",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      rating: 4.9,
      students: 1500
    },
    {
      id: 3,
      title: "JavaScript Mastery",
      description: "Become a JavaScript expert",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      rating: 4.7,
      students: 1800
    }
  ];

  return (
    <ImageBackground
      source={require('../../Assets/Home.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(72, 173, 215, 0.9)', 'rgba(174, 75, 225, 0.9)', 'rgba(37, 44, 125, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with Logo and Profile */}
          <View style={styles.header}>
  <View style={styles.logoContainer}>
    <Image source={logo} style={styles.logo} />
  </View>

  <TouchableOpacity
    style={styles.profileContainer}
    onPress={() => navigation.navigate('Profile')}
  >
    <Image
      source={
        user.AuthType === 'EmailWithPassword'
          ? user.image
            ? { uri: `http://${Rest_API}:9000/${user.image}` }
            : require('../../Assets/Profile.png')
          : user.image
            ? { uri: user.image }
            : require('../../Assets/Profile.png')
      }
      style={styles.profileImage}
    />
  </TouchableOpacity>
</View>


          {/* Featured Courses Horizontal Scroll */}
          <View style={styles.featuredContainer}>
            <Text style={styles.featuredTitle}>Featured Courses</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScrollContent}
            >
              {featuredCourses.map((course) => (
                <TouchableOpacity key={course.id} style={styles.featuredCard}>
                  <Image source={{ uri: course.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredCardTitle}>{course.title}</Text>
                    <Text style={styles.featuredCardDescription}>{course.description}</Text>
                    <View style={styles.featuredStats}>
                      <View style={styles.featuredStatItem}>
                        <MaterialIcons name="star" size={16} color="#FFD700" />
                        <Text style={styles.featuredStatText}>{course.rating}</Text>
                      </View>
                      <View style={styles.featuredStatItem}>
                        <MaterialIcons name="person" size={16} color="white" />
                        <Text style={styles.featuredStatText}>{course.students}+</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Courses Grid */}
          <View style={styles.coursesContainer}>
            <Text style={styles.sectionTitle}>Popular Tests</Text>
            <View style={styles.coursesGrid}>
              {courses.map((course) => (
                <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => { navigation.navigate('FirstScreen', { Questions: course.Questions, name: course.name, image: course.image }) }}>
                  <Image
                    source={course.image}
                    style={[styles.courseImage]}
                    resizeMode="contain"
                  />
                  <Text style={styles.courseName}>{course.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const chartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    { data: [40, 20, 50, 10, 55, 30, 10], color: () => "#333" },
    { data: [10, 40, 25, 50, 15, 20, 30], color: () => "#f472b6" },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
  strokeWidth: 2,
};

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  logoContainer: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    // padding: wp('3%'),
    // borderRadius: 15,
  },
  logo: {
    width: wp('25%'),
    height: wp('15%'),
    // resizeMode: 'contain',
  },
  profileContainer: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('2%'),
    borderRadius: 25,
  },
  profileImage: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  bannerContainer: {
    height: hp('25%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: wp('4%'),
  },
  bannerTitle: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  bannerDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: hp('1.8%'),
    marginBottom: hp('1%'),
  },
  bannerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: 'white',
    marginLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
  coursesContainer: {
    marginTop: hp('3%'),
    marginHorizontal: wp('5%'),
  },
  sectionTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('2%'),
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: wp('43%'),
    backgroundColor: 'white',
    borderRadius: 15,
    padding: wp('4%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    elevation: 3,
  },
  courseName: {
    marginTop: hp('1%'),
    fontSize: hp('2%'),
    color: '#333',
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("1%"),
    marginHorizontal: wp('5%'),
  },
  tabButton: {
    padding: hp("1%"),
    marginHorizontal: wp("2%"),
    borderRadius: hp("1%"),
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: "#333"
  },
  activeTabText: {
    color: "#fff"
  },
  tabText: {
    color: "#333"
  },
  chart: {
    borderRadius: hp("1%"),
    marginTop: hp("2%"),
    marginHorizontal: wp('5%'),
  },
  courseImage: {
    width: wp('15%'),
    height: wp('15%'),
    marginBottom: hp('1%'),
  },
  featuredContainer: {
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  featuredTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: wp('5%'),
    marginBottom: hp('2%'),
  },
  featuredScrollContent: {
    paddingHorizontal: wp('5%'),
  },
  featuredCard: {
    width: wp('90%'),
    height: hp('25%'),
    marginRight: wp('4%'),
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: wp('4%'),
  },
  featuredCardTitle: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  featuredCardDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: hp('1.6%'),
    marginBottom: hp('1%'),
  },
  featuredStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredStatText: {
    color: 'white',
    marginLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
});

export default Dashboard;
