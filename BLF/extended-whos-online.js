// ==UserScript==
// @name         Extended Who's Online
// @namespace    http://foxscotch.net/
// @version      1.1
// @description  Script that places all pages of the BLF Who's Online list onto one page.
// @author       Foxscotch
// @match        http://forum.blockland.us/index.php?action=who*
// @grant        none
// @require      http://www.kryogenix.org/code/browser/sorttable/sorttable.js
// ==/UserScript==

// Change this to true if you want it to include guests
var includeGuests = false;

// Change this to true if you want it to automatically start when you load the user list
var automatic = false;

var userTable = document.getElementsByTagName("table")[2].children[0];

function emptyTable() {
  var tableLength = userTable.children.length;
  for (var i = 1; i < tableLength - 1; i++) {
    userTable.removeChild(userTable.children[1]);
  }
}

function correctColors() {
  var tableLength = userTable.children.length;
  for (var k = 1; k < tableLength - 1; k++) {
    if (k % 2 == 0) {
      userTable.children[k].className = "windowbg";
    } else {
      userTable.children[k].className = "windowbg2";
    }
  }
}

function clearDuplicates() {
  var duplicates = [];
  for (var i = 1; i < userTable.children.length - 1; i++) {
    var username =
      userTable.children[i].getElementsByTagName("span")[0].children[0]
        .innerHTML;
    if (duplicates.indexOf(username) == -1) {
      duplicates.push(username);
    } else {
      userTable.removeChild(userTable.children[i]);
    }
  }
}

function addUsers() {
  var pageCount = Number(
    document.getElementsByClassName("navPages")[
      document.getElementsByClassName("navPages").length - 1
    ].innerHTML
  );
  var pagination = userTable.children[userTable.children.length - 1];

  var url = String(window.location);
  if (url.includes("start")) {
    url = url.replace(/;?start=[\d]+/, "");
  }

  for (var i = 2; i <= pageCount; i++) {
    var request = new XMLHttpRequest();
    request.responseType = "document";
    request.onload = function () {
      var newUserTable =
        this.response.getElementsByTagName("table")[2].children[0];
      for (var j = 1; j < newUserTable.children.length - 1; j++) {
        var currentEntry = newUserTable.children[j];
        if (includeGuests) {
          userTable.insertBefore(currentEntry, pagination);
        } else if (!currentEntry.children[0].innerHTML.includes("Guest")) {
          userTable.insertBefore(currentEntry, pagination);
        }
      }
      correctColors();
      clearDuplicates();
    };
    request.open("GET", url + ";start=" + (i - 2) * 30);
    request.send();
  }
}

if (automatic) {
  emptyTable();
  addUsers();
} else {
  var button = document.createElement("button");
  button.innerHTML = "Add users";

  place = document.body.children[2].children[0];
  button = place.insertBefore(button, place.children[0]);

  button.addEventListener("click", function () {
    emptyTable();
    addUsers();
  });
}
