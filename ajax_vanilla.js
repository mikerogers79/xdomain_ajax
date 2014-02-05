/*****************************
Vanilla AJAX Call 
V0.1a
******************************/

//onLoad function for AJAX call
function reqListener() {
  //console.log(this.responseText);

  //handle the response as JSON
  var jsonResponse = this.responseText,	
  responseObj = JSON.parse(jsonResponse);
  
  //check the response type before proceeding
  
  var decisionValid = checkDecision(responseObj.ResponseType);

    if (decisionValid) {

    //output the data on the screen
    var responseOutput = document.getElementById('response');
    responseOutput.innerHTML = jsonResponse;
	document.getElementById('headline').innerHTML = 'VALID RESPONSE\n';
	
    } else {

    //output the data on the screen
    var responseOutput = document.getElementById('response');
    responseOutput.innerHTML = jsonResponse;
	document.getElementById('headline').innerHTML = 'INVALID DECISION TYPE\n';
	
    }
   
}

//handle the decision type
function checkDecision(decisionType) {

	//normalize decisionType to a lowercase string for easier validation
	decisionType = String(decisionType);
	decisionType = decisionType.toLowerCase();
	
	if (decisionType == 'decision') {
	
		return true; //valid decision		
	
	} else {
	
		return false; //valid decision
	
	}
}


//standard function for outputting data to the screen







//Add onClick listeners to the interface buttons
(function() {

	var currentProtocol = location.protocol;
	
	//check the protocol and set the timeout accordingly
	var timeoutSecs = (location.protocol == "http:"?3:5);
	


	document.getElementById('regular').onclick = function() {
		jsonRequest('http://localhost/xdomain_ajax/sample_response.html');
		
	}
	document.getElementById('error').onclick = function() {
		jsonRequest('http://localhost/xdomain_ajax/sample_error.html');
	}
	document.getElementById('array').onclick = function() {
		jsonRequest('http://localhost/xdomain_ajax/sample_array.html');
	}
	document.getElementById('empty').onclick = function() {
		jsonRequest('http://localhost/xdomain_ajax/sample_empty.html');
		
	}

return this.resuestURL;
})();




function jsonRequest(targetUrl) {

	var jsonRequest = new XMLHttpRequest();

	//assign a function to the onload
	jsonRequest.onload = reqListener;
	//make an async GET call
	//var reqURL = 'http://localhost/xdomain_ajax/sample_response.html';

	jsonRequest.open("get", targetUrl, true);
	jsonRequest.send();

}



