/**
 * Performs a GET HTTP request
 * @param  {String} url URL of the server/website
 * @param {Function} callback Callback function containing the response code and body
 */
function httpGet(url, callback){
    if(!url){
        console.error("No URL specified");
        return;
    }
    if(!callback){
        console.error("No callback function specified");
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) callback(xhr.status, xhr.responseText);
    };

    xhr.open('GET', url, true);
    xhr.send();
}

/**
 * Performs a POST HTTP request
 * @param  {String} url URL of the server/website
 * @param  {Object} data Data to send
 * @param {Function} callback Callback function containing the response code and body
 * @param {String} [contentType=application/json] Content type
 */
function httpPost(url, data, callback, contentType) {
    if(!url) {
        console.error("No URL specified");
        return;
    }
    if(!callback){
        console.error("No callback function specified");
        return;
    }
    if(!contentType) contentType = "application/json";

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) callback(xhr.status, xhr.responseText);
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", contentType);

    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}