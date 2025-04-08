import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Rest_API from '../../Api';
const AddTest = ({ navigation }) => {
  const [testName, setTestName] = useState('');
  const [testLogo, setTestLogo] = useState(null);
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      },
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.assets && response.assets[0]) {
          setTestLogo(response.assets[0].uri);
        }
      }
    );
  };

  const saveTest = async () => {
    if (!testName.trim()) {
      Alert.alert('Error', 'Please enter a test name');
      return;
    }

    if (questions.length === 0) {
      Alert.alert('Error', 'Please add at least one question');
      return;
    }

    for (const q of questions) {
      if (!q.question.trim()) {
        Alert.alert('Error', 'Please fill in all questions');
        return;
      }
      if (!q.option1.trim() || !q.option2.trim() || !q.option3.trim() || !q.option4.trim()) {
        Alert.alert('Error', 'Please fill in all options');
        return;
      }
      if (!q.answer.trim()) {
        Alert.alert('Error', 'Please select the correct answer');
        return;
      }
    }

    try {
      const res = await axios.post(`http://${Rest_API}:9000/testroute/addtest`, {
        name: testName,
        logo: testLogo,
        questions: questions,
      });
      console.log("Test created successfully =", res);
      Alert.alert("Success", "Test created successfully");
      // const existingTests = await AsyncStorage.getItem('tests');
      // const tests = existingTests ? JSON.parse(existingTests) : [];
      
      // const newTest = {
      //   id: Date.now(),
      //   name: testName,
      //   logo: testLogo,
      //   questions: questions,
      //   createdAt: new Date().toISOString(),
      // };

      // await AsyncStorage.setItem('tests', JSON.stringify([...tests, newTest]));
      // Alert.alert('Success', 'Test created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving test:', error);
      Alert.alert('Error', 'Failed to save test');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add New Test</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Test Name</Text>
            <TextInput
              style={styles.input}
              value={testName}
              onChangeText={setTestName}
              placeholder="Enter test name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Test Logo</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
              {testLogo ? (
                <Image source={{ uri: testLogo }} style={styles.selectedImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Icon name="add-photo-alternate" size={40} color="#666" />
                  <Text style={styles.imagePlaceholderText}>Add Logo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.questionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Questions</Text>
              <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {questions.map((q, index) => (
              <View key={q.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>Question {index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => removeQuestion(q.id)}
                    style={styles.removeButton}
                  >
                    <Icon name="delete" size={24} color="#F44336" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.questionInput}
                  value={q.question}
                  onChangeText={(text) => updateQuestion(q.id, 'question', text)}
                  placeholder="Enter your question"
                />

                <View style={styles.optionsContainer}>
                  {['option1', 'option2', 'option3', 'option4'].map((option, optIndex) => (
                    <View key={option} style={styles.optionContainer}>
                      <TouchableOpacity
                        style={[
                          styles.optionRadio,
                          q.answer === option && styles.optionRadioSelected,
                        ]}
                        onPress={() => updateQuestion(q.id, 'answer', option)}
                      >
                        {q.answer === option && (
                          <Icon name="check" size={16} color="#fff" />
                        )}
                      </TouchableOpacity>
                      <TextInput
                        style={styles.optionInput}
                        value={q[option]}
                        onChangeText={(text) => updateQuestion(q.id, option, text)}
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveTest}>
        <Text style={styles.saveButtonText}>Save Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: '#666',
  },
  questionsSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  questionInput: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioSelected: {
    backgroundColor: '#2196F3',
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTest; 