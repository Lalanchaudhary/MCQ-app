import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import forgot from '../../../Assets/forgot.png'
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import Rest_API from '../../../Api';
const EmailScreen = () => {
    const [input, setInput] = useState('');
    const [otp, setOtp] = useState(null);
  const navigation = useNavigation();
    // Function to generate a random 6-digit OTP
    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleReset = () => {
        if (input) {
            // Generate OTP and set it in the state
            const otpCode = generateOtp();
            setOtp(otpCode);
            console.log('OTP generated:', otpCode); // You can replace this with an API call to send the OTP to the user

            // You can also trigger your API logic here to send the OTP to the user's email or phone number.
        } else {
            console.log('Please enter a valid email or phone number.');
        }
    };

    const HandleSubmit=async()=>{
        const otpCode = generateOtp();
        try{
            const res=await axios.post(`http://${Rest_API}:9000/usersroute/sendemail`,{
                email:input,
                otp:otpCode
            })
            navigation.navigate("OtpScreen",{otpCode:otpCode ,generateOtp:HandleSubmit ,email:input});
                  Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Otp Sent'
                  });

            console.log('====================================');
            console.log(res.data.messageId);
            console.log('====================================');
        }catch(error){
            console.log('====================================');
            console.log(error);
            console.log('====================================');
                  Toast.show({
                    type: 'error',
                    text1: 'Login Error',
                    text2: error.response?.data?.message || 'Something went wrong'
                  });
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
                  <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ textAlign: 'center', marginLeft: 7 }} />
                  </TouchableOpacity>
            <View style={styles.contentContainer}>

                <Image
                    source={forgot} // Add this image to your assets
                    style={styles.image}
                    resizeMode="contain"
                /> 
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                    Don't worry! It happens. Please enter the email or phone number associated with your account.
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or Phone Number"
                        placeholderTextColor="#aaa"
                        value={input}
                        onChangeText={setInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={HandleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                {otp && (
                    <View style={styles.otpContainer}>
                        <Text style={styles.otpText}>Your OTP is: {otp}</Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop:60
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        padding: 24,
    },
    backIcon:{
        position:'absolute',
        top:15,
        left:15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15
      },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1a1a1a',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 56,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
        color: '#333',
    },
    button: {
        width: '100%',
        height: 56,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    backButton: {
        marginTop: 16,
        padding: 8,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
    otpContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    otpText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default EmailScreen;