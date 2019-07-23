const books_url = "http://localhost:3000/books";
const users_url = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", function() {
  fetch(books_url)
    .then(response => response.json())
    .then(json => {
      renderBooks(json);
    });
});

function renderBooks(arr) {
  arr.forEach(book => {
    let li = document.createElement("li");
    li.className = "book-bullet";
    li.innerText = book.title;
    li.addEventListener("click", function() {
      showBook(book);
    });
    document.getElementById("list-panel").appendChild(li);
  });
}

function showBook(book) {
  let img = document.querySelector("img");
  img.setAttribute("src", book.img_url);

  let title = document.getElementById("title");
  title.innerText = book.title;

  let desc = document.getElementById("description");
  desc.innerText = book.description;

  let likes = document.getElementById("liked-users");
  let usersStr = "<b>Users that like this book: </b>";
  book.users.forEach(user => {
    usersStr += user.username + " ";
  });
  likes.innerHTML = usersStr;

  let likeBtn = document.getElementById("like-btn");
  likeBtn.style.display = "block";

  likeBtn.addEventListener("click", function() {
    book.users.push({
      id: 1,
      username: "pouros"
    });
    fetch(books_url + `/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: book.title,
        description: book.description,
        img_url: book.img_url,
        users: book.users
      })
    }).then(response => response);
  });
}
