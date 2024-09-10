export const appConfig ={
    defaultUnit: 'metric',
    defaultCity: {
        coord: {
          latitude: 19.0144,
          longitude: 72.8479
        //   latitude: 51.509865,
        //   longitude: -0.118092
        }
      }
};

export const apiConfig = {
    host: 'https://api.openweathermap.org/data/2.5',
    appId : 'a4674c091cdf4296c1c69451fd036d2f',
    measurementUnits:{
        metric:{
            temperature: 'C',
            windSpeed: 'm/s',
            pressure: 'mmHg'
        },
        imperial: {
            temperature: 'F',
            windSpeed: 'mil/h',
            pressure: 'hPa'
        }
    },
    amountForecastDays: 16,
    updateInterval:{
        forecast: 300000,
        weather: 300000 // 5 minutes
    }
};