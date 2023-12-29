import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isDataCome, setDataCome] = useState(false);
  const [error, setError] = useState("No-Error");

  useEffect(() => {
    async function GetInfo() {
      try {
        const res = await fetch("http://localhost:5062/WeatherForecast", {
          method: "Get",
          headers: {
            accept: "text/json",
          },
        });

        if (!res.ok) {
          throw new Error("Bir hata oldu");
        }

        const data = await res.json();
        setData([...data]);
        setDataCome(true);
      } catch (err) {
        setError(err.message);
        setDataCome(false);
      }
    }

    GetInfo();
  }, []);

  return (
    <div>
      {isDataCome ? (
        data.map((p, index) => (
          <div key={index}>
            <WheatherData wheather={p} />
            <p>--------------------------------------------</p>
          </div>
        ))
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

function WheatherData({ wheather }) {
  const { date, temperatureC, temperatureF, summary } = wheather;
  return (
    <div>
      <p>Date : {date}</p>
      <p>TemperatureC : {temperatureC}</p>
      <p>TemperatureF : {temperatureF}</p>
      <p>summary : {summary}</p>
    </div>
  );
}

export default App;
