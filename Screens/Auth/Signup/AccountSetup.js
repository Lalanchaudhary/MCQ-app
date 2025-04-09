import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, 
  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';

const AccountSetup = () => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').required('Name is required'),
    dob: Yup.string().required('Birth Date is required'),
    gender: Yup.string().required('Select your gender'),
  });

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#48ADD7', '#AE4BE1', '#252C7D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
          >
            <Formik
              initialValues={{
                name: '',
                dob: '',
                gender: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("ProfileImage", { formData: values });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View>
                  {/* Back Button */}
                  <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" style={{ textAlign: 'center', marginLeft: 7 }} />
                  </TouchableOpacity>

                  <Text style={[styles.title, { color: 'white' }]}>Setup Account</Text>
                  <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.8)' }]}>Let's complete your account</Text>

                  {/* Name Input */}
                  <Text style={[styles.label, { color: 'white' }]}>Name</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }]}
                    placeholder="Enter your name"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                  {/* Birth Date Picker */}
                  <Text style={[styles.label, { color: 'white' }]}>Birth Date</Text>
                  <TouchableOpacity 
                    style={[styles.datePicker, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]} 
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ color: values.dob ? "white" : "rgba(255,255,255,0.5)" }}>
                      {values.dob || "DD/MM/YYYY"}
                    </Text>
                    <MaterialIcons name="calendar-today" size={20} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                  
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, date) => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (date) {
                          setSelectedDate(date);
                          setFieldValue('dob', formatDate(date));
                        }
                      }}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)}
                    />
                  )}
                  {touched.dob && errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

                  {/* Gender Dropdown */}
                  <Text style={[styles.label, { color: 'white' }]}>Gender</Text>
                  <View style={[styles.pickerContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
                    <Picker
                      selectedValue={values.gender}
                      onValueChange={(value) => setFieldValue('gender', value)}
                      style={{ color: 'white' }}
                    >
                      <Picker.Item label="Select Gender" value="" color="black" />
                      <Picker.Item label="Male" value="male" color="black" />
                      <Picker.Item label="Female" value="female" color="black" />
                      <Picker.Item label="Other" value="other" color="black" />
                    </Picker>
                  </View>
                  {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                  {/* Continue Button */}
                  <TouchableOpacity 
                    style={[styles.continueButton, { backgroundColor: 'white' }]} 
                    onPress={handleSubmit}
                  >
                    <Text style={[styles.continueText, { color: '#4c669f' }]}>Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
    borderRadius: 15,
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
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    justifyContent: 'space-between',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: hp('1%'),
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
  errorText: {
    color: 'red',
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
  },
});

export default AccountSetup;
