function login() {
  const username = document.getElementById("username").value.trim();
  const category = document.getElementById("category").value;

  if (username === "" || category === "") {
    alert("Please enter your name and select a category.");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("category", category);

  window.location.href = "quiz.html";
}


