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

// Details Data Show In Modal
const showDetailsData = (dataReceived) => {
  console.log(dataReceived);
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
