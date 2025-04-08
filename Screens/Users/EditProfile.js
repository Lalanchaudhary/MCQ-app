import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Rest_API from '../../Api';
import * as ImagePicker from 'react-native-image-picker';

const EditProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: null,
    dob: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    }, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        Alert.alert('Error', 'Failed to pick image');
        return;
      }
      setUser({ ...user, image: response.assets[0].uri });
    });
  };

  const handleSave = async () => {
    if (!user.name || !user.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('dob', user.dob);
      formData.append('gender', user.gender);
      if (user.image && typeof user.image === 'string') {
        formData.append('image', {
          uri: user.image,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      await axios.put(`http://${Rest_API}:9000/usersroute/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <TouchableOpacity 
          style={styles.profileImageContainer}
          onPress={handleImagePick}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={user.image ? { uri: user.image } : require('../../Assets/logo.png')}
              style={styles.profileImage}
            />
            <View style={styles.editImageOverlay}>
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="cake" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={user.dob}
              onChangeText={(text) => setUser({ ...user, dob: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="wc" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={user.gender}
              onChangeText={(text) => setUser({ ...user, gender: text })}
            />
          </View>
        </View>
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
  saveButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: wp('2%'),
    borderRadius: wp('25%'),
  },
  profileImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: wp('3%'),
    borderRadius: wp('5%'),
  },
  formContainer: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('4%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: wp('4%'),
    borderRadius: 15,
    marginBottom: hp('2%'),
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: hp('2%'),
    marginLeft: wp('3%'),
  },
});

export default EditProfile; 