


fetch("https://randomuser.me/api/?results=12")
	.then(response => response.json())
	.then(data => {
		const employees = data.results;
		console.log(employees);
		createSearchBar();
		for(let i = 0; i<employees.length; i++){
			console.log(employees[i].name.first);
			createCard();
			const imgs = document.querySelectorAll(".card-img");
			const names = document.querySelectorAll(".card-name");
			const emails = document.querySelectorAll("p:not(.cap)");
			const locations = document.querySelectorAll("p.cap");
			imgs[i].src = employees[i].picture.large;
			names[i].innerText = employees[i].name.first + " " + employees[i].name.last;
			emails[i].innerText = employees[i].email;
			locations[i].innerText = employees[i].location.city + ", " + employees[i].location.state;
			
		}
		document.querySelectorAll(".card").forEach((card)=>{
			card.addEventListener("click", (e)=>{
				for(let i = 0; i<employees.length; i++){
					const name = card.children[1].querySelector("#name").innerText;
					if(name.toLowerCase() === (employees[i].name.first + " " + employees[i].name.last)){
						createModal(employees[i]);
					}
				}
			});
		})
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

function createSearchBar(){
	const form = document.createElement("form");
	form.action = "#";
	form.method = "get";
	document.querySelector(".search-container").appendChild(form);
	const searchInput = document.createElement("input");
	searchInput.setAttribute("type", "search");
	searchInput.id = "search-input";
	searchInput.className = "search-input";
	searchInput.placeholder = "Search...";
	searchInput.style.margin = "2px";
	form.appendChild(searchInput);
	const submit = document.createElement("input");
	submit.setAttribute("type", "submit");
	submit.setAttribute("value", "🔍");
	submit.id = "search-submit";
	submit.className = "search-submit";
	submit.style.margin = "2px";
	form.appendChild(submit);

}

function createModal(employee){
	const gallery = document.querySelector(".gallery");

	const modalContainer = document.createElement("div");
	modalContainer.className = "modal-container";
	gallery.appendChild(modalContainer);

	const modal = document.createElement("div");
	modal.className = "modal";
	modalContainer.appendChild(modal);

	const x = document.createElement("button");
	x.type = "button";
	x.id = "modal-close-btn";
	x.className = "modal-close-btn";
	x.innerHTML = "<strong>X</strong>";
	modal.appendChild(x);

	const modalInfoContainer = document.createElement("div");
	modalInfoContainer.className = "modal-info-container";
	modal.appendChild(modalInfoContainer);

	const modalImg = document.createElement("img");
	modalImg.className = "modal-img";
	modalImg.src = employee.picture.large;
	modalImg.alt = "profile picture";
	modalInfoContainer.appendChild(modalImg);

	const name = document.createElement("h3");
	name.id="name";
	name.className="modal-name cap";
	name.innerText= `${employee.name.first} ${employee.name.last}`;
	modalInfoContainer.appendChild(name);

	const email = document.createElement("p");
	email.className="modal-text";
	email.innerText= employee.email;
	modalInfoContainer.appendChild(email);

	const city = document.createElement("h3");
	city.className="modal-text cap";
	city.innerHTML= employee.location.city + "<hr>";
	modalInfoContainer.appendChild(city);
	
	const phone = document.createElement("p");
	phone.className="modal-text";
	phone.innerText= employee.phone;
	modalInfoContainer.appendChild(phone);

	const address = document.createElement("p");
	address.className="modal-text cap";
	address.innerText = `${employee.location.street}, 
		${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}`;
	modalInfoContainer.appendChild(address);

	const birthday = document.createElement("p");
	birthday.className="modal-text";
	const dateTime = new Date(employee.dob.date);
	const date = dateTime.getDate();
	const month = dateTime.getMonth();
	const year = dateTime.getFullYear();
	birthday.innerText= `Birthday: ${month}/${date}/${year}`;
	modalInfoContainer.appendChild(birthday);

}
