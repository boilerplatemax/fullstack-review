import axios from "axios";

const getAllCountries =()=>{
    const baseUrl='https://studies.cs.helsinki.fi/restcountries/api/all'

    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}
export {getAllCountries}