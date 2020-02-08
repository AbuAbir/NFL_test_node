class App {
  constructor() {
	const urlPathString = window.location.pathname;
	const parts = urlPathString.split('/');
	//console.log(parts[1]);
	if(parts[1] === 'index.html'){
      this._showMainPage();
	}
	else if(parts[1] === 'update.html'){
		this._showUpdatePage(parts[2]);
	}
	 // console.log("Here1\n");
  }

  _showMainPage() {
    const viewContainer = document.querySelector('#main-page');
    const mainPage = new MainPage(viewContainer);
	//console.log("Here2\n");
  }

  _showUpdatePage(data) {
    const viewContainer = document.querySelector('#update-page');
	console.log("INSIDE SHOW UPDATE PAGE")
	console.log(data);
    const updatePage = new UpdatePage(viewContainer);
  }
}
