const characterContainer = document.getElementById("display-characters");
const filteration = document.getElementById("filteration");
let filteredCharacters = [];
let currentIndex = 0;
let itemsPerPage = 4;
const loadMoreBtn = document.getElementById("load-more");
filteration.addEventListener("change", () => {
  const selectedValue = filteration.value;
  console.log(selectedValue);

  fetch("https://hp-api.onrender.com/api/characters")
    .then((res) => res.json())

    .then((characters) => {
      filteredCharacters = characters

        .filter((e) => e.house === selectedValue)
        .slice(0, 16);

      currentIndex = 0;
      characterContainer.innerHTML = "";
      displayCharacters(filteredCharacters);
      console.log(filteredCharacters);
    })
    .catch((err) => console.error("Error fetching data:", err));
});

function displayCharacters() {
  const nextCharacter = filteredCharacters.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  characterContainer.innerHTML = "";
  nextCharacter.forEach((e) => {
    const characterCard = document.createElement("div");
    characterCard.className = "character-card";
    characterCard.innerHTML = `
  <div class="character-image" ><img src="${e.image}" onerror="this.src='../images/not-found.png'" </div>
   <div class= "character-info"> 
   <p class="character-name">${e.name}</p>
   <p class="character-house">${e.house}</p>
   <p class="character-dateOfBirth">${e.dateOfBirth}</p>
   </div>
  `;
    characterContainer.appendChild(characterCard);
  });
  currentIndex = currentIndex + itemsPerPage;
  if (currentIndex > filteredCharacters.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}
loadMoreBtn.addEventListener("click", displayCharacters);
