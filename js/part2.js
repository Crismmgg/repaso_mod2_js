'use strict';

//ejercicio 5
let palettes = [];
const body = document.querySelector('body');

function getServerPalettes() {
  fetch(
    'http://beta.adalab.es/Easley-ejercicios-de-fin-de-semana/data/palette.json'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      palettes = serverData.palettes;
      paintPalettes();
    })
    .catch(function(err) {
      console.log('Error al traer los datos del servidor', err);
    });
}

function paintPalettes() {
  for (const palette of palettes) {
    const paletteList = document.createElement('ul');
    const title = document.createElement('h3');
    const paletteItem = document.createElement('li');
    const paletteColors = document.createElement('div');

    title.innerHTML = palette.name;
    paletteItem.appendChild(paletteColors);
    paletteList.appendChild(paletteItem);
    paletteList.appendChild(title);
    body.appendChild(paletteList);
  }
}

getServerPalettes();
