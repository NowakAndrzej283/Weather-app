import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

import { fetchWeather } from './services/Weather';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [weather, setWeather] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState([]);

  const handleCheckWeather = async()=> {
    const data = await fetchWeather();
    console.log(data);

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
    <View style={styles.mainContainer}>
        <Pressable  style={({pressed}) => 
          pressed ? styles.pressed : styles.card
        }
        onPress={handleCheckWeather}
        >
          <WeatherCard data={data}/>
        </Pressable>


        <Pressable style={({pressed}) => 
           pressed && styles.pressed
        } 
          onPress={handleCheckWeather} disabled={isDisabled}>
          <Text>Tap to check the app.</Text>
        </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4dbcc4',
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
