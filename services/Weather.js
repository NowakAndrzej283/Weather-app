// importing openmeteo
import {fetchWeatherApi} from 'openmeteo';


// export const fetchWeather = async () => {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    hourly: 'temperature_2m'
  };
  
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = fetchWeatherApi(url, params);
  
  const response = responses[0];
  
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();
  
  console.log(
      `\nCoordinates: ${latitude}N ${longitude}E`,
      `\nElevation: ${elevation}m asl`,
      `\nTimezone difference to GMT+0: ${utcOffsetSeconds}`
  );
  
  const hourly = response.hourly();
  
  const weatherData = {
    time: Array.from(
      {
        length:
        (Number(hourly.timeEnd()) - Number(hourly.time()))/
        hourly.interval()
      },
      (_, i) => 
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000
      ),
    )};

    const temperature =  hourly.variables(0).valuesArray();
    //const weatherCode = hourly.variables(1).valuesArray();
    
    export function fetchWeather(){
        return {
          time: weatherData,
          temperature,
          //weatherCode
        };
    }
  


  // return {
  //   time: weatherData,
  //   temperature,
  //   //weatherCode
  // };
// };




