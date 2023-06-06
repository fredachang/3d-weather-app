import "../App.css";

interface Props {
  city: string;
  temp: number;
  humidity: number;
}

export function WeatherTile(props: Props) {
  const { city, humidity, temp } = props;
  return (
    <div className="card">
      <h2>{city}</h2>
      <h3>Temp: {temp} Degrees</h3>
      <h3>Humidity: {humidity}</h3>
    </div>
  );
}
