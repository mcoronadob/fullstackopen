import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Cargar todos los países al inicio
  useEffect(() => {
    console.log('Cargando todos los países...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error cargando países:', error)
        setLoading(false)
        setMessage('Error cargando datos. Intenta recargar la página.')
      })
  }, [])

  // Filtrar países en tiempo real
  useEffect(() => {
    if (value.trim() === '') {
      setFilteredCountries([])
      setMessage('')
      setSelectedCountry(null)
    } else {
      const filtered = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
      
      if (filtered.length > 10) {
        setMessage('Too many matches, specify another filter')
        setFilteredCountries([])
        setSelectedCountry(null)
      } else if (filtered.length === 0) {
        setMessage('No countries found.')
        setFilteredCountries([])
        setSelectedCountry(null)
      } else {
        setMessage('')
        setFilteredCountries(filtered)
        if (filtered.length === 1) {
          setSelectedCountry(filtered[0])
        } else {
          setSelectedCountry(null)
        }
      }
    }
  }, [value, allCountries])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  if (loading) {
    return <div>Cargando países...</div>
  }

  return (
    <div>
      <form>
        Find Countries: <input value={value} onChange={handleChange} />
      </form>
      
      {message && <p>{message}</p>}
      
      {/* Mostrar detalles si hay un país seleccionado */}
      {selectedCountry && (
        <CountryDetails country={selectedCountry} />
      )}
      
      {/* Mostrar lista con botones si hay 2-10 países y ninguno seleccionado */}
      {!selectedCountry && filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button 
                onClick={() => handleShowCountry(country)}
                style={{ marginLeft: '10px' }}
              >
                show
              </button>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  )
}

// Componente que muestra los detalles del país + clima
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState(null)

  // Obtener el clima de la capital
  useEffect(() => {
    const capital = country.capital?.[0]
    
    if (!capital) {
      setWeatherLoading(false)
      setWeatherError('No hay capital definida para este país')
      return
    }

    console.log(`Obteniendo clima para ${capital}...`)
    
    // Usar la variable de entorno para la API key
    const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
    
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
        setWeatherLoading(false)
      })
      .catch(error => {
        console.error('Error obteniendo clima:', error)
        setWeatherError('No se pudo obtener el clima')
        setWeatherLoading(false)
      })
  }, [country])

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '10px' }}>
      <h2>{country.name.common}</h2>
      
      <p><strong>Capital:</strong> {country.capital?.[0] || 'No disponible'}</p>
      <p><strong>Población:</strong> {country.population?.toLocaleString() || 'No disponible'}</p>
      
      {/* Bandera del país */}
      {country.flags?.svg && (
        <img 
          src={country.flags.svg} 
          alt={`Bandera de ${country.name.common}`}
          style={{ width: '200px', border: '1px solid #ddd' }}
        />
      )}
      
      <p><strong>Idioma(s):</strong></p>
      <ul>
        {country.languages && 
          Object.values(country.languages).map((lang, index) => (
            <li key={index}>{lang}</li>
          ))
        }
      </ul>
      
      {/* ┌─────────────────────────────────────────────────────────┐ */
      /* │ SECCIÓN DEL CLIMA                                      │ */
      /* └─────────────────────────────────────────────────────────┘ */}
      
      <h3>Clima en {country.capital?.[0]}</h3>
      
      {weatherLoading && <p>Cargando clima...</p>}
      
      {weatherError && <p style={{color: 'red'}}>{weatherError}</p>}
      
      {weather && (
        <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '5px' }}>
          <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
          <p><strong>Sensación térmica:</strong> {weather.main.feels_like}°C</p>
          <p><strong>Humedad:</strong> {weather.main.humidity}%</p>
          <p><strong>Clima:</strong> {weather.weather[0].description}</p>
          
          {/* Icono del clima */}
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: '100px' }}
          />
          
          <p><strong>Viento:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
      
    </div>
  )
}

export default App