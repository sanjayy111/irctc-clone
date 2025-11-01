  document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const classCode = document.getElementById('class').value;

  
    window.location.href = `results.html?from=${from}&to=${to}&date=${date}&class=${classCode}`;
  });




    
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  
  loginTab.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    
    loginTab.classList.add("text-blue-700", "border-blue-700");
    registerTab.classList.remove("text-blue-700", "border-blue-700");
    registerTab.classList.add("text-gray-500");
  });

  
  registerTab.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    
    registerTab.classList.add("text-blue-700", "border-blue-700");
    loginTab.classList.remove("text-blue-700", "border-blue-700");
    loginTab.classList.add("text-gray-500");
  });
