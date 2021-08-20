// Turns a string of GET parameters into an associative array

var createParameterDict = function (separator) {
    if (!separator) {
        separator = '&'
    }
    
    var parameters = {};
    var paramsWithValues = window.location.search.slice(1).split(separator);

    for (var i = 0; i < paramsWithValues.length; i++) {
        var paramThenValue = paramsWithValues[i].split('=');
        if (paramThenValue[1]) {
            parameters[paramThenValue[0]] = paramThenValue[1];
        }
        else {
            parameters[paramThenValue[0]] = true;
        }
    }
    
    return parameters;
};

// when window.location.search == '?action=who;sort=user;asc'
// createParameterDict(';') returns {action: 'who', sort: 'user', asc: true}



// Takes a string in the format '1h2m3s' (1 hour, 2 minutes, 3 seconds) and
// returns the total number of seconds that adds up to. (that example is 3723)

function convertTime (timeString) {
    regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
    result = timeString.match(regex);
    if (result[3]) {
        seconds = Number(result[3]);
    } else { seconds = 0; }
    if (result[2]) {
        seconds += Number(result[2]) * 60;
    }
    if (result[1]) {
        seconds += Number(result[1]) * 60 * 60;
    }
    
    return seconds;
}

// convertTime('2m10s') == 130
// convertTime('1h3m54s') == 3834