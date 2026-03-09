import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ImageBackground, Animated} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';

import { fetchWeather } from './services/Weather';
import { getWeatherByCity } from './services/WeatherCity';
import WeatherCard from './components/WeatherCard';
import Searchbar from './components/Searchbar';
import HoursCard from './components/HoursCard';

export default function App() {
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [city, setCity] = useState('');
  const [showHours, setShowHours] = useState(false);

  const cardAnim = useRef(new Animated.Value(200)).current;

  useEffect(()=>{
    if(data){
      // reset teh position
      //cardAnim.setValue(500);
      Animated.timing(cardAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setShowHours(true);
    }
  },[data])


  useEffect(() => {
    if(!city) return;
    //console.log("City updated:", city);
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
    //console.log('city from handleSearch', city);
    if(!city) return;
    const {weatherData, country, region, cityChosen} = await getWeatherByCity(city);
    //console.log('this is apiData', weatherData);
    let apiData = weatherData;

    const formattedData = apiData.hourly.time.map((time, index)=> ({
      id: index.toString(),
      time,
      temperature: apiData.hourly.temperature_2m[index],
      weatherCode: apiData.hourly.weather_code[index],
      country: country,
      region: region,
      cityChosen: cityChosen
    }));

    //console.log('formated data', formattedData);

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
            <Animated.View
              style={{
                transform: [{translateY: cardAnim}]
              }}
            >
              <WeatherCard data={data}/>
            </Animated.View>
            ):
            null
          }

          { hasSearched ? (
              <HoursCard data={data}/>
          ) : null
          }


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
