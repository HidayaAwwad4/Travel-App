document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const deleteAllButton = document.getElementById("deleteAllButton");
  
  searchButton.addEventListener("click", handleSearch);

  deleteAllButton.addEventListener("click", handleDeleteAll);

  loadSavedData();
});

async function handleSearch() {
  const cityInput = document.getElementById("destinationCity");
  const dateInput = document.getElementById("travelDate");
  const city = cityInput.value.trim();
  const date = dateInput.value;

  if (!city || !date) {
      alert("Please enter both city and travel date.");
      return;
  }

  try {
      const locRes = await fetch(`/api/location?city=${city}`);
      if (!locRes.ok) throw new Error("Failed to fetch location");
      const locData = await locRes.json();
      const { lat, lon, country } = locData;

      const weatherRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!weatherRes.ok) throw new Error("Failed to fetch weather");
      const weatherData = await weatherRes.json();
      const weatherDesc = weatherData.description;

      const imageRes = await fetch(`/api/image?city=${city}`);
      if (!imageRes.ok) throw new Error("Failed to fetch image");
      const imageData = await imageRes.json();
      const imageUrl = imageData.imageUrl;

      const tripInfo = {
          city: locData.city,
          country,
          date,
          weather: weatherDesc,
          image: imageUrl,
      };

      updateUI(tripInfo);

      saveTripInfo(tripInfo);

      cityInput.value = "";
      dateInput.value = "";

  } catch (err) {
      console.error(err);
      alert("Error occurred while fetching data.");
  }
}
function updateUI(trip) {
  const tripInfoContainer = document.getElementById("tripInfo");

  const tripElement = document.createElement("div");
  tripElement.classList.add("trip-component", "mb-4", "p-3", "bg-light", "rounded", "shadow");
  tripElement.setAttribute("data-city", trip.city); 
  tripElement.setAttribute("data-date", trip.date); 

  tripElement.innerHTML = `
      <h4 class="city-name">My trip to ${trip.city}, ${trip.country} on ${trip.date}</h4>
      <img class="city-image img-fluid rounded shadow mb-3" src="${trip.image}" alt="City Image"/>
      <div class="weather-info">
          <p class="temperature">Weather condition: ${trip.weather}</p>
      </div>
      <button class="delete-button btn btn-danger">Delete</button>
  `;

  tripInfoContainer.appendChild(tripElement);

  const deleteButton = tripElement.querySelector(".delete-button");
  deleteButton.addEventListener("click", function() {
      deleteTrip(deleteButton);
  });
}


function saveTripInfo(tripInfo) {
  let savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  savedTrips.push(tripInfo);
  localStorage.setItem("trips", JSON.stringify(savedTrips));
}

function loadSavedData() {
  const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  savedTrips.forEach(trip => {
      updateUI(trip);
  });
}

function deleteTrip(button) {
  const tripElement = button.closest('.trip-component'); 
  const city = tripElement.getAttribute("data-city");
  const date = tripElement.getAttribute("data-date");

  tripElement.remove();

  let savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  savedTrips = savedTrips.filter(trip => {
      return !(trip.city === city && trip.date === date);
  });
  localStorage.setItem("trips", JSON.stringify(savedTrips));
}

function handleDeleteAll() {
  localStorage.removeItem("trips");
  document.getElementById("tripInfo").innerHTML = "";
}
