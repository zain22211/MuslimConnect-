import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Ui.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, } from 'react';
import Displaydata from './Displaydata';
import PrayerTimes from './PrayerTimes';
import Maps from './Maps';

// import Maps from './Maps';

function Ui() {
  const [idata, setdata] = useState(""); // State for input data
  const [Cel, setCel] = useState("");    // State for Celcius temperature
  const [Main, setMain] = useState("");
  const [Description, setDescription] = useState("");
  const [imgcode, setimgcode] = useState("");
  const [imglink, setimglink] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [triggerPrayerTimes, setTriggerPrayerTimes] = useState(false); // New state
  // const [location, setlocations] = useState(false); // New state
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  
  useEffect(() => {
    if (imgcode) {
      setimglink(`https://openweathermap.org/img/wn/${imgcode}@2x.png`);
    }
  }, [imgcode]); // Runs whenever imgcode changes

  async function getTemp() {
    const data = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${idata}&limit=5&appid=e9f4acbbac24292004ee735d19323eb7`
    );
    const res = await data.json();
    console.log(res);
    // let longitude = res[0].lon;
    setCountry(res[0].country);
    setCity(res[0].name);
    setlongitude(res[0].lon.toFixed(2));
    // let latitude = res[0].lat;
    setlatitude(res[0].lat.toFixed(2));
  }
  useEffect(() => {
    // Call weather API only when both longitude1 and latitude1 are set
    if (longitude && latitude) {
      console.log("latitutde" ,latitude);
      Calling(longitude, latitude);
      setTriggerPrayerTimes(true); // Trigger the child component
    }
  }, [longitude, latitude]);

  async function main() {
    await getTemp();
    // Calling(longitude1, latitude1);
    // setTriggerPrayerTimes(true); // Trigger the child component
  }

  async function Calling(longitude, latitude) {

    setTimeout(async function () {
      const handleapi = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e9f4acbbac24292004ee735d19323eb7`
      );
      const res1 = await handleapi.json();
      console.log("handleapi",res1);
      const Kelvin = res1.main.temp;
      const Celcius = Kelvin - 273; // Convert Kelvin to Celsius
      setCel(Celcius.toFixed(0)); // Update state
      setMain(res1.weather[0].main);
      setDescription(res1.name);
      setimgcode(res1.weather[0].icon); // Only update imgcode here
    }, 1000);
  }

  return (
    <div className='flex flex-col'>
    <div className=" bg-white  rounded-3xl bg-opacity-30 p-5">
      <div className="flex justify-center mt-2">
        <h1 className="roboto-regular font-bolder text-5xl text-blue-950">Weather Finder App</h1>
      </div>
      <div className="flex justify-center mt-4">
        <input
          className="bg-gray-300 w-[340px] h-12 rounded-3xl p-2"
          placeholder="Enter the City"
          onChange={(e) => setdata(e.target.value)} // Update input state
        />
        <button
          onClick={() => main()} // Call main function
          className="bg-blue-600 text-xl rounded-full w-12 h-12 hover:bg-blue-800 text-white ml-3"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <Displaydata CelValue={Cel} Main1={Main} Description1={Description} Imglink={imglink} />
      <PrayerTimes
        City={city}
        Country={country}
        triggerPrayerTimes={triggerPrayerTimes}
        setTriggerPrayerTimes={setTriggerPrayerTimes} // Pass setter to reset the trigger
      />
    </div>
    <div className='w-[1000px] mt-10'>
    <Maps longitude={longitude} latitude={latitude} />
    </div>
    </div>
  );
}

export default Ui;