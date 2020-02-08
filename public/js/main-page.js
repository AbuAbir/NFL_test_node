class MainPage {
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
	
	
	
	
	this.section = document.querySelector('#searchBox');
	this.tableSection = document.querySelector('#tableResults');
	this.table = document.querySelector('#table');
	this.newPlayer = document.querySelector('#new_player');
    this.form = document.querySelector('#contact');
	this.submitButton = document.querySelector("#contact-submit");
	this.updateButton = document.querySelector("#update_button");
	this.homeButton = document.querySelector("#home_button");
	this.homeSection = document.querySelector("#home_section");
	this.listButtons = [];

    // Bind methods.
    this._onFormSubmit = this._onFormSubmit.bind(this);
	this._newPlayer = this._newPlayer.bind(this);
	this.updatePlayer = this.updatePlayer.bind(this);
	this._homeButton = this._homeButton.bind(this);

    // Add event listeners.

    this.form.addEventListener('submit', this._onFormSubmit);
	this.newPlayer.addEventListener('click', this._newPlayer);
	this.homeButton.addEventListener('click',this._homeButton);
	this.updateButton.style.display = "none";
	this.homeButton.style.display = "none";
	this.homeSection.style.display = "none";
	
	//console.log("Here\n");
    
    //this.containerElement.classList.remove('hidden');
  }

  async _onFormSubmit(event) {
    event.preventDefault();
	console.log("onForm\n");

    const params = {
      firstName: this.firstName.value !== '' ? this.firstName.value : "NA",
      lastName: this.lastName.value !== '' ? this.lastName.value : "NA",
	  playerWeight: this.playerWeight.value !== '' ? Number(this.playerWeight.value) : "NA",
	  combineYear: this.combineYear.value !== '' ? Number(this.combineYear.value) : "NA",
	  heightfeet: this.playerHeightFeet.value !== '' ? Number(this.playerHeightFeet.value) : "NA",
	  heightinches: this.playerHeightInches.value !== '' ? Number(this.playerHeightInches.value) : "NA",
	  fortyyd: this.playerForty.value !== '' ? Number(this.playerForty.value) : "NA",
	  vertical: this.playerVertical.value !== '' ? Number(this.playerVertical.value) : "NA",
	  college: this.playerCollege.value !== '' ? this.playerCollege.value : "NA",
	  playerPosition: this.playerPosition.value !== '' ? this.playerPosition.value : "NA",
	  _id: "NA"
	  
    }
	console.log(params);
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
	//console.log(fetchOptions);
	console.log(`/get/${params.firstName}/${params.lastName}/${params.playerWeight}/${params.combineYear}/${params.playerHeightFeet}/${params.playerHeightInches}/${params.playerForty}/${params.playerVertical}/${params.playerCollege}/${params.playerPosition}`);
   const result = await fetch(`/get/${params.firstName}/${params.lastName}/${params.playerWeight}/${params.combineYear}/${params.heightfeet}/${params.heightinches}/${params.fortyyd}/${params.vertical}/${params.college}/${params.playerPosition}`,fetchOptions);
    const json = await result.json();
	console.log(json);
	console.log(json[0])
	this.section.style.display = "none";
	
	var objectKeys = Object.keys(params);
	var row = this.table.insertRow(0);
	for(var i = 0; i < objectKeys.length+1; i++){
		var cell = row.insertCell(i);
		if(i<objectKeys.length){
			cell.innerHTML = objectKeys[i];
			if(objectKeys[i] === '_id'){
				cell.style.display = "none";
			}
		}
		else{
			cell.innerHTML = "Update"
		}
	}
	
	for(var i = 0; i < json.length; i++){
		var row = this.table.insertRow(i+1);
		for(var x = 0; x < objectKeys.length+1; x++){
			var cell = row.insertCell(x);
				if(x < objectKeys.length){
				cell.innerHTML = json[i][objectKeys[x]];
				if(objectKeys[x] === '_id'){
					cell.style.display = "none";
				}
				}
				else{
					cell.innerHTML =  '<button name="Update" type="button" id="A'+i+'">Update</button>';
				}
		}
		
	}
	this.getButtons(json.length);
	this.tableSection.style.display = "block";
	this.homeButton.style.display = "block";
   
  }
  
   async _newPlayer(event) {
	  event.preventDefault();
	  console.log("newPlayer");
	  const params = {
      firstName: this.firstName.value !== '' ? this.firstName.value : "NA",
      lastName: this.lastName.value !== '' ? this.lastName.value : "NA",
	  playerWeight: this.playerWeight.value !== '' ? Number(this.playerWeight.value) : "NA",
	  combineYear: this.combineYear.value !== '' ? Number(this.combineYear.value) : "NA",
	  heightfeet: this.playerHeightFeet.value !== '' ? Number(this.playerHeightFeet.value) : "NA",
	  heightinches: this.playerHeightInches.value !== '' ? Number(this.playerHeightInches.value) : "NA",
	  fortyyd: this.playerForty.value !== '' ? Number(this.playerForty.value) : "NA",
	  vertical: this.playerVertical.value !== '' ? Number(this.playerVertical.value) : "NA",
	  college: this.playerCollege.value !== '' ? this.playerCollege.value : "NA",
	  playerPosition: this.playerPosition.value !== '' ? this.playerPosition.value : "NA"
	  
    }
	
	var objectKeys = Object.keys(params);
	for(var i = 0; i<objectKeys.length; i++){
		if(params[objectKeys[i]] === 'NA' && objectKeys[i] !== 'playerPosition'){
			alert("All fields should have a value");
			return;
		}
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
    const result = await fetch('/insert',fetchOptions);
    const json = await result.json();
	console.log("newPlayer Added");
	this.section.style.display = "none";
	this.homeSection.style.display = "block";
	this.homeButton.style.display = "block";
   }

	getButtons(i){
		console.log(i);
		for(var x = 0; x<i; x++){
			this.listButtons.push(document.querySelector('#A'+x+''));
			this.listButtons[x].addEventListener('click', this.updatePlayer);
			console.log("Here");
		}
		console.log("beforeListButtons");
		console.log(this.listButtons);
	}
	
	updatePlayer(event){
		
		var playerInfo = this.table.rows[Number(event.target.id.split("A")[1])+1];
		console.log(playerInfo.cells);
		this.tableSection.style.display = "none";
		var string = "";
		for(var i = 0; i < playerInfo.cells.length; i++){
			this.form.elements[i].value = playerInfo.cells[i].innerHTML;
			//console.log(playerInfo.cells[i].innerHTML);
			string += playerInfo.cells[i].innerHTML + ",";
		}
		//this.form.firstName.value = "TEST";
		this.section.style.display = "block";
		this.submitButton.style.display = "none";
		this.newPlayer.style.display = "none";
		this.updateButton.style.display="block";
		console.log(string);
		localStorage.setItem("ourStorage", string);
		
		window.location = "/update.html";
		
	}
	
	_homeButton(event){
		window.location = "/index.html";
	}
}
