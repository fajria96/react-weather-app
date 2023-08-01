import "./App.css";
import React, { useState, useEffect } from "react";

import axios from "axios";

import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSearch } from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const App = () => {
  const APIkey = "a948b7b26baa1c897a3c6076117254c3";
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Jakarta");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log(inputValue);

    if (inputValue !== "") {
      setLocation(inputValue);
    }

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err);
      });
  }, [APIkey, location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage();
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    default:
      icon = null;
  }
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-cyan-700 to-blue-700 flex flex-col justify-center items-center px-4 lg:px-0">
      <form
        className="
        h-16 bg-black/20 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8"
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country..."
          ></input>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-cyan-400 hover:bg-cyan-500 w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
        {errorMessage && (
          <div className="h-[450px] absolute top-24 text-white capitalize">{`${errorMessage.response.data.message}`}</div>
        )}
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-[450px] flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <div className="text-[87px]">{icon}</div>
              <div className="px-5">
                <div className="text-2xl">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            <div className="my-20">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div className="max-w-[378] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div>
                    <BsEye />
                  </div>
                  <div className="ml-2">
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <BsThermometer />
                  </div>
                  <div className="flex ml-2">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                    </div>
                    <div>
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <div>
                    <BsWater />
                  </div>
                  <div className="ml-2">
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity / 1000} %</span>
                  </div>
                </div>
                <div className="flex items-center mr-2">
                  <div className="mr-2">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span>{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
