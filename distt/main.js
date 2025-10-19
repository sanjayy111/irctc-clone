



const form = document.getElementById("searchForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // your existing code...
  });
}








console.log("script loaded");




function updateDateTime() {

  const now = new Date();

  const date = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('datetime').textContent = `${date} [ ${time}` + ']';
}

// run once immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);









// 🧭 Handle search form
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const from = document.getElementById("from").value.toUpperCase().trim();
  const to = document.getElementById("to").value.toUpperCase().trim();
  const dateInput = document.getElementById("date").value;
  const quota = document.getElementById("quota").value;

  

  const date = dateInput.replaceAll("-", ""); // yyyyMMdd

  // Update info section
  document.getElementById("infoSection").classList.remove("hidden");
  document.getElementById("fromCity").textContent = from;
  document.getElementById("toCity").textContent = to;
 

  fetchTrains(from, to);
});

// 🚉 Fetch train data from API

async function fetchTrains(from, to) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p class="text-center text-blue-600 py-4">🔄 Fetching available trains...</p>`;

  try {
    const res = await fetch(`http://localhost:3000/trains/betweenStations?from=${from}&to=${to}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      resultsDiv.innerHTML = `<p class="text-center text-red-600 py-4">No trains found for this route.</p>`;
      return;
    }

    const trainCards = data.map(train => {
      const duration = calculateDuration(train.DepartureTime, train.ArrivalTime);
      return `
        <div class="bg-white shadow-md rounded-md p-4 border hover:shadow-lg transition">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-blue-700">${train.TrainName} (${train.TrainNo})</h3>
              <p class="text-sm text-gray-600 flex items-center gap-2">
                ${train.From} ➜ ${train.To}
              </p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-800">${train.ArrivalTime}</p>
              <p class="text-gray-500 text-sm">${duration}</p>
            </div>
          </div>

          <div class="border-t mt-3 pt-3 grid grid-cols-3 md:grid-cols-6 gap-2 text-sm">
            ${["1A", "2A", "3A", "SL"].map(cls => `
              <div class="border rounded-md p-2 text-center bg-gray-50 hover:bg-blue-50 cursor-pointer">
                ${cls} <br> <span class="text-blue-600">Check Seats</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    resultsDiv.innerHTML = trainCards;
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = `<p class="text-center text-red-600 py-4">⚠️ Error fetching data.</p>`;
  }
}








// Helper functions
function calculateDuration(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let duration = (eh * 60 + em) - (sh * 60 + sm);
  if (duration < 0) duration += 24 * 60;
  const h = Math.floor(duration / 60);
  const m = duration % 60;
  return `${h}h ${m}m`;
}











  


