import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import google from '../../../Assets/google.png';
import facebook from '../../../Assets/facebook.png';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import Rest_API from '../../../Api';
import LinearGradient from 'react-native-linear-gradient';
import LoaderKit from 'react-native-loader-kit';
const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Can be email or phone
  const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  // const Rest_API = Config.Rest_API;
  GoogleSignin.configure({
    webClientId: '1026643049265-lodjp4378tvsguu7ojiohi32sf3mvr92.apps.googleusercontent.com',
  });

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Email/Phone and password are required!');
      return;
    }

    try {
      const response = await axios.post(`http://${Rest_API}:9000/usersroute/login`, { identifier, password });
      // Alert.alert('Success', response.data.message);
      await AsyncStorage.setItem('userId', response.data.userId);
      // Navigate to home or dashboard
      navigation.navigate("Dashboard")
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.data.message || 'Login Successfully'
      });
    } catch (error) {
      // Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.response?.data?.message || 'Something went wrong'
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();

      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();

      // Create a Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);

      // Get the signed-in user details
      const user = userCredential.user;
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login Successfully'
      });

      console.log('User Info:', user);

      return user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.message || 'Something went wrong'
      });
    }
  };


  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (result.isCancelled) {
        console.log("Login cancelled");
        return;
      }
  
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error("Failed to get access token");
      }
  
      console.log(data);
  
      const response = await fetch(`https://graph.facebook.com/v2.5/me?fields=id,email,first_name,last_name,picture.type(large)&access_token=${data.accessToken}`);
      const json = await response.json();
  
      console.log('ID:', json.id);
      console.log('Email:', json.email);
      console.log('First Name:', json.first_name);
      console.log('Last Name:', json.last_name);
      console.log('Profile Picture URL:', json.picture.data.url);
      setIsLoading(true)
  
      try {
        const res = await axios.post(`http://${Rest_API}:9000/usersroute/signupwithfacebook`, {
          name: `${json.first_name} ${json.last_name}`,
          email: json.email,
          image: json.picture.data.url
        });
  
        if (res.status === 200 && res.data.userId) {
          await AsyncStorage.setItem('userId', res.data.userId);
          navigation.navigate('AccountSetup');
        } else {
          throw new Error("Signup failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: 'Something went wrong during signup'
        });
        return; // Stop further execution if signup fails
      }
  
      // Navigate to Dashboard only if signup was successful
      navigation.navigate('Dashboard', { profileImage: json.picture.data.url });
  
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login Successfully'
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.message || 'Something went wrong'
      });
    }
    finally{
      setIsLoading(false)
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoaderKit
          style={{ width: 50, height: 50 }}
          name={'BallPulse'}
          color={'black'}
        />
      </View>
    );
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
      <Text style={[styles.title, { color: 'white' }]}>Login</Text>
      <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.8)' }]}>Join our community and experience a seamless experience.</Text>

      {/* Email or Phone Input */}
      <Text style={[styles.label, { color: 'white' }]}>Email or Phone</Text>
      <TextInput
        style={[styles.input, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }]}
        placeholder="Enter your email or phone"
        placeholderTextColor="rgba(255,255,255,0.5)"
        onChangeText={setIdentifier}
        value={identifier}
      />

      {/* Password Input */}
      <Text style={[styles.label, { color: 'white' }]}>Password</Text>
      <View style={[styles.passwordContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
        <TextInput
          style={[styles.passwordInput, { color: 'white' }]}
          placeholder="Enter your password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => { navigation.navigate("ForgotScreen") }}>
        <Text style={[styles.forgotPassword, { color: 'rgba(255,255,255,0.9)' }]}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.continueButton, { backgroundColor: 'white' }]} 
        onPress={handleLogin}
      >
        <Text style={[styles.continueText, { color: '#4c669f' }]}>Continue</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={[styles.orText, { color: 'white' }]}>or</Text>

      {/* Google Login */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]} onPress={signInWithGoogle}>
        <Image source={google} style={{ height: hp('5%'), width: wp('7%') }} />
        <Text style={[styles.socialText, { color: 'white' }]}>Login with Google</Text>
      </TouchableOpacity>

      {/* Facebook Login */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]} onPress={onFacebookButtonPress}>
        <Image source={facebook} style={{ height: hp('5%'), width: wp('7%') }} />
        <Text style={[styles.socialText, { color: 'white' }]}>Login with Facebook</Text>
      </TouchableOpacity>

      {/* Register */}
      <Text style={[styles.registerText, { color: 'rgba(255,255,255,0.9)' }]}>
        Haven't registered yet? <Text style={[styles.registerLink, { color: 'white', fontWeight: 'bold' }]} onPress={() => navigation.navigate("Signup")}>
          Register
        </Text>
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
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
    fontSize: hp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: hp('2%'),
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: hp('2%'),
    fontWeight: '600',
    marginTop: hp('2%'),
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: hp('1%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: hp('1.5%'),
    marginTop: hp('1%'),
  },
  passwordInput: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
  },
  continueButton: {
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  continueText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    marginVertical: hp('2%'),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('1.5%'),
    borderRadius: 12,
    marginVertical: hp('1%'),
    borderWidth: 1,
  },
  socialText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginLeft: wp('3%'),
  },
  registerText: {
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  registerLink: {
    color: 'blue',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
});

export default Login;
