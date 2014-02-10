/*****************************
Vanilla AJAX Call 
VERSION: 0.2a
CREATED BY: Mike Rogers
CREATED ON: 2/3/14
UPDATED: 2/10/14 

0.2a Putting all of the personalization 
elements into an object for easier maintenance.

Next versions
0.3a Add Cross Domain authentication.
0.4a Include timeout for killing AJAX call based on protocol.
0.5a Add methods for handling array responses.
******************************/

//onLoad function for AJAX call
function reqListener() {
  //console.log(this.responseText);

  //handle the response as JSON
  var jsonResponse = this.responseText,	
  responseObj = JSON.parse(jsonResponse);

  //create new site personalization object
  var personalization = new SitePersonalization(responseObj);
      
}











/**********SITE PERSONALIZATION OBJECT***********/

//sample object for managing content based on JSON
function SitePersonalization(responseObj) {

	this.headline ='NO HEADLINE', 
	response = responseObj,
	decisionValid = this.checkDecision(response.ResponseType);   //check the response type before proceeding
	
	
	if (decisionValid) {

		this.headline = "VALID RESPONSE!\n";
		this.clearContent();
		
		//output the data on the screen
		outputToElement('response', JSON.stringify(response));
		outputToElement('headline', this.headline);
		this.displayShoes();
		this.displayStarRating();
	
    } else {

		//console.log('INVALID RESPONSE');
		this.headline = "INVALID RESPONSE :'(\n";
		this.clearContent();
		
		//output the data on the screen
		outputToElement('response', JSON.stringify(response));
		outputToElement('headline', this.headline);
	
    }

	
}


//decide whether to show shoes or not
SitePersonalization.prototype.displayShoes = function() {
		
		//JSON.parse();
			
		if (response.CategoryRecommendation == 'Shoes-Nike') {
		
			outputToElement('content', "<img src='images/nike.jpg' />");
			
		}
	
};


//show star rating
SitePersonalization.prototype.displayStarRating = function() {

	var numStars = parseInt(response.StarRating);
	
	if (response.StarRating > 0) {
				
		var starBuffer = '';
		for (var x = 0; x < numStars; x++) {
		
			starBuffer += '*';
		
		}	
	}

	outputToElement('star_rating', starBuffer);
};



//clear the content
SitePersonalization.prototype.clearContent = function() {
	
		outputToElement('headline', "");
		outputToElement('content', "");
		outputToElement('star_rating', "");
	
};


//handle the decision type
SitePersonalization.prototype.checkDecision = function(decisionType) {

	//normalize decisionType to a lowercase string for easier validation
	decisionType = String(decisionType);
	decisionType = decisionType.toLowerCase();
	
	if (decisionType == 'decision') {
	
		return true; //valid decision		
	
	} else {
	
		return false; //valid decision
	
	}
};







/**********UI CODE***********/


//Add onClick listeners to the interface buttons
(function() {

	/*
	var currentProtocol = location.protocol;
	
	//check the protocol and set the timeout accordingly
	var timeoutSecs = (location.protocol == "http:"?3:5);
	*/


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



//standard function for outputting data to a specific element by ID
function outputToElement(outputElement, outputContent) {

	//check the element exists before writing any content to it
	var outputElement = document.getElementById(outputElement);
	if (outputElement) {
	
		outputElement.innerHTML = outputContent;
		return true;
	}

}



function jsonRequest(targetUrl) {

	var jsonRequest = new XMLHttpRequest();

	//assign a function to the onload
	jsonRequest.onload = reqListener;

	//make an async GET call
	jsonRequest.open("get", targetUrl, true);
	jsonRequest.send();

}



