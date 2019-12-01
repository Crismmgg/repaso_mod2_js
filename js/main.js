/* eslint-disable quotes */

"use strict";

// const news = [
//   {
//     title: 'Asteroids 101',
//     image: 'https://via.placeholder.com/200x100'
//   },
//   {
//     title: 'Life on Mars',
//     image: 'https://via.placeholder.com/200x100'
//   },
//   {
//     title: 'Martians invade Earth',
//     image: 'https://via.placeholder.com/200x100'
//   },
//   {
//     title: "Humans aren't real",
//     image: 'https://via.placeholder.com/200x100'
//   },
//   {
//     title: 'Space The Final Frontier',
//     image: 'https://via.placeholder.com/200x100'
//   }
// ];

/////////PARTE 1//////// NEWS

let news = [];

// FETCH (ejercicio 3)
function getServerData() {
  fetch(
    "http://beta.adalab.es/Easley-ejercicios-de-fin-de-semana/data/news.json"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      news = serverData.news;
      paintHtml();
      searchMars();
      listenerImage();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

//PINTAR NOTICIAS (ejercicio 1)
const list = document.querySelector(".news");

function paintHtml() {
  for (const item of news) {
    const newsItem = document.createElement("li");
    const title = document.createElement("h2");
    const img = document.createElement("img");

    newsItem.setAttribute(
      "class",
      "news__item news__item--no-image-visible news__image"
    );
    newsItem.setAttribute("id", "");
    title.setAttribute("class", "news__title");
    title.innerHTML = item.title;
    img.setAttribute("class", "news__image");
    img.setAttribute("src", item.image);
    img.setAttribute("alt", "Aquí va el título");

    newsItem.appendChild(title);
    newsItem.appendChild(img);
    list.appendChild(newsItem);
  }
}

//BUSCAR MARTE (ejercicio 2)

function searchMars() {
  const listElements = document.querySelectorAll(".news__item");
  for (let i = 0; i < listElements.length; i++) {
    if (
      listElements[i].textContent.includes("Mars") ||
      listElements[i].textContent.includes("Martian")
    ) {
      listElements[i].classList.add("news__item--from-mars");
    }
  }
}

//IMÁGENES AL CLICK (ejercicio 4)

//handler
function handleImage(ev) {
  const currentNew = ev.currentTarget;
  currentNew.classList.toggle("news__item--no-image-visible");
}

//listener
function listenerImage() {
  const clickedNews = document.querySelectorAll(".news__item");
  for (const clickedNew of clickedNews) {
    clickedNew.addEventListener("click", handleImage);
  }
}

//OBTENER DATOS SERVIDOR
getServerData();

/////////PARTE 2//////// PALETTES

const body = document.querySelector("body");
let palettes = [];
const favPalettes = [];

//LOCAL STORAGE (ejercicio 9)

function setLocalStorage() {
  localStorage.setItem("palettes", JSON.stringify(palettes));
}

function getLocalStorage() {
  const localStoragePalettes = JSON.parse(localStorage.getItem("palettes"));
  if (localStoragePalettes !== null) {
    palettes = localStoragePalettes;
    paintPalettes();
    listenPalettes();
  } else {
    getServerPalettes();
  }
}

//TRAER DATOS DE PALETAS DEL SERVIDOR (ejerc 5 y 6)

function getServerPalettes() {
  fetch(
    "http://beta.adalab.es/Easley-ejercicios-de-fin-de-semana/data/palettes.json"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      palettes = serverData.palettes;
      setLocalStorage();
      paintPalettes();
      listenPalettes();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

//PINTAR Y ESCUCHAR PALETAS

const paletteList = document.createElement("ul");
paletteList.setAttribute("class", "js-palettes-container palettes-list");
body.appendChild(paletteList);

function paintPalettes() {
  paletteList.innerHTML = ""; //muy importante para pintar de nuevo li
  for (let i = 0; i < palettes.length; i++) {
    const paletteItem = document.createElement("li");
    paletteItem.setAttribute("class", "palettes__item js-palette-item");
    paletteItem.setAttribute("id", `${i}`);
    paletteList.appendChild(paletteItem);

    const favIndex = favPalettes.indexOf(i);
    const isFav = favIndex !== -1;
    if (isFav) {
      paletteItem.setAttribute(
        "class",
        "palettes__item js-palette-item palettes__item--favorite"
      );
    } else {
      paletteItem.setAttribute("class", "palettes__item js-palette-item ");
    }
    const title = document.createElement("h3");
    title.setAttribute("class", "palettes__name");
    title.innerHTML = palettes[i].name;
    paletteItem.appendChild(title);

    const paletteContainer = document.createElement("div");
    paletteContainer.setAttribute("class", "palettes__colors");
    paletteItem.appendChild(paletteContainer);

    for (const color of palettes[i].colors) {
      const paletteColors = document.createElement("div");
      paletteColors.setAttribute("class", "palettes__color");
      paletteColors.setAttribute("style", `background-color:#${color};`);
      paletteContainer.appendChild(paletteColors);
    }
  }
}
function listenPalettes() {
  const palettesItems = document.querySelectorAll(".js-palette-item");
  for (const palettesItem of palettesItems) {
    palettesItem.addEventListener("click", toggleFavs);
  }
}

//FAVS (ejercicio 7)

function toggleFavs(ev) {
  const clickedId = parseInt(ev.currentTarget.id);
  console.log("he pulsado el id:", clickedId);
  const favIndex = favPalettes.indexOf(clickedId);
  console.log("su índice está dentro del array favs:", favIndex);
  const isFav = favIndex !== -1;
  console.log("entonces es fav?", isFav);
  if (isFav === true) {
    favPalettes.splice(favIndex, 1);
    console.log("entonces lo saco");
  } else {
    favPalettes.push(clickedId);
    console.log("entonces lo meto");
  }
  paintPalettes();
  listenPalettes();
}

//TRAER DATOS DEL LOCAL STORAGE

getLocalStorage();
