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
			imgs[i].src = employees[i].picture.large;
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
	cardImgContainer.appendChild(cardImg);

	const cardInfoContainer = document.createElement("div");
	cardInfoContainer.className = "card-info-container";
	card.appendChild(cardInfoContainer);

}

