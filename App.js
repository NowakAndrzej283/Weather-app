import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { fetchWeather } from './services/Weather';
import { getWeatherByCity } from './services/WeatherCity';
import WeatherCard from './components/WeatherCard';
import Searchbar from './components/Searchbar';

export default function App() {
  const [weather, setWeather] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [city, setCity] = useState('');

  const isViewDisabled = city.length === 0
 

  // const handleCheckWeather = async()=> {
  //   const data = await fetchWeather();
  //   console.log('data from API',data);

  //   const formattedData = data.hourly.time.map((time, index)=> ({
  //     id: index.toString(),
  //     time,
  //     temperature: data.hourly.temperature_2m[index],
  //     weatherCode: data.hourly.weather_code[index]
  //   }));
  //   setWeather(formattedData);
  //   setIsDisabled(true);
  //   setData(formattedData);
  // };

  useEffect(() => {
    if(!city) return;
    console.log("City updated:", city);
    const checkCity = async()=>{
      try{
        setHasSearched(true);
        await handleSearch();
      }catch(error){
        console.log(error);
      }

    }

    checkCity();
    return function(){
      console.log('cleanup');
    }    
  }, [city]);




  const handleSearch = async()=>{
    console.log('city from handleSearch', city);
    if(!city) return;
    const {weatherData, country, region, cityChosen} = await getWeatherByCity(city);
    console.log('this is apiData', weatherData);
    let apiData = weatherData;
    console.log('country isssss: ', country);

    const formattedData = apiData.hourly.time.map((time, index)=> ({
      id: index.toString(),
      time,
      temperature: apiData.hourly.temperature_2m[index],
      weatherCode: apiData.hourly.weather_code[index],
      country: country,
      region: region,
      cityChosen: cityChosen
    }));

    console.log('formated data', formattedData);


    setHasSearched(true);
    setData(formattedData);
    
  };



  return (
      <LinearGradient colors={['#a4e0bd',  '#0e2425']} style={styles.mainContainer}>
          <ImageBackground 
            source={require('./assets/images/main-page-background.jpg')} 
            resizeMode='cover'
            style={styles.container} 
            imageStyle={styles.backgroundImage}
          >
          <Searchbar 
            setCity={setCity}
            onSearch={handleSearch}
          />

          {city ? (
            <WeatherCard data={data}/>
            ):
            null
          }
          {/* <Pressable  style={({pressed}) => 
            pressed ? styles.pressed : styles.card}
            onPress={handleCheckWeather}
            
            
          >
            {isButtonPressed && data && <WeatherCard data={data}/>}

          </Pressable> */}

          {/* <Pressable  style={({pressed}) => 
            pressed ? styles.pressed : styles.card}
            onPress={handleCheckWeather}
            disabled={isDisabled}
          >
            {isButtonPressed && data && <WeatherCard data={data}/>}

          </Pressable> */}
          </ImageBackground>
        </LinearGradient>
        
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
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
  backgroundImage: {
    opacity: 0.4
  },
  pressed: {
    opacity: 0.15,

  },
  info: {
    flex: 1,
    backgroundColor: "black"
  }

});
