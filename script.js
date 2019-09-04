
const results = fetch("https://randomuser.me/api/?results=12&nat=us,gb")
	.then(response => response.json())
	.then(data => {
		const employees = data.results;
		createSearchBar();
/**
* Adds data from API to the field cards.
**/
		for(let i = 0; i<employees.length; i++){
			createCard();
			document.querySelectorAll(".card-img")[i].src = employees[i].picture.large;
			document.querySelectorAll(".card-name")[i].innerText = employees[i].name.first + " " + employees[i].name.last;
			document.querySelectorAll("p:not(.cap)")[i].innerText = employees[i].email;
			document.querySelectorAll("p.cap")[i].innerText = employees[i].location.city + ", " + employees[i].location.state;
		}
		for(let i = 0; i<employees.length; i++){
			createModal(employees[i]);
		}
		document.querySelectorAll(".modal-container").forEach((modal)=>{
				modal.style.display = "none";
		})
/**
* Displays proper modal when a card is clicked.
**/
		const modalContainers = document.querySelectorAll(".modal-container");
		document.querySelectorAll(".card").forEach((card)=>{
			card.addEventListener("click",()=>{
				const name = card.querySelector("#name").innerText;
				const email = card.querySelector("#email").innerText;
				modalContainers.forEach((modal)=>{
					if(name.toLowerCase() === (modal.querySelector("#name").innerText.toLowerCase()) && email === modal.querySelector("#email").innerText){
					modal.style.display = "";
					}
				});
			})
		})
/**
*Adds functionality to the X, next, prev buttons inside the modal.
**/
		modalContainers.forEach((modal)=>{
			modal.addEventListener("click", (e)=>{
				if(e.target.innerText === "X"){
					modal.style.display = "none";
				}
				const prev = document.querySelector("#modal-prev");
				const next = document.querySelector("#modal-next");
				if(e.target.innerText === "PREV"){		
					if(modal.previousElementSibling.className === "modal-container"){
						modal.style.display = "none";
						modal.previousElementSibling.style.display = "";
					}
				}
				if(e.target.innerText === "NEXT"){
					if(modal.nextElementSibling){
						modal.style.display = "none";
						modal.nextElementSibling.style.display = "";
					}	
				}
			});
	
		});
/**
*the search function gets called when the submit button is clicked or when there there is a change
*in the input value.
**/
		document.querySelector("#search-submit").addEventListener("click", (e)=>{
			e.preventDefault();
			search(employees);

		});
		document.querySelector("#search-input").addEventListener("input", ()=>{
			search(employees);
		});	
	}).catch(err=>console.log(err));
/**
*Searches through the cards and looks for a card matching the input value. If there is one, it displays
*it on the screen.
**/
function search(employees){
	const input = document.querySelector("#search-input");
	const cards = document.querySelectorAll(".card");
	cards.forEach((card)=>{
		const cardName = card.querySelector("#name").innerText.toLowerCase();		
		if(cardName.indexOf(input.value.toLowerCase()) > -1){
			card.style.display = "";
		}else{
			card.style.display = "none";	
		}
	});
}
/**
*Creates card for each element in the page. Each card contains a field for name, email and location
**/
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
	email.id = "email";
	email.className = "card-text";
	cardInfoContainer.appendChild(email);

	const location = document.createElement("p");
	location.className = "card-text cap";
	cardInfoContainer.appendChild(location);
}

/**
*Creates search bar
**/
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

/**
* Creates modal-container and all its children and appends them to the DOM. Modal
* contains fields for name,email, state, phone, address and birthday
**/
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
	email.id = "email";
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
	const month = dateTime.getMonth() + 1;
	const year = dateTime.getFullYear();
	birthday.innerText= `Birthday: ${month}/${date}/${year}`;
	modalInfoContainer.appendChild(birthday);

	const btnContainer = document.createElement("div");
	btnContainer.className = "modal-btn-container";
	modalContainer.appendChild(btnContainer);

	const prev = document.createElement("button");
	prev.type = "button";
	prev.id = "modal-prev";
	prev.className = "modal-prev btn";
	prev.innerText = "Prev";
	btnContainer.appendChild(prev);

	const next = document.createElement("button");
	next.type = "button";
	next.id = "modal-next";
	next.className = "modal-next btn";
	next.innerText = "Next";
	btnContainer.appendChild(next);
}
