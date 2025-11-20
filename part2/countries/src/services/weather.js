import axios from "axios";

const getWeather =({country, key})=>{
    const coords = country.capitalInfo?.latlng || country.latlng;
    const [lat, lon] = coords;
     
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    return request.then(response=>response.data)
}
export {getWeather}