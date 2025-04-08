import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import LoaderKit from 'react-native-loader-kit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import CountryPicker from 'react-native-country-picker-modal';
import LinearGradient from 'react-native-linear-gradient';
import Rest_API from '../../../Api';

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const navigation = useNavigation();
  // Form State Object
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }}>
          <LinearGradient
            colors={['#48ADD7', '#AE4BE1', '#252C7D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
          >
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={20} color="white" style={{ textAlign: 'center', marginLeft: 7 }} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: 'white' }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.8)' }]}>Join our community and experience seamless connections.</Text>

            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              validateOnMount={true}
              onSubmit={async (values) => {
                setLoading(true);
                
                if (!checked) {
                  alert('Please accept the terms and conditions.');
                  setLoading(false);
                  return;
                }
                
                try {
                  const res = await axios.post(`http://${Rest_API}:9000/usersroute/signup`, formData);
                  if(res.status===200){
                    await AsyncStorage.setItem('userId',res.data.userId);
                    navigation.navigate('AccountSetup');
                  }
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User Created'
      });
                } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.message || 'Something went wrong'
      });
                } finally {
                  setLoading(false);
                }
              }}
              
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
                <>
                  <Text style={[styles.label, { color: 'white' }]}>Phone</Text>
                  <View style={styles.phoneContainer}>
                    <TouchableOpacity 
                      style={[styles.countryPickerButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}
                      onPress={() => setShowCountryPicker(true)}
                    >
                      <CountryPicker
                        countryCode={countryCode}
                        withFlag
                        withCallingCode
                        withFilter
                        withAlphaFilter
                        visible={showCountryPicker}
                        onSelect={(country) => {
                          setCountryCode(country.cca2);
                          setCallingCode(country.callingCode[0]);
                          setShowCountryPicker(false);
                        }}
                        onClose={() => setShowCountryPicker(false)}
                      />
                      <Text style={[styles.callingCode, { color: 'white' }]}>+{callingCode}</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.phoneInput, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }]}
                      placeholder="Enter your number"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        setFieldValue('phone', text);
                        setFormData((prev) => ({ ...prev, phone: text }));
                      }}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </View>
                  {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                  <Text style={[styles.label, { color: 'white' }]}>Email</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }]}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    onChangeText={(text) => {
                      setFieldValue('email', text);
                      setFormData((prev) => ({ ...prev, email: text }));
                    }}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <Text style={[styles.label, { color: 'white' }]}>Password</Text>
                  <View style={[styles.passwordContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
                    <TextInput
                      style={[styles.passwordInput, { color: 'white' }]}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => {
                        setFieldValue('password', text);
                        setFormData((prev) => ({ ...prev, password: text }));
                      }}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                  <Text style={[styles.label, { color: 'white' }]}>Confirm Password</Text>
                  <View style={[styles.passwordContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
                    <TextInput
                      style={[styles.passwordInput, { color: 'white' }]}
                      placeholder="Confirm your password"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      secureTextEntry={!showConfirmPassword}
                      onChangeText={(text) => {
                        setFieldValue('confirmPassword', text);
                      }}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={20} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(!checked)}
                      color="white"
                      uncheckedColor="rgba(255,255,255,0.7)"
                    />
                    <Text style={[styles.checkboxText, { color: 'rgba(255,255,255,0.9)' }]}>I agree to the terms and conditions.</Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      { backgroundColor: isValid ? 'white' : 'rgba(255,255,255,0.5)' },
                    ]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text style={[styles.continueText, { color: isValid ? '#4c669f' : 'rgba(0,0,0,0.5)' }]}>
                      {loading ? <LoaderKit
                        style={{ width: 50, height: 30 }}
                        name={'BallPulse'}
                        color={'#4c669f'}
                      /> : 'Continue'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <Text style={[styles.loginText, { color: 'rgba(255,255,255,0.9)' }]}>
              Already have an account? <Text style={[styles.loginLink, { color: 'white' }]} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
          </LinearGradient>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
    minHeight: hp('100%'),
    paddingBottom: hp('10%'),
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
    color: '#777',
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: hp('2%'),
    fontWeight: '600',
    marginTop: hp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color: '#000'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },
  passwordInput: {
    flex: 1,
    color: '#000'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp('2%'),
  },
  checkboxText: {
    fontSize: hp('1.8%'),
    color: '#555',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#ddd',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  continueText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    marginVertical: hp('2%'),
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: hp('1.8%'),
    marginTop: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    marginRight: 8,
  },
  callingCode: {
    marginLeft: 4,
    fontSize: hp('2%'),
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    fontSize: hp('2%'),
    color: '#000',
  },
});

export default Signup;
