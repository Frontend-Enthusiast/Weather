import { useEffect, useState } from 'react';
import Description from './components/Description';
import './index.css';
import { getFormattedWeatherData } from './weatherService';

function App() {
  const [city, setCity] = useState('paris');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState('https://images.unsplash.com/photo-1612208695882-02f2322b7fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80');
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) {
        setBg('https://images.unsplash.com/photo-1612208695882-02f2322b7fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80');
      }
      else {
        setBg('https://media.istockphoto.com/id/1234887973/photo/empty-wooden-planks-with-blur-beach-and-sea-on-background.jpg?b=1&s=612x612&w=0&k=20&c=Api_rWrfUDODnyxDgW4tNqtRWbOk6lBZhmsYDVEtArw=');
      }
    }

    fetchWeatherData();
  }, [units, city]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }
  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText;
    const isCelcius = currentUnit === 'C';
    button.innerText = isCelcius ? 'F' : 'C';
    setUnits(isCelcius ? 'metric' : 'imperial');
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {weather &&
          <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter city...' />
              <button onClick={(e) => handleClick(e)}>F</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name} , ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt='weather_condition'></img>
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} ${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
          </div>
        }

      </div>
    </div>
  );
}

export default App;
