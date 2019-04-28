// redirect after successful AJAX
const redirect = (response) => {
  window.location = response.redirect;
};

// alert user of error
const error = (response) => {
  alert(JSON.parse(response.responseText).error);
};
