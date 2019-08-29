let employees;
fetch("https://randomuser.me/api/?results=12")
	.then(response => response.json())
	.then(data => {
		employees = data.results;
		console.log(employees);
		for(let i = 0; i<employees.length; i++){
			console.log(employees[i].name.first);
			createCard();
			const imgs = document.querySelectorAll(".card-img");
			const names = document.querySelectorAll(".card-name");
			const emails = document.querySelectorAll("p:not(.cap)");
			const locations = document.querySelectorAll("p.cap");
			console.log(locations);
			imgs[i].src = employees[i].picture.large;
			names[i].innerText = employees[i].name.first + " " + employees[i].name.last;
			emails[i].innerText = employees[i].email;
			locations[i].innerText = employees[i].location.city + ", " + employees[i].location.state;
		}
	});

function createCard(){
	const card = document.createElement("div");
	card.className = "card";
	document.querySelector('.gallery').appendChild(card);
	const cardImgContainer = document.createElement("div");
	cardImgContainer.className = "card-img-container";
	card.appendChild(cardImgContainer);

	const cardImg = document.createElement("img");
	cardImg.className = "card-img";
	cardImg.alt = "profile picture";
	cardImgContainer.appendChild(cardImg);

	const cardInfoContainer = document.createElement("div");
	cardInfoContainer.className = "card-info-container";
	card.appendChild(cardInfoContainer);

	const name = document.createElement("h3");
	name.id="name";
	name.className = "card-name cap";
	cardInfoContainer.appendChild(name);

	const email = document.createElement("p");
	email.className = "card-text";
	cardInfoContainer.appendChild(email);

	const location = document.createElement("p");
	location.className = "card-text cap";
	cardInfoContainer.appendChild(location);
}


function createModal(){
	const modalContainer = document.createElement("div");
	modalContainer.className("modal-container");

}
