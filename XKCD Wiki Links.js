// ==UserScript==
// @name         XKCD Wiki Links
// @version      1.0
// @description  Adds a link to the XKCD Explain wiki page for the XKCD comic you're looking at, to the comic page.
// @author       Foxscotch
// @match        http://xkcd.com/*
// @grant        none
// ==/UserScript==

document.getElementById("middleContainer").appendChild(document.createElement('br'))

url = "http://www.explainxkcd.com/wiki/index.php" + window.location.pathname
var a = document.createElement('a');
var link = document.createTextNode("XKCD Explain wiki page");
a.appendChild(link);
a.href = url.slice(0,-1);
document.getElementById("middleContainer").appendChild(a);

/* do you like code that's been compressed beyond reason?! if you do, here it is!
document.getElementById("middleContainer").appendChild(document.createElement('a').appendChild(document.createTextNode("XKCD Explain wiki page")).href = "http://www.explainxkcd.com/wiki/index.php" + window.location.pathname);
just kidding, that doesn't work. raise ur hand if you're surprised (nobody raises their hand) */