import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from 'react';

import { fetchWeather } from './services/Weather';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [weather, setWeather] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleCheckWeather = async()=> {
    const data = await fetchWeather();
    console.log('data from API',data);

    const formattedData = data.hourly.time.map((time, index)=> ({
      id: index.toString(),
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index]
    }));
    setWeather(formattedData);
    setIsDisabled(true);
    setData(formattedData);
    

  };


  return (
      <LinearGradient colors={['#4dbcc4',  '#0e2425']} style={styles.mainContainer}>
        <Pressable  style={({pressed}) => 
          pressed ? styles.pressed : styles.card}
          onPress={handleCheckWeather}
          disabled={isDisabled}
        >
          {isButtonPressed} ? <WeatherCard data={data}/> : <></>

        </Pressable>

        <Pressable  style={({pressed}) => 
          pressed ? styles.pressed : styles.card}
          onPress={handleCheckWeather}
          disabled={isDisabled}
        >
          {isButtonPressed} ? <WeatherCard data={data}/> : <></>

        </Pressable>

        </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'yellow',
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  pressed: {
    opacity: 0.75,

  },
  info: {
    flex: 1,
    backgroundColor: "black"
  }

});
