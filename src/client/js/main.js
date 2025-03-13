document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const deleteAllButton = document.getElementById("deleteAllButton");
  const startDateInput = document.getElementById("travelStartDate");
  const endDateInput = document.getElementById("travelEndDate");

  const today = new Date().toISOString().split("T")[0];
  startDateInput.setAttribute("min", today);
  endDateInput.setAttribute("min", today);

  startDateInput.addEventListener("change", () => {
      endDateInput.setAttribute("min", startDateInput.value);
  });

  searchButton.addEventListener("click", handleSearch);
  deleteAllButton.addEventListener("click", handleDeleteAll);
  loadSavedData();
});

async function handleSearch() {
  const cityInput = document.getElementById("destinationCity");
  const startDateInput = document.getElementById("travelStartDate");
  const endDateInput = document.getElementById("travelEndDate");
  const hotelInput = document.getElementById("hotelInfo");

  const city = cityInput.value.trim();
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const hotel = hotelInput.value.trim();

  if (!city || !startDate || !endDate || !hotel) {
      alert("Please enter city, start date, end date, and hotel information.");
      return;
  }

  const currentDate = new Date().setHours(0, 0, 0, 0); 
  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(0, 0, 0, 0);

  if (start < currentDate) {
      alert("Start date cannot be in the past. Please select a valid date.");
      return;
  }

  if (end < start) {
      alert("End date cannot be before the start date.");
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
          startDate,
          endDate,
          duration: calculateDuration(startDate, endDate),
          hotel,
          weather: weatherDesc,
          image: imageUrl,
      };

      updateUI(tripInfo);
      saveTripInfo(tripInfo);

      cityInput.value = "";
      startDateInput.value = "";
      endDateInput.value = "";
      hotelInput.value = "";

  } catch (err) {
      console.error(err);
      alert("Error occurred while fetching data.");
  }
}

function calculateDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate - startDate;
  return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
}

function updateUI(trip) {
  const tripInfoContainer = document.getElementById("tripInfo");

  const tripElement = document.createElement("div");
  tripElement.classList.add("trip-component", "mb-4", "p-3", "bg-light", "rounded", "shadow");
  tripElement.setAttribute("data-city", trip.city);
  tripElement.setAttribute("data-start-date", trip.startDate);
  tripElement.setAttribute("data-end-date", trip.endDate);

  tripElement.innerHTML = `
      <h4>My trip to ${trip.city}, ${trip.country} from ${trip.startDate} to ${trip.endDate} (${trip.duration} days)</h4>
      <img class="img-fluid rounded shadow mb-3" src="${trip.image}" alt="City Image"/>
      <p>Weather: ${trip.weather}</p>
      <p>Hotel: ${trip.hotel}</p>
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
  const startDate = tripElement.getAttribute("data-start-date");
  const endDate = tripElement.getAttribute("data-end-date");

  tripElement.remove();

  let savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  savedTrips = savedTrips.filter(trip => {
      return !(trip.city === city && trip.startDate === startDate && trip.endDate === endDate);
  });
  localStorage.setItem("trips", JSON.stringify(savedTrips));
}

function handleDeleteAll() {
  localStorage.removeItem("trips");
  document.getElementById("tripInfo").innerHTML = "";
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('Service Worker registered:', reg))
          .catch(err => console.error('Service Worker registration failed:', err));
  });
}
