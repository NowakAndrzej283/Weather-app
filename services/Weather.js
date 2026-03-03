export const fetchWeather = async () => {
  let response;

  // Warsaw Coordinates
  const params = {
    latitude: 52.22,
    longitude: 21.01,
    hourly: 'temperature_2m'
  };

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=temperature_2m,weather_code`;;

  response = await fetch(url);

  if(!response || response.length === 0){
    throw new Error('No weather data returned');
  }

  console.log('RESPONSES', response);
  const data = await response.json();

  console.log('weather data : ', data);
  
  return data;
};




