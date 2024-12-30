/* eslint-disable react/prop-types */
function Displaydata({ CelValue, Main1, Description1, Imglink}) {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-sky-400 to-blue-600 text-white rounded-3xl shadow-lg p-6 mt-6 w-full max-w-sm mx-auto">
      {Imglink && (
        <img
          src={Imglink}
          alt="Weather Icon"
          className="w-28 h-28 object-contain mb-4"
        />
      )}

      <div className="text-6xl font-bold mb-2">
        {CelValue ? `${CelValue}°C` : "--"}
      </div>

      <div className="text-3xl font-semibold tracking-wide mb-1">
        {Main1 || "Weather"}
      </div>

      <div className="text-lg opacity-80">{Description1 || "City Name"}</div>
    </div>
  );
}

export default Displaydata;
