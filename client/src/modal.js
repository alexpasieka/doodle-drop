const recipeModal = document.querySelector('#selected-recipe-modal');
recipeModal.style.display = "flex";

document.querySelector('#selected-recipe-name').innerHTML = JSON.parse(xhr.response).name;
document.querySelector('#selected-recipe-image').src = JSON.parse(xhr.response).image;
document.querySelector('#instructions').innerHTML = JSON.parse(xhr.response).instructions;

const ingredientsArray = (JSON.parse(xhr.response).ingredients).split(',');
document.querySelector('#ingredients').innerHTML = '';
for (let ingredient of ingredientsArray) {
	document.querySelector('#ingredients').innerHTML += `<li>${ingredient}</li>`;
}
