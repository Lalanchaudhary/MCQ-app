import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Rest_API from '../../Api';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: null,
    dob: '',
    gender: '',
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('Error', 'User not found');
      return;
    }

    try {
      const res = await axios.get(`http://${Rest_API}:9000/usersroute/profile/${userId}`);
      setUser(res.data);
      console.log(`http://${Rest_API}:9000/${res.data.image}`);

    } catch (err) {
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <LinearGradient
      colors={['#48ADD7', '#AE4BE1', '#252C7D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <View style={styles.imageWrapper}>
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

          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tests Taken</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialIcons name="person" size={24} color="white" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Full Name</Text>
              <Text style={styles.detailValue}>{user.name}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="email" size={24} color="white" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="cake" size={24} color="white" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Date of Birth</Text>
              <Text style={styles.detailValue}>{user.dob}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="wc" size={24} color="white" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{user.gender}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('MyCertificates')}
          >
            <MaterialIcons name="card-membership" size={24} color="white" />
            <Text style={styles.actionButtonText}>My Certificates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('TestHistory')}
          >
            <MaterialIcons name="history" size={24} color="white" />
            <Text style={styles.actionButtonText}>Test History</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#ff4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
    marginTop: hp('2%'),
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('3%'),
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('3%'),
    borderRadius: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
  },
  imageWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('2%'),
    borderRadius: wp('25%'),
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  userName: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  userEmail: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: hp('2%'),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: wp('5%'),
    padding: wp('5%'),
    borderRadius: 15,
    marginBottom: hp('4%'),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: wp('5%'),
    padding: wp('5%'),
    borderRadius: 15,
    marginBottom: hp('4%'),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  detailTextContainer: {
    marginLeft: wp('4%'),
    flex: 1,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: hp('1.8%'),
  },
  detailValue: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginTop: hp('0.5%'),
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginHorizontal: wp('1%'),
    marginBottom: hp('4%'),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 25,
  },
  actionButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginLeft: wp('2%'),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,68,68,0.2)',
    marginHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: 25,
    marginBottom: hp('4%'),
  },
  logoutText: {
    color: '#ff4444',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginLeft: wp('2%'),
  },
});

export default Profile; 