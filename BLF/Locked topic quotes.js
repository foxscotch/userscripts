// ==UserScript==
// @name         Locked topic quotes
// @namespace    https://foxscotch.net/
// @version      1.3
// @description  Show quote buttons on locked topics
// @author       Foxscotch
// @match        https://forum.blockland.us/index.php?topic=*
// @grant        none
// ==/UserScript==

var mainUrl = 'https://forum.blockland.us/';
var quoteImageUrl = mainUrl + 'Themes/Blockland/images/english/quote.gif';

function getStatus() {
    var status = {};
    var statusImages = document.querySelectorAll('.titlebg > td > img');

    if (statusImages[statusImages.length - 1].src.includes('locked')) {
        status.locked = true;
    }
    if (statusImages.length > 1) {
        status.poll = true;
        if (statusImages[0].src.includes('locked')) {
            status.pollLocked = true;
        }
    }

    return status;
}
var status = getStatus();

function getSession() {
    var logout = document.querySelector('img[alt="Logout"]').parentElement;
    return logout.href.split('=')[2];
}
var sessId = getSession();

function addTextBox() {
    var container = document.createElement('div');
    container.id = 'locked-topic-container';

    var textArea = document.createElement('textarea');
    textArea.id = 'locked-topic-textbox';

    var copyButton = document.createElement('button');
    copyButton.id = 'locked-topic-copy';
    copyButton.textContent = "Copy to clipboard";

    container.style.margin = 'auto';
    container.style.width = '25%';

    textArea.style.display = 'block';
    textArea.style.height = '150px';
    textArea.style.width = "100%";

    copyButton.addEventListener('click', function () {
        textArea.select();
        var copied = document.execCommand('copy');
        copied ? console.log('Copied') : console.log('Not copied');
    });

    var breaks = document.getElementsByTagName('br');
    breaks[breaks.length - 2].parentElement.insertBefore(container, breaks[breaks.length - 1]);
    container.appendChild(copyButton);
    container.appendChild(textArea);
}

function getQuote(link) {
    window.ajax_indicator(1);
    var xhr = new XMLHttpRequest();
    var quote;

    xhr.onload = function () {
        xml = xhr.responseXML;
        quote = xml.getElementsByTagName('quote')[0].textContent;

        document.getElementById('locked-topic-textbox').value += quote;

        window.ajax_indicator(0);
    };

    xhr.open('GET', mainUrl + `index.php?action=quotefast;quote=${link.dataset.messageId};sesc=${sessId};xml`);
    xhr.send();
}

function addQuoteButtons() {
    var quoteDestinations = document.querySelectorAll('td[height="20"]:not([width])');

    for (var i = 0; i < quoteDestinations.length; i++) {
        var link = document.createElement('a');
        link.href = "#locked-topic-textbox";

        var quoteImg = document.createElement('img');
        quoteImg.src = quoteImageUrl;
        quoteImg.alt = 'Reply with quote';
        quoteImg.border = '0';

        link.appendChild(quoteImg);
        quoteDestinations[i].appendChild(link);

        var msgId = quoteDestinations[i].parentElement.querySelector('div').id.split('_')[1];
        link.dataset.messageId = msgId;

        link.addEventListener('click', getQuote.bind(null, link));
    }
}

if (status.locked) {
    addTextBox();
    addQuoteButtons();
}
