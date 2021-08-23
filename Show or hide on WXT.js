// ==UserScript==
// @name         Show/Hide N/SFW
// @namespace    http://foxscotch.net/
// @version      1.0
// @description  Show or hide NSFW or SFW results on WXT index
// @author       Foxscotch
// @match        http://swololol.com/wxt
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


var mainBox = document.getElementsByClassName('box')[3];

function showOrHide(doWhat, toWhat) {
	var posts = document.getElementsByClassName('post');
	for (var i = 0; i < posts.length; i++) {
		if (doWhat == 'hide') {
			if (toWhat == 'sfw') {
				if (!posts[i].textContent.startsWith('!')) {
					posts[i].parentElement.parentElement.hidden = true;
				}
			} else if (toWhat == 'nsfw') {
				if (posts[i].textContent.startsWith('!')) {
					posts[i].parentElement.parentElement.hidden = true;
				}
			}
		} else if (doWhat == 'show') {
			if (toWhat == 'sfw') {
				if (!posts[i].textContent.startsWith('!')) {
					posts[i].parentElement.parentElement.hidden = false;
				}
			} else if (toWhat == 'nsfw') {
				if (posts[i].textContent.startsWith('!')) {
					posts[i].parentElement.parentElement.hidden = false;
				}
			}
		}
	}
}

var btnContainer = document.createElement('div');
btnContainer.style.textAlign = 'center';

var ssfwBtn = document.createElement('input');
ssfwBtn.type = 'button';
ssfwBtn.id = 'show-sfw';
ssfwBtn.value = 'Show SFW';
ssfwBtn.style.marginRight = '2px';
ssfwBtn.addEventListener('click', showOrHide.bind(null, 'show', 'sfw'));
btnContainer.appendChild(ssfwBtn);

var snsfwBtn = document.createElement('input');
snsfwBtn.type = 'button';
snsfwBtn.id = 'show-nsfw';
snsfwBtn.value = 'Show NSFW';
snsfwBtn.style.marginRight = '2px';
snsfwBtn.addEventListener('click', showOrHide.bind(null, 'show', 'nsfw'));
btnContainer.appendChild(snsfwBtn);

var hsfwBtn = document.createElement('input');
hsfwBtn.type = 'button';
hsfwBtn.id = 'hide-sfw';
hsfwBtn.value = 'Hide SFW';
hsfwBtn.style.marginRight = '2px';
hsfwBtn.addEventListener('click', showOrHide.bind(null, 'hide', 'sfw'));
btnContainer.appendChild(hsfwBtn);

var hnsfwBtn = document.createElement('input');
hnsfwBtn.type = 'button';
hnsfwBtn.id = 'hide-nsfw';
hnsfwBtn.value = 'Hide NSFW';
hnsfwBtn.addEventListener('click', showOrHide.bind(null, 'hide', 'nsfw'));
btnContainer.appendChild(hnsfwBtn);

mainBox.insertBefore(btnContainer, mainBox.children[0]);
