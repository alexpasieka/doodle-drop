'use strict';

var recipeModal = document.querySelector('#selected-recipe-modal');
recipeModal.style.display = "flex";

document.querySelector('#selected-recipe-name').innerHTML = JSON.parse(xhr.response).name;
document.querySelector('#selected-recipe-image').src = JSON.parse(xhr.response).image;
document.querySelector('#instructions').innerHTML = JSON.parse(xhr.response).instructions;

var ingredientsArray = JSON.parse(xhr.response).ingredients.split(',');
document.querySelector('#ingredients').innerHTML = '';
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = ingredientsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var ingredient = _step.value;

		document.querySelector('#ingredients').innerHTML += '<li>' + ingredient + '</li>';
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}