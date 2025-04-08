import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import Rest_API from '../../../Api';
const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
});

const NewPassword = ({ route }) => {
    const navigation = useNavigation();
    const { email } = route.params;
    const handleSubmit = async (values) => {
        try {
            const res = await axios.put(`http://${Rest_API}:9000/usersroute/changePassword`, {
                email,
                newPassword: values.newPassword
            });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password changed successfully'
            });

            navigation.navigate("Login");

        } catch (error) {
            console.error("Error:", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response?.data?.message || 'Something went wrong'
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ textAlign: 'center', marginLeft: 7 }} />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Please enter your new password and confirm it below.</Text>

                <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, submitForm }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#aaa"
                                secureTextEntry
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />
                            {touched.newPassword && errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="#aaa"
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                            <TouchableOpacity style={styles.button} onPress={submitForm}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1a1a1a',
        textAlign: 'center',
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
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
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
        marginBottom: 16,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 16,
    },
});

export default NewPassword;
