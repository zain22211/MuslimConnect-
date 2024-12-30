import { useState } from "react";
import Displaynamazdata from "./Displaynamazdata";
/* eslint-disable react/prop-types */
function PrayerTimes({ City, Country, triggerPrayerTimes, setTriggerPrayerTimes }) {
    const [fajrTime, setfajrTime]= useState("")
    const [DhuhrTime, setDhuhrTime]= useState("")
    const [AsrTime, setAsrTime]= useState("")
    const [MaghribTime, setMaghribTime]= useState("")
    const [IshaTime, setIshaTime]= useState("")
    
    
    
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1)
    const year = currentDate.getFullYear(); // Get full year
  
    const formattedDate = `${day}-${month}-${year}`; // Outputs: DD-MM-YYYY
  
    async function getNamazTime() {
      const data1 = await fetch(
        `http://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${City}&country=${Country}`
      );
      const res = await data1.json();
      console.log(res);
      setfajrTime(res.data.timings.Fajr);
      setDhuhrTime(res.data.timings.Dhuhr);
      setAsrTime(res.data.timings.Asr);
      setMaghribTime(res.data.timings.Maghrib);
      setIshaTime(res.data.timings.Isha);
      console.log(fajrTime);
      console.log(DhuhrTime);
      console.log(AsrTime);
      console.log(MaghribTime);
      console.log(IshaTime);
      setTriggerPrayerTimes(false); // Reset the trigger
    }
  
    if (triggerPrayerTimes) {
      getNamazTime(); // Run only when triggered
    }
  
    return <div>
      <Displaynamazdata Fajr={fajrTime} Dhuhr={DhuhrTime} Asr={AsrTime} Maghrib={MaghribTime} Isha={IshaTime}/>      
    </div>;
  }
  
  export default PrayerTimes;
  