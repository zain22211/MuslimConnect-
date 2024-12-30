/* eslint-disable react/prop-types */
function Displaydata({ Fajr, Dhuhr, Asr, Maghrib, Isha }) {
    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-sky-400 to-sky-600 text-white rounded-3xl shadow-xl p-8 mt-8 w-full max-w-md mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-white underline  decoration-4 decoration-white">
          Prayer Times
        </h2>
        {Fajr && (
          <div className="flex justify-between text-2xl font-medium mb-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 w-full text-center">
            <span className="font-bold">Fajr</span> 
            <span>{Fajr}</span>
          </div>
        )}
        {Dhuhr && (
          <div className="flex justify-between text-2xl font-medium mb-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 w-full text-center">
            <span className="font-bold">Dhuhr</span> 
            <span>{Dhuhr}</span>
          </div>
        )}
        {Asr && (
          <div className="flex justify-between text-2xl font-medium mb-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 w-full text-center">
            <span className="font-bold">Asr</span> 
            <span>{Asr}</span>
          </div>
        )}
        {Maghrib && (
          <div className="flex justify-between text-2xl font-medium mb-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 w-full text-center">
            <span className="font-bold">Maghrib</span>
            <span>{Maghrib}</span>
          </div>
        )}
        {Isha && (
          <div className="flex justify-between text-2xl font-medium bg-white bg-opacity-20 rounded-lg px-4 py-2 w-full text-center">
            <span className="font-bold">Isha</span>
            <span>{Isha}</span>
          </div>
        )}
      </div>
    );
  }
  
  export default Displaydata;
  