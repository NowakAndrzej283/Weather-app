export const getWeatherByCity = async (city) => {
    //console.log('city fromm getWeatherBycity', city);
  
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
  
    console.log('geoResponse is', geoResponse)
    const geoData = await geoResponse.json();
    console.log('geoData is ', geoData);
  
    if (!geoData.results) return null;
  
    const lat = geoData?.results[0]?.latitude;
    const lon = geoData?.results[0]?.longitude;
    

    const cityChosen = geoData?.results[0]?.admin2;

    const country = geoData.results[0].country;
    //console.log('the country is: ', country);
    const region = geoData.results[0].admin1;
    //console.log('the region is: ', region);

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code`
    );

    if(!weatherResponse || weatherResponse.length === 0){
        throw new Error('No weather data returned');
      }
  
    const weatherData = await weatherResponse.json();
    //console.log('weatherData is', weatherData);
  
    return {
        weatherData,
        country,
        region,
        cityChosen
    }
  };