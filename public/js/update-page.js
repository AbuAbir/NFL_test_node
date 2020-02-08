class UpdatePage {
  constructor(containerElement) {
    this.containerElement = containerElement;
	console.log("first\n");
    this.firstName = '';
    this.lastName = '';
	this.playerWeight = '';
	this.combineYear = '';
	this.playerHeight = '';
	this.playerPosition = '';

    this.firstName = document.querySelector('#fname');
    this.lastName = document.querySelector('#lname');
    this.playerWeight = document.querySelector('#weight');
    this.combineYear = document.querySelector('#combine_year');
	this.playerHeightFeet = document.querySelector('#height_feet');
	this.playerHeightInches = document.querySelector('#height_inches');
	this.playerForty = document.querySelector('#forty_time');
	this.playerVertical = document.querySelector('#vertical_leap');
	this.playerCollege = document.querySelector('#player_college');
	this.playerPosition = document.querySelector('#position');
	
	this.homeButton = document.querySelector("#home_button");
	this.homeSection = document.querySelector("#home_section");
    this.form = document.querySelector('#contact');
	
	var playerData = localStorage.getItem("ourStorage").split(",");
	this.playerID = playerData[this.form.elements.length-1];
	for(var i = 0; i < this.form.elements.length; i++){
			this.form.elements[i].value = playerData[i];
	}
	
	
	this._onFormSubmit = this._onFormSubmit.bind(this);
	this._homeButton = this._homeButton.bind(this);
	this.homeButton.addEventListener('click',this._homeButton);
	this.form.addEventListener('submit', this._onFormSubmit);
	this.homeButton.style.display = "none";
	this.homeSection.style.display = "none";
	//this.submitButton = document.querySelector("#contact-submit");

    // Bind methods.
   

    // Add event listeners.


	//console.log("Here\n");
    
    //this.containerElement.classList.remove('hidden');
  }

 async _onFormSubmit(event) {
    event.preventDefault();
	
	const params = {
	  firstName: this.form.elements[0].value,
      lastName: this.form.elements[1].value,
	  playerWeight: this.form.elements[2].value,
	  combineYear: this.form.elements[3].value,
	  heightfeet: this.form.elements[4].value,
	  heightinches: this.form.elements[5].value,
	  fortyyd: this.form.elements[6].value,
	  vertical: this.form.elements[7].value,
	  college: this.form.elements[8].value,
	  playerPosition: this.form.elements[9].value,
	  _id: this.playerID
    }
	
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
	console.log(fetchOptions);
    const result = await fetch('/update',fetchOptions);
    const json = await result.json();
	console.log(json);
	this.form.style.display = "none";
	this.homeSection.style.display = "block";
	this.homeButton.style.display = "block";
	
  }

	_homeButton(event){
		window.location = "/index.html";
	}
}
