const itemsContainer = document.querySelector("#list-items");

function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75";
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement("figure");
  colourCardColour.style = `background-color: ${item.color}; height: 50px; width: 100%;`;
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement("br");
  itemsContainer.append(colourCardBreak);
}

function fetchColorsList() {
  const storedColors = localStorage.getItem('colorsList');

  if (storedColors) {
    const colors = JSON.parse(storedColors);
    colors.forEach(color => addItem(color));
  } else {
    fetch('https://reqres.in/api/unknown')
      .then(response => response.json())
      .then(data => {
        const dataString = JSON.stringify(data.data);
        localStorage.setItem('colorsList', dataString);
        const dataObject = JSON.parse(dataString);
        console.log(dataObject);
        dataObject.forEach(color => addItem(color));
      })
      .catch(error => console.error('Error fetching colors list:', error));
  }
}

function loadColorsFromStorage() {
  const storedColors = localStorage.getItem('colorsList');

  if (storedColors) {
    const colors = JSON.parse(storedColors);
    colors.forEach(color => addItem(color));
    console.log("Colores cargados desde Local Storage: ", colors);
  } else {
    console.log("No hay colores almacenados en Local Storage.");
  }
}


function clearList() {
  itemsContainer.innerHTML = ''; 
  localStorage.removeItem('colorsList'); 
  console.log("Lista y almacenamiento local borrados.");
}


loadColorsFromStorage();


document.getElementById('loadColorsButton').addEventListener('click', function () {
  fetchColorsList();
});


document.getElementById('clearListButton').addEventListener('click', function () {
  clearList();
});
