// Save Bookmark

function saveBookmark(event) {
  //Prevent form Page reloading
  event.preventDefault();
  //get site name and URl
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.querySelector("#siteUrl").value;

  //create a bookmark object
  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  //store bookmark
  var bookmarks = [];
  //check if the local storage is empty

  if (localStorage.getItem("bookmarks") !== null) {
    //get bookmarks from local storage
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }
  console.log(bookmark);
  //adding new bookmark
  bookmarks.push(bookmark);

  //Update bookmarks in Local Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();

  //empty inputs
  document.querySelector("form").reset();
}

//Fetch bookmarks

function fetchBookmarks() {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //Select the output bookmarks div

  var output = document.querySelector("#bookmarks");

  //reset the bookmarks div
  output.innerHTML = "";

  //loop over bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    //create div
    var div = document.createElement("div");
    //create h3
    var h3 = document.createElement("h3");
    h3.textContent = bookmarks[i].name;
    //create visit link
    var a = document.createElement("a");
    a.href = bookmarks[i].url;
    a.className = "btn btn-success";
    a.textContent = "Visit";

    //Create delete button

    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";

    //Add event listener to delete button
    button.addEventListener("click", function(e) {
      var name = e.target.parentElement.children[0].textContent;
      deleteBookmark(name);
    });

    //Append h3, a into div

    div.appendChild(h3);
    div.appendChild(a);
    div.appendChild(button);

    //append div into output
    output.appendChild(div);
  }
}

//Delete Bookmark
function deleteBookmark(name) {
  //Get Bookmark from local Storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //loop over bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    //looking up bookmarks with given name, then delete it

    if (bookmarks[i].name === name) {
      bookmarks.splice(i, 1);
      break;
    }
  }

  //Update local Storage

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //re-fetch bookmarks output
  fetchBookmarks();
}
//adding event listener to submit button

document.querySelector("form").addEventListener("submit", saveBookmark);

//Adding event listener for page loading
window.addEventListener("load", fetchBookmarks);

var filter = document.querySelector("#filter");

function filterNames() {
  var name = filter.value;

  var bookmarks = document.querySelectorAll("#bookmarks div h3");
  console.log(bookmarks);

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].textContent.toUpperCase().includes(name.toUpperCase())) {
      bookmarks[i].parentElement.style.display = "block";
    } else {
      bookmarks[i].parentElement.style.display = "none";
    }
  }
}

filter.addEventListener("input", filterNames);
