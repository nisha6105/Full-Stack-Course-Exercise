import axios from 'axios'

const baseUrl='https://api.openweathermap.org/data/2.5/weather'

const getWeather=(city)=>{
    const aptKey=import.meta.env.VITE_WEATHER_API_KEY

    const request=axios.get(baseUrl, {
        params:{
            q:city,
            units:'metric',
            appid:apiKey
        }
    })
    return request.then(response=>response.data)
}
export default { getWeather }