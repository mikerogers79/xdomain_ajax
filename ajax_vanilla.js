/*****************************
Vanilla AJAX Call 
V0.1a



******************************/

function reqListener () {
  console.log(this.responseText);
  
  //output the data on the screen
  var responseOutput = document.getElementById('response');
	responseOutput.innerHTML = responseOutput.innerHTML + ' ' + jsonRequest.responseText;
}



var jsonRequest = new XMLHttpRequest();

//assign a function to the onload
jsonRequest.onload = reqListener;
//make an async GET call
jsonRequest.open("get", "http://localhost/xdomain_ajax/sample_response.html", true);
jsonRequest.send();