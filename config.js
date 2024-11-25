let weatherContainer = document.querySelector(".weather");

const renderSpinner = function (element) {
  const marker = `<div class="loader"></div>;`;

  element.textContent = "";
  element.innerHTML = marker;
};

let createContainers = function (classValue) {
  let div = document.createElement("div");
  div.classList.add(classValue);
  weatherContainer.append(div);
};

let wholeNumber = function (value) {
  return Math.trunc(value);
};

let getCondition = function (condition) {
  return [condition.split(",")[0]];
};

function capitaliseName(name) {
  if (name.length <= 3) {
    return name.toUpperCase();
  }
  return name
    .toLowerCase()
    .split(" ")
    .map((nameSplit) => nameSplit[0].toUpperCase() + nameSplit.slice(1))
    .join(" ");
}

let countryName = function (name) {
  createContainers("country");
  let div = document.querySelector(".country");

  div.textContent = capitaliseName(name);
};

const renderTodaysWeatherUI = function (value) {
  createContainers("todays-weather");
  let div = document.querySelector(".todays-weather");

  let todayHTML = `<h2 class="todays-weather-heading">Today</h2>
                        <div class="todays-weather-temp">
                          <div class="todays-current-temp">${wholeNumber(
                            value.temp
                          )}℃</div>
                          <div class="todays-current-icon">
                            <img src="icons/${value.icon}.svg" alt="" />
                          </div>
                        </div>
                        <p class="todays-weather-condition">${getCondition(
                          value.conditions
                        )}</p>
                        <p class="todays-weather-tempminmax">
                          <span class="min-temp">${wholeNumber(
                            value.tempmin
                          )}℃</span>
                          <span class="max-temp">${wholeNumber(
                            value.tempmax
                          )}℃</span>
                        </p>`;

  div.insertAdjacentHTML("afterbegin", todayHTML);
};

const renderTodaysHourlyWeatherUI = function (hours, day) {
  let dayDate = day.datetime;
  let currentHour = new Date().getHours();

  createContainers("todays-weather-hourly");
  let div = document.querySelector(".todays-weather-hourly");

  hours.forEach((hour) => {
    let dayHour = new Date(`${dayDate}T${hour.datetime}`).getHours();
    let todayHourlyHTML = `<div class="hourly">
                              <p class="hourly-time">${
                                currentHour === dayHour
                                  ? "Now"
                                  : hour.datetime.slice(0, 5)
                              }</p>
                              <div class="hourly-icon">
                                <img src="icons/${hour.icon}.svg" alt="" />
                              </div>
                              <p class="hourly-temp">${wholeNumber(
                                hour.temp
                              )}℃</p>
                            </div>`;

    div.insertAdjacentHTML("beforeend", todayHourlyHTML);
  });
};

let displayDay = function (value) {
  if (value === 0) return "Sunday";
  if (value === 1) return "Monday";
  if (value === 2) return "Tuesday";
  if (value === 3) return "Wednesday";
  if (value === 4) return "Thursday";
  if (value === 5) return "Friday";
  if (value === 6) return "Saturday";
};

const renderNextSevendaysUI = function (days) {
  createContainers("next-sevendays-weather");
  let div = document.querySelector(".next-sevendays-weather");

  let para = document.createElement("p");
  para.classList.add("text");
  para.textContent = "7-DAY-FORCAST";
  div.append(para);

  days.forEach((day) => {
    let dayNum = new Date(day.datetime).getDay();
    let nextSevenDaysHTML = `<div class="day">
                              <p class="day-name">${displayDay(dayNum)}</p>
                              <div class="day-icon">
                                <img src="icons/${day.icon}.svg" alt="" />
                              </div>
                              <p class="day-min-temp">${wholeNumber(
                                day.tempmin
                              )}℃</p>
                              <p class="day-max-temp">${wholeNumber(
                                day.tempmax
                              )}℃</p>
                              <p class="day-condition">${getCondition(
                                day.conditions
                              )}</p>
                            </div>`;

    div.insertAdjacentHTML("beforeend", nextSevenDaysHTML);
  });
};

export {
  renderSpinner,
  renderTodaysWeatherUI,
  weatherContainer,
  renderTodaysHourlyWeatherUI,
  renderNextSevendaysUI,
  countryName,
};
