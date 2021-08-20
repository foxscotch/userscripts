// ==UserScript==
// @name         Randomcolour quick copy
// @namespace    http://foxscotch.us/
// @version      1
// @description  Add a small button to copy the color from randomcolour.com to your clipboard.
// @author       Foxscotch
// @match        http://randomcolour.com/
// @grant        none
// ==/UserScript==

var body = document.body;

var btn = document.createElement('button');
btn.textContent = 'Copy hex code: ' + body.bgColor;
body.appendChild(btn);

var hiddenText = document.createElement('textarea');
hiddenText.value = body.bgColor;
hiddenText.hidden = true;
// Real quick, let's make sure you won't notice the text box when it's unhidden.
// Just in case it stays longer than it should.
hiddenText.style.background = 'transparent';
hiddenText.style.color = 'transparent';
hiddenText.style.border = 'none';
body.appendChild(hiddenText);

body.appendChild(document.createElement('br'));

var colorBtn = document.createElement('button');
colorBtn.textContent = 'Get new color';
body.appendChild(colorBtn);

body.appendChild(document.createElement('br'));

var link = document.createElement('a');
link.href = 'http://colorhexa.com/' + body.bgColor.slice(1);
link.target = '_blank';

var linkBtn = document.createElement('button');
linkBtn.textContent = 'Open the ColorHexa page for this color';
link.appendChild(linkBtn);

body.appendChild(link);

newColor = function () {
    var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
    bg_colour = "#" + ("000000" + bg_colour).slice(-6);
    body.bgColor = bg_colour;
}

function updateButton () {
    btn.textContent = 'Copy hex code: ' + body.bgColor;
    hiddenText.value = body.bgColor;
    link.href = 'http://colorhexa.com/' + body.bgColor.slice(1);
}

btn.addEventListener('click', function (e) {
    hiddenText.hidden = false;
    hiddenText.select();
    
    var copied = document.execCommand('copy');
    var msg = copied ? 'copied' : 'not copied'
    console.log('Hex code was ' + msg + '.');
    
    hiddenText.hidden = true;
});

colorBtn.addEventListener('click', function (e) {
    newColor();
    updateButton();
});