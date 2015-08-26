"use strict";

try {
	var config = require('../../config.json')
} catch (ex) {
	console.error("config.json not found - see the instructions in config-template.json")
}
var ez = require('ez-streams');

// Generates the basic authentication token that we pass via the HTTP "Authorization" header
function basicToken(login, password) {
	return "Basic " + new Buffer(login + ":" + password).toString("base64");
}

// Build our base URL with the host/endpoint information that we loaded from config.json
var baseUrl = "http://" + config.host + "/api1/x3/erp/" + config.endpoint;

// This function calls the web service to query the BPCUSTOMER representation.
function listCustomers(_) {
	var response = ez.devices.http.client({
		url: baseUrl + "/BPCUSTOMER?representation=BPCUSTOMER.$query",
		method: "GET",
		headers: {
			authorization: basicToken(config.login, config.password),
		},
	}).end().response(_);
	if (response.statusCode !== 200) throw new Error("request failed with status " + response.statusCode);
	return JSON.parse(response.readAll(_));
}

// Call listCustomers and display the customer code (BPCNUM) and name (BPCNAM) for each one.
var result = listCustomers(_);
// result is not an array but a small envelope object. The array is in result.$resources 
result.$resources.forEach(function(res) {
	console.log(res.BPCNUM + ":\t" + res.BPCNAM);
});
