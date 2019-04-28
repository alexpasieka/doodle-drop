"use strict";

// redirect after successful AJAX
var redirect = function redirect(response) {
  window.location = response.redirect;
};

// alert user of error
var error = function error(response) {
  alert(JSON.parse(response.responseText).error);
};