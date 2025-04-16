const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "LAKCRCCYRPJZPRWKSWVPEYQE4";

function currentData(data) {
  const todayData = {
    resolvedAddress: data.resolvedAddress,
    currentConditions: {
      temp: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      description: data.currentConditions.conditions,
      time: data.currentConditions.datetime,
      icon: data.currentConditions.icon,
    },
  };
  return todayData;
}

export async function fetchData(city) {
  try {
    // Encode city name to handle spaces or special characters
    const encodedCity = encodeURIComponent(city);

    const response = await fetch(
      `${BASE_URL}${encodedCity}?unitGroup=us&key=${API_KEY}`,
      { mode: "cors" }
    );

    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const cityData = currentData(data);
    return cityData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Return null if there's an error
  }
}
