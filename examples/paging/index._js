"use strict";

try {
	var config = require('../../config.json')
} catch (ex) {
	console.error("config.json not found - see the instructions in config-template.json")
}
var ez = require('ez-streams');

function basicToken(login, password) {
	return "Basic " + new Buffer(login + ":" + password).toString("base64");
}

var baseUrl = "http://" + config.host + "/api1/x3/erp/" + config.endpoint;

// Returns one page of the feed
function getCustomersPage(_, url) {
	var response = ez.devices.http.client({
		url: url,
		method: "GET",
		headers: {
			authorization: basicToken(config.login, config.password),
		},
	}).end().response(_);
	if (response.statusCode !== 200) throw new Error("request failed with status " + response.statusCode);
	return JSON.parse(response.readAll(_));
}

// Iterates through all the feed's pages
function readAllCustomers(_) {
	var url = baseUrl + "/BPCUSTOMER?representation=BPCUSTOMER.$query&count=20";
	var pageNum = 0; // for our page banner
	console.log("connecting ... (may take a few seconds)");
	while (true) {
		var page = getCustomersPage(_, url);
		console.log("**** PAGE " + ++pageNum + " ****"); // small banner 
		page.$resources.forEach(function(res) {
			console.log(res.BPCNUM + ":\t" + res.BPCNAM);
		});
		if (!page.$links.$next) break;
		// loop with the URL of the $next link
		url = page.$links.$next.$url;
	}
	console.log("**** DONE - feed has " + pageNum + " pages ****");
}

// don't forget to call readAllCustomers, otherwise nothing happens.
readAllCustomers(_);
