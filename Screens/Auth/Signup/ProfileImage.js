import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Rest_API from '../../../Api';

const ProfileImage = ({route }) => {
  const {formData}=route.params;
  console.log('====================================');
  console.log(formData);
  console.log('====================================');
  const [photo, setPhoto] = useState(null);
  const navigation=useNavigation();
  // Function to pick an image
  const choosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const HandleWithPhoto = async () => {
    const userId = await AsyncStorage.getItem('userId');
  
    const data = new FormData();
  
    // Append other formData fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
  
    // Append image only if selected
    if (photo) {
      data.append('profileImage', {
        uri: photo,
        name: 'profile.jpg', // or extract from photo itself if needed
        type: 'image/jpeg',
      });
    }
  
    try {
      const res = await axios.put(`http://${Rest_API}:9000/usersroute/setup/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User Registered Successfully',
      });
  
      navigation.navigate('Dashboard');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Error',
        text2: error.message || 'Something went wrong',
      });
    }
  };
  

  const HandleLater=async()=>{
    const userId = await AsyncStorage.getItem('userId');
    try{
      const res=await axios.put(`http://${Rest_API}:9000/usersroute/setup/${userId}`,formData)
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'User Register Successfully'
            });
      navigation.navigate('Dashboard');
    }catch(err){
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.message || 'Something went wrong'
      });
    }
  }

  return (
    <LinearGradient
      colors={['#48ADD7', '#AE4BE1', '#252C7D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={20} color="white" style={{ textAlign: 'center', marginLeft: 7 }} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: 'white' }]}>Upload Profile Photo</Text>
      <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.8)' }]}>Choose from your gallery</Text>

      {/* Profile Photo Upload Box */}
      <TouchableOpacity 
        style={[styles.imageContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]} 
        onPress={choosePhoto}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Text style={[styles.imagePlaceholder, { color: 'rgba(255,255,255,0.7)' }]}>
            <Profile name='user' style={{ fontSize: 150, color: 'rgba(255,255,255,0.7)' }} />
          </Text>
        )}
      </TouchableOpacity>

      <Text style={[styles.infoText, { color: 'rgba(255,255,255,0.8)' }]}>1 profile photo required</Text>

      {/* Buttons */}
      <TouchableOpacity 
        style={[styles.choosePhotoButton, { backgroundColor: 'white' }]} 
        onPress={choosePhoto}
      >
        <Text style={[styles.choosePhotoText, { color: '#4c669f' }]}>Choose a photo</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.maybeLaterButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]} 
        onPress={HandleLater}
      >
        <Text style={[styles.maybeLaterText, { color: 'white' }]}>Maybe later</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
    paddingBottom: hp('10%'),
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: hp('2%'),
    color: '#777',
    marginBottom: hp('3%'),
  },
  imageContainer: {
    width: wp('60%'),
    height: hp('30%'),
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholder: {
    fontSize: hp('5%'),
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoText: {
    fontSize: hp('1.8%'),
    color: '#888',
    marginBottom: hp('2%'),
  },
  choosePhotoButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  choosePhotoText: {
    fontSize: hp('2.2%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  maybeLaterButton: {
    backgroundColor: '#ddd',
    paddingVertical: hp('2%'),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  maybeLaterText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default ProfileImage;
