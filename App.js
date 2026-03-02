import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { fetchWeather } from './services/Weather';

export default function App() {
  const handleCheckWeather = ()=> {
    fetchWeather();
  };


  return (
    <View style={styles.maincontainer}>
        <Pressable style={styles.button} onPress={handleCheckWeather}>
          <Text>Tap to check the app.</Text>
        </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    backgroundColor: 'yellow',
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
    margin: 10
  }
});
