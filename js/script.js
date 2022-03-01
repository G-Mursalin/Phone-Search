"use strict";
// BASE API URL
const BASE_URL = "https://openapi.programming-hero.com/api/";
// Selectors
const formContainer = document.querySelector(".form_container");
const formInput = document.querySelector(".form_input");
const searchMessage1 = document.querySelector(".search_message-1");
const searchMessage2 = document.querySelector(".search_message-2");
const numOfResult = document.querySelector(".num_of_result");
const cardContainer = document.querySelector(".card_container");
const detailsPhoneName = document.querySelector(".details_phone_name");
const detailsPhoneImg = document.querySelector(".details_phone_img");
const releaseDateEl = document.querySelector(".releaseDate");
const storageEl = document.querySelector(".storage");
const displaySizeEl = document.querySelector(".displaySize");
const chipSetEl = document.querySelector(".chipSet");
const memoryEl = document.querySelector(".memory");
const sensorsEl = document.querySelector(".sensors");
const othersInfoEl = document.querySelector(".othersInfo");
// Handler For formContainer
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  loadData(`phones?search=${formInput.value.toLowerCase()}`);

  formInput.value = "";
});

// Handler For  cardContainer
cardContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn_detail")) return;

  loadData(`phone/${e.target.getAttribute("id")}`);
});

// Load Data From API
const loadData = async (searchURL) => {
  const response = await fetch(`${BASE_URL}${searchURL}`);

  const dataReceived = await response.json();
  if (searchURL.includes("phones?search")) {
    showDataUI(dataReceived);
  } else {
    showDetailsData(dataReceived);
  }
};

// Data Show In UI
const showDataUI = (dataReceived) => {
  const { status, data } = dataReceived;

  if (status === false) {
    cardContainer.textContent = "";
    searchMessage2.classList.remove("d-none");
    searchMessage1.classList.add("d-none");
    return;
  }
  searchMessage1.classList.remove("d-none");
  searchMessage2.classList.add("d-none");
  // Set The Find Result Number
  numOfResult.textContent = data.length;

  if (data.length > 20) {
    extraDataShow(data.slice(20));
  }
  firstTwentyData(data.slice(0, 20));
};

//Set Data to UI
const setDataUI = (element, data, text) => {
  data
    ? (element.textContent = data)
    : (element.textContent = `No ${text} data Found`);
};

// Details Data Show In Modal
const showDetailsData = (dataReceived) => {
  const { data } = dataReceived;
  const { name, image, releaseDate, others } = data;
  const { storage, displaySize, chipSet, memory, sensors } = data.mainFeatures;
  console.log(data);

  detailsPhoneName.textContent = name;
  //Set Image Data to UI
  detailsPhoneImg.setAttribute("src", `${image}`);
  detailsPhoneImg.setAttribute("alt", `${image}`);
  // Set Release Date to UI
  setDataUI(releaseDateEl, releaseDate, "Release Date");
  //Set Chip Set to UI
  setDataUI(chipSetEl, chipSet, "Chip Set");
  // Set Display Size Data to UI
  setDataUI(displaySizeEl, displaySize, "Display Size");
  // Set Memory Data to UI
  setDataUI(memoryEl, memory, "Memory");
  // Set Storage Data to UI
  setDataUI(storageEl, storage, "Storage");
  // Set Sensors Data to UI
  sensors.forEach((val) => {
    const html = `
     <li>${val}</li>
    `;
    sensorsEl.insertAdjacentHTML("beforeend", html);
  });
  // Set Others Data to UI
  const othersDataArray = Object.entries(others);

  othersDataArray.forEach((val) => {
    const html = `
      <p class="mb-0">${val[0]}:</p>
      <p class="ms-3">${val[1]}</p>
    `;
    othersInfoEl.insertAdjacentHTML("beforeend", html);
  });
};

// First 20 Data Show to UI
const firstTwentyData = (firstTwentyDataArray) => {
  // Reset
  cardContainer.textContent = "";
  console.log(firstTwentyDataArray);

  firstTwentyDataArray.forEach((val) => {
    const html = `
    <div class="col">
    <div class="card p-3">
      <img src="${val.image}" class="card-img-top w-75 " alt="${val.phone_name}" />
      <div class="card-body">
        <h5 class="card-title">${val.phone_name}</h5>
        <p class="card-text">
         Brand Name: ${val.brand}
        </p>
        <button
        type="button"
        id=${val.slug}
        class="btn btn_detail btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
         Details
      </button>
      </div>
    </div>
  </div>
    `;
    cardContainer.insertAdjacentHTML("beforeend", html);
  });
};

// Extra Data Show to UI
const extraDataShow = (extraDataArray) => {
  // console.log(extraDataArray);
};
