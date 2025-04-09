import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Rest_API from '../../Api';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Refresh tests when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTests();
    }, [])
  );

  const fetchTests = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first
      const response = await axios.get(`http://${Rest_API}:9000/testroute/alltests`);
      setTests(response.data.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching tests:', error);
      // Try to get from AsyncStorage as fallback
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (testId) => {
    Alert.alert(
      'Delete Test',
      'Are you sure you want to delete this test?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // Try to delete from API
              await axios.delete(`http://${Rest_API}:9000/testroute/deletetest/${testId}`);
              
              // Update local state
              const updatedTests = tests.filter(test => test._id !== testId && test.id !== testId);
              setTests(updatedTests);
              
              // Update AsyncStorage
              await AsyncStorage.setItem('tests', JSON.stringify(updatedTests));
              
              Alert.alert('Success', 'Test deleted successfully');
            } catch (error) {
              console.error('Error deleting test:', error);
              Alert.alert('Error', 'Failed to delete test');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToAddTest = () => {
    navigation.navigate('AddTest');
  };

  const navigateToEditTest = (test) => {
    navigation.navigate('AddTest', { testData: test });
  };

  const getQuestionCount = (test) => {
    if (!test.questions) return 0;
    
    if (Array.isArray(test.questions)) {
      return test.questions.length;
    }
    
    // Handle case where questions might be stored as a JSON string
    try {
      const parsedQuestions = typeof test.questions === 'string' 
        ? JSON.parse(test.questions) 
        : test.questions;
      return Array.isArray(parsedQuestions) ? parsedQuestions.length : 0;
    } catch (e) {
      return 0;
    }
  };

  const renderTestItem = ({ item }) => (
    <View style={styles.testCard}>
      <Image
        source={{ uri: `http://${Rest_API}:9000/${item.image}` }}
        style={styles.testLogo}
      />
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{item.name}</Text>
        <Text style={styles.questionCount}>{getQuestionCount(item)} questions</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigateToEditTest(item)}
        >
          <Icon name="edit" size={24} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteTest(item._id || item.id)}
        >
          <Icon name="delete" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading tests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tests</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={navigateToAddTest}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {tests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="quiz" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No tests found</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={navigateToAddTest}
          >
            <Text style={styles.createButtonText}>Create Test</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={tests}
          renderItem={renderTestItem}
          keyExtractor={(item) => item._id || item.id || String(Math.random())}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={fetchTests}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  testLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  testInfo: {
    flex: 1,
    marginLeft: 16,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questionCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TestList; 