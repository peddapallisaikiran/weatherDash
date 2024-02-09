import React, { useEffect, useState } from "react";
import Temperatures from "./components/Tempertures";
import Highlightss from "./components/Highlightss";

function App() {
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=0eb2f9e6dd554873aa7120429230511&q=${city}&aqi=no;`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  return (
    <div className="bg-slate-800 h-screen flex justify-center  items-start">
      <div className="w-1/5 h-1/3 mt-40">
        {weatherData && (
          <Temperatures
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>
      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6 odd:bg-gray-100">
        <h1 className="text-slate-200 text-2xl col-span-2">
          Today's Live Report
        </h1>
        {weatherData && (
          <>
            <Highlightss
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlightss
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlightss
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlightss
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;