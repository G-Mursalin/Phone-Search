"use strict";

// Selectors
const formContainer = document.querySelector(".form_container");

const formInput = document.querySelector(".form_input");

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  loadData(formInput.value.toLowerCase());

  formInput.value = "";
});

const loadData = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await response.json();

  console.log(data);
};
