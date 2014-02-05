/*****************************
Sample AJAX Call with timeout
V0.1a



******************************/

//call with xdomain check
var r = new XMLHttpRequest(); 
r.open("POST", "webservice", true);
r.onreadystatechange = function () {
	if (r.readyState != 4 || r.status != 200) return; 
	console.log(r.responseText);
};
r.send("a=1&b=2&c=3");

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var url = 'http://localhost/xdomain_ajax/sample_response.html';
var xhr = createCORSRequest('GET', url);
console.log("RESPONSE: " + xhr);

if (!xhr) {
  throw new Error('CORS not supported');
}