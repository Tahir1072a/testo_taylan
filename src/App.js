import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function GetInfo() {
      const res = await fetch("http://localhost:5062/WeatherForecast", {
        method: "Get",
        headers: {
          accept: "text/json",
        },
      });
      const data = await res.json();
      setData([...data]);
      console.log(data[0]);
    }

    GetInfo();
  }, []);

  return (
    <div>
      {data.map((p, index) => (
        <div key={index}>
          <WheatherData wheather={p} />
          <p>--------------------------------------------</p>
        </div>
      ))}
    </div>
  );
}

function WheatherData({ wheather }) {
  const { date, temperatureC, temperatureF, summary } = wheather;
  return (
    <div>
      <p>Date : {date}</p>
      <p>TemperatureC : {temperatureC}</p>
      <p>TempEratureF : {temperatureF}</p>
      <p>summary : {summary}</p>
    </div>
  );
}

export default App;
