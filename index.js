// info: https://api-docs.airvisual.com/ && https://www.iqair.com/air-pollution-data-api
const baseURL = 'https://api.airvisual.com/v2/';
const APIkey = 'key=fe9a703f-ee8b-49f7-8fd3-c1e6fa3f2dc2';

const indyData = baseURL+"city?city=Indianapolis&state=Indiana&country=USA&"+APIkey;
const nearestCityToUser = baseURL+'nearest_city?'+APIkey;

// const CurrentWeatherIcon = `https://www.airvisual.com/images/${ic}.png` // icons location

const counrtyOption = document.querySelector('#selectCountry');
const stateOption = document.querySelector('#selectState');
const cityOption = document.querySelector('#selectCity');
const ShowIndyData = document.querySelector('select');
const cityToUser = document.querySelector('select');


async function catchCountries() {
  let response = await fetch(baseURL+'countries?'+APIkey);
  let blob = await response.json();
  console.log(blob.data[8].country);
  console.log(blob.data.length);

  for (let i=0; i<blob.data.length; i++) {
    let countries = blob.data[i].country;
    let countryLI = document.createElement('option');
    countryLI.innerText = countries;
    counrtyOption.appendChild(countryLI);
  }
}
catchCountries();

async function catchStates() {
  let response = await fetch(baseURL+`states?country=`+counrtyOption.value+`&`+APIkey);
  let blob = await response.json();
  console.log(blob.data[8]);
  console.log(blob.data.length);

  for (let i=0; i<blob.data.length; i++) {
    let states = blob.data[i].state;
    let stateLI = document.createElement('option');
    stateLI.innerText = states;
    stateOption.appendChild(stateLI);
  }
}

async function catchCities() {
  let response = await fetch(baseURL+`cities?state=`+stateOption.value+`&country=`+counrtyOption.value+`&`+APIkey);
  let blob = await response.json();
  console.log(blob.data[0]);
  console.log(blob.data.length);

  for (let i=0; i<blob.data.length; i++) {
    let cities = blob.data[i].city;
    let cityLI = document.createElement('option');
    cityLI.innerText = cities;
    cityOption.appendChild(cityLI);
  }
}

async function showData() {
  let response = await fetch(baseURL+`city?city=`+cityOption.value+`&state=`+stateOption.value+`&country=`+counrtyOption.value+`&`+APIkey);
  let blob = await response.json();
  console.log(blob);
  console.log(blob.data);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }}
function showPosition(position) {
  const latitude = position.coords.latitude; //39.8852095999996 for example
  const longitude = position.coords.longitude; //-86.1274112 for example
  const gpsAddress = baseURL+"nearest_city?lat="+latitude+"&lon="+longitude+"&"+APIkey;
  async function catchAPIAagin() {
    let responseFive = await fetch(gpsAddress);
    let blobFive = await responseFive.json();
    console.log(blobFive); 
  }
  catchAPIAagin();
}





/*default to indianapolis usa, although every contry is avaialble
  choose state or enter search term
    choose city or enter search term
    link to user's nearest city

*/

// fetch("http://api.airvisual.com/v2/countries?"+APIkey)
//   .then(response => response.json())
//   .then(response => {
//     for (let i=0; i<countries.length; i++) {
//       //let countries = response.data[i]
//       let countryList = document.createElement('option');
//       countryList.innerText = data[i];
//       counrtyOption.appendChild(countryList);
//     }
//   });

  // for (i=0; i<titles.length; i++) {
  //   if (titleOptions.value == titles[i]) {


  // async function catchTitle() {
  //   let response = await fetch(baseURL1);
  //   let blob = await response.json();
  //   let titles = blob.map(film => `${film.title}`);
  
  //   for (i=0; i<titles.length; i++) {
  //       let titleLI = document.createElement('option');
  //       titleLI.innerText = titles[i];
  //       titleOptions.appendChild(titleLI);
  //   };
  // };  
  // catchTitle();

  // let responseTwo = await fetch(supportedStateList);
  // let blobTwo = await responseTwo.json();
  // console.log(blobTwo.data[13]);

  // let responseThree = await fetch(supportedCityList);
  // let blobThree = await responseThree.json();
  // console.log(blobThree.data[19]);

  // let responseFour = await fetch(indyData);
  // let blobFour = await responseFour.json();
  // console.log(blobFour);