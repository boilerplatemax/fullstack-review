import { useState, useEffect } from "react";
import CountryResults from "./components/CountryResults";
import { getAllCountries } from "./services/countries";
import { getWeather } from "./services/weather";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_weather_key = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    getAllCountries().then(
      response=>setCountries(response)
    )
  }, []);
  const filteredCountries = countries?.filter(c =>
  c.name.common.toLowerCase().includes(search.toLowerCase())
) || [];


  useEffect(() => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    if (selectedCountry?.name?.common === country?.name?.common) return;
    setSelectedCountry(country);
  } else {
    setSelectedCountry(null);
  }
}, [filteredCountries, selectedCountry]);


  useEffect(()=>{
    if(!selectedCountry){return}
    else{
      setWeather(null);
    }
    
    getWeather({country:selectedCountry,key:api_weather_key}).then((response) => setWeather(response));
    
  },[selectedCountry])

  const handleInputChange = (e) => {
    const currentSearch = e.target.value;
    setSearch(currentSearch);
  };

  const showResult = (country) => {
    setSearch(country);
  };



  
  if (!countries) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <p>find countries</p>
        <input onChange={(e) => handleInputChange(e)} value={search} />

        <CountryResults showResult={showResult} weather={weather} filteredCountries={filteredCountries}/>
      </div>
    </div>
  );
};

export default App;
