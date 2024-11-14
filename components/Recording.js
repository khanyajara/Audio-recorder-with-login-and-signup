import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';

export default function RecordingsScreen({ navigation }) {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email'); 
      setEmail(storedEmail);
      if (storedEmail) {
        loadRecordings(storedEmail); 
      }
    };
    fetchEmail();
  }, []);

  async function loadRecordings(email) {
    const storedRecordings = await AsyncStorage.getItem(email) || '[]';
    setRecordings(JSON.parse(storedRecordings));
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const newRecording = {
        id: Date.now().toString(),
        uri,
        date: new Date().toLocaleString(),
      };
      setRecording(null);

      const updatedRecordings = [...recordings, newRecording];
      setRecordings(updatedRecordings);

      await AsyncStorage.setItem(email, JSON.stringify(updatedRecordings));
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }

  async function handleRecording() {
    if (recording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }

  async function playRecording(recording) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: recording.uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Playback error:', error);
    }
  }

  async function deleteRecording(id) {
    const updatedRecordings = recordings.filter((rec) => rec.id !== id);
    setRecordings(updatedRecordings);

    await AsyncStorage.setItem(email, JSON.stringify(updatedRecordings));
  }

  const filteredRecordings = recordings.filter((rec) =>
    rec.date.includes(searchTerm)
  );

  const shareRecording = async (recording) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(recording.uri);
    } else {
      console.log("Sharing is not available on this device");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.recordingItem}>
      <Text style={styles.recordingText}>{item.date}</Text>
      <View style={styles.recordingButtons}>
        <TouchableOpacity style={styles.playButton} onPress={() => playRecording(item)}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecording(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={() => shareRecording(item)}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('email'); 
      navigation.replace('Login'); 
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleFeedback = () => {
    navigation.navigate('Feedback');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by date"
        placeholderTextColor="#888"
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.recordButton} onPress={handleRecording}>
        <Text style={styles.recordButtonText}>{recording ? "Stop Recording" : "New Voice Note"}</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredRecordings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        style={styles.recordingsList}
      />
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      
      <View>
        <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
          <Text style={styles.buttonText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.privacyPolicyButton} onPress={handlePrivacyPolicy}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  searchInput: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  recordButton: {
    backgroundColor: '#f94144',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recordingsList: {
    marginTop: 15,
  },
  recordingItem: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  recordingText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  recordingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  shareButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 90,
  },
  logoutButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    width: 80,
  },
  feedbackButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  privacyPolicyButton: {
    backgroundColor: '#f1c40f',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
