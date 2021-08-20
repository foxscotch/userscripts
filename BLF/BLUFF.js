// ==UserScript==
// @name         BLUFF
// @namespace    http://foxscotch.us/
// @version      0.2.3
// @description  Some things to help you make userscripts for the Blockland Forum
// @author       Foxscotch
// @match        http://forum.blockland.us/index.php*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

console.log(`${GM_info.script.name} ${GM_info.script.version} running!`);
var namespace = {};


// Separates the query string  
function getQueryParams(queryString) {
    if (queryString[0] == '?') {
        var pairs = queryString.slice(1).split(/[;&]/);
    }
    else {
        var pairs = queryString.split(/[;&]/);
    }
    
    var results = {};
    
    for (var i = 0; i < pairs.length; i++) {
      var cur = pairs[i].split('=');
      results[cur[0]] = cur[1];
    }
    
    return results;
}
namespace.queryParams = getQueryParams(window.location.search);
namespace.getQueryParams = getQueryParams;


// Provides simple information about what kind of page the user is on.
function getPageType() {
    var type = {};
    var qp = namespace.queryParams;
    
    if (qp.topic) {
        var statusImages = document.querySelectorAll('.titlebg > td > img');
        type.topic = {};
        
        if (statusImages[statusImages.length - 1].src.includes('locked')) {
            type.topic.locked = true;
        }
        if (statusImages.length > 1) {
            type.topic.poll = true;
            if (statusImages[0].src.includes('locked')) {
                type.topic.pollLocked = true;
            }
        }
    }
    else if (qp.action == 'post' || qp.action == 'post2') {
        type.post = true;
    }
    else if (qp.board) {
        type.board = true;
    }
    else if (qp.action == 'profile') {
        type.profile = {};
        
        if (!qp.sa || qp.sa == 'summary') {
            type.profile.summary = true;
        }
        else if (qp.sa == 'statsPanel') {
            type.profile.stats = true;
        }
        else if (qp.sa == 'showPosts') {
            type.profile.posts = true;
        }
        else if (qp.sa == 'account') {
            type.profile.accountSettings = true;
        }
        else if (qp.sa == 'forumProfile') {
            type.profile.profileSettings = true;
        }
        else if (qp.sa == 'theme') {
            type.profile.layoutSettings = true;
        }
        else if (qp.sa == 'notification') {
            type.profile.notificationSettings = true;
        }
        else if (qp.sa == 'pmprefs') {
            type.profile.pmSettings = true;
        }
    }
    else if (qp.action == 'search') {
        type.search = true;
    }
    else if (!window.location.search) {
        type.index = true;
    }
    else {
        type.other = true;
    }

    return type;
}
namespace.pageType = getPageType();


// This function gives you the current user's session ID. It gets it from the
// logout button since that's guaranteed to be on every page.
function getSession() {
    var logout = document.querySelector('img[alt="Logout"]').parentElement;
    return logout.href.split('=')[2];
}
namespace.sessionId = getSession();


// Provides the username (only the username, does not construct a User) of the
// currently logged-in user.
function getUserName() {
    var element = document.querySelector('td[valign="middle"]:not([align]) b');
    return element.textContent.trim();
}
namespace.curUserName = getUserName();


function User(usernameElement, avatarElement, memberId) {
    this.usernameElement = usernameElement;
    this.username = usernameElement.textContent.trim();
    
    this.avatarElement = avatarElement;
    
    this.memberId = memberId;
}

User.prototype.updateInfo = function (doc) {
    if (doc.querySelector('a[title*="Personal Message"]').children[0].alt == 'Online') {
        this.online = true;
    }
    else {
        this.online = false;
    }
    
    this.profileElement = doc.querySelector('table.bordercolor[align=center]')
    
    var infoTables = this.profileElement.querySelectorAll('tr');
    
    this.personalText = infoTables[2].children[0].textContent.trim();
    
    this.blId = Number(infoTables[4].children[1].textContent);
    
    var postStatsRegex = /(\d+) \((\d+\.\d+) per day\)/;
    var postStats = infoTables[5].children[1].textContent;
    postStats = postStats.match(postStatsRegex);
    this.postCount = Number(postStats[1]);
    this.postsPerDay = Number(postStats[2]);
    
    this.gender = infoTables[17].children[1].textContent;
    
    var tempAge = Number(infoTables[18].children[1].textContent);
    if (isNaN(tempAge)) {
        this.age = 'N/A';
    }
    else {
        this.age = tempAge;
    }
    
    this.location = infoTables[19].children[1].textContent;
    
    this.sigElement = doc.querySelector('div.signature');
}

User.prototype.getProfileInfo = function (callback) {
    var user = this;
    
    var request = new XMLHttpRequest();
    request.responseType = 'document';
    
    request.onload = function () {
        user.updateInfo(this.response);
        if (callback) {
            callback(user);
        }
    };
    
    request.open('get', 'http://forum.blockland.us/index.php?action=profile;u=' + user.memberId);
    request.send();
}

namespace.User = User;


function handlePage() {
    // For convenience
    var pt = namespace.pageType;
    
    if (pt.profile) {
        if (pt.profile.summary) {
            var name = document.querySelectorAll('tr.titlebg > td')[0];
            var av = document.querySelector('.avatar');
            var params = getQueryParams(document.querySelectorAll('td.windowbg2[colspan="2"] > a')[0].href.split('?')[1]);
            var id = Number(params.u);
            
            namespace.currentUser = new User(name, av, id);
            namespace.currentUser.updateInfo(document);
        }
        else if (pt.profile.stats) {
            
        }
    }
    
    else if (pt.topic) {
        var postList = [];
        var posts = document.querySelectorAll('.post');
        for (var i = 0; i < posts.length; i++) {
            postList.push(posts[i].parentElement.parentElement);
        }
    }
}

handlePage();


// This is not my doing, but for your information, window.ajax_indicator() is
// good for indicating that you are loading.

// window.ajax_indicator(true); turns it on, and...
// window.ajax_indicator(false); turns it off!

// I intend to add better facilities for this kind of thing later, because using
// this method, if someone else is loading something, yours will turn theirs off
// whenever it finishes.


window.bluff = namespace;

var finishedEvent = new Event('utilsFinished');
document.dispatchEvent(finishedEvent);