const API = "http://localhost:3000";


async function login() {
const username = document.getElementById("user").value;
const password = document.getElementById("pass").value;


const res = await fetch(`${API}/auth/login`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username, password })
});


const data = await res.json();


if (data.token) {
localStorage.setItem("token", data.token);
if (data.role === "admin") window.location = "admin.html";
else window.location = "index.html";
} else {
alert(data.error);
}
}


async function loadBooks() {
const res = await fetch(`${API}/books`);
const books = await res.json();


const table = document.getElementById("books");
table.innerHTML = books
.map(b => `<tr><td>${b.id}</td><td>${b.title}</td><td>${b.author}</td></tr>`)
.join("");
}


async function addBook() {
const token = localStorage.getItem("token");


await fetch(`${API}/books`, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": token
},
body: JSON.stringify({
title: document.getElementById("title").value,
author: document.getElementById("author").value
})
});


loadBooks();
}