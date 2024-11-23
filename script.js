import {
  renderSpinner,
  renderTodaysWeatherUI,
  weatherContainer,
  renderTodaysHourlyWeatherUI,
  renderNextSevendaysUI,
} from "./config.js";

const form = document.querySelector("form");
const countryValue = document.querySelector('input[type="text"]');

const fetchAPI = function (country) {
  renderSpinner(weatherContainer);

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=metric&key=UD7D65FGYYPBC57V5MB9TR687&contentType=json`
  )
    .then((respond) => {
      if (!respond.ok)
        throw new Error(`Could not find Country ${respond.status}`);
      else return respond.json();
    })
    .then((data) => {
      weatherContainer.textContent = "";

      const [today] = data.days;
      const nextSevenDays = data.days.slice(1, 8);
      renderTodaysWeatherUI(today);

      renderTodaysHourlyWeatherUI(today.hours, today);

      renderNextSevendaysUI(nextSevenDays);
      console.log(data);
    })
    .catch((err) => {
      weatherContainer.textContent = "";
      console.log(err.message);
      weatherContainer.innerHTML = `<p class="error-message">
                                      Could not find data about country.....<br> TRY AGAIN
                                    </p>`;
    });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let country = countryValue.value.toLowerCase();
  countryValue.value = "";
  countryValue.blur();

  fetchAPI(country);
});
