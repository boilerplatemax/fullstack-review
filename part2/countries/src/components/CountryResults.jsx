import React from 'react'

const CountryResults = ({showResult,weather, filteredCountries}) => {
    
    if (filteredCountries.length > 10)
      return <p>Too many matches, please specifiy another filter</p>;

    if (filteredCountries.length === 1) {
      const result = filteredCountries[0];
      const languageNames = result.languages
        ? Object.values(result.languages)
        : [];

      return (
        <>
          <h2>{result.name.common}</h2>
          <p>Capital: {result.capital}</p>
          <p>Area: {result.area}</p>
          <h3>Languages</h3>
          <ul>
            {languageNames?.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <img src={result.flags.svg} style={{ width: "200px" }} />
          {weather ? (
            <div>
              <h3>
                Weather in{" "}
                {result.capital != null ? result.capital : result.name.common}
              </h3>
              <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
              />
              <p>Wind: {weather?.wind?.speed} m/s</p>
            </div>
          ) : (
            <></>
          )}
        </>
      );
    }

    if (filteredCountries.length === 0) {
      return <p>no results found</p>;
    }

    return (
      <>
        {filteredCountries.map((c) => (
          <div key={c.name.common}>
            <span>{c.name.common}</span>
            <button onClick={() => showResult(c.name.common)}>show</button>
          </div>
        ))}
      </>
    );
  };


export default CountryResults