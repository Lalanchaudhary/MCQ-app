import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OtpVerification = ({ route }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { otpCode, generateOtp ,email} = route.params;
    const navigation = useNavigation();
    const inputs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (value, index) => {
        if (/[^0-9]/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleSubmit = () => {
        if (otp.join('').length === 6) {
            if (otp.join('') === otpCode) {
                navigation.navigate("NewPasswordScreen",{email});
            }
            setError('');
        } else {
            setError('Please enter a valid 6-digit OTP');
        }
    };

    const handleResendOtp = () => {
        setTimer(60);
        setCanResend(false);
        generateOtp();
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ textAlign: 'center', marginLeft: 7 }} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>We sent an OTP to your registered email/phone. Enter it below.</Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => inputs.current[index] = el}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                            maxLength={1}
                            keyboardType="numeric"
                            textAlign="center"
                        />
                    ))}
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Text style={styles.timerText}>{timer > 0 ? `Resend OTP in ${timer}s` : 'You can now resend OTP'}</Text>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.resendButton, { opacity: canResend ? 1 : 0.5 }]} onPress={handleResendOtp} disabled={!canResend}>
                    <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    backIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        marginHorizontal: 5,
        color: '#333',
    },
    timerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 56,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    resendButton: {
        marginTop: 16,
        padding: 10,
    },
    resendButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 16,
    },
});

export default OtpVerification;