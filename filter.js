//filter.js is the front end driver file that is invoked from the index.html file.

//initilizaing empty objects for json 
let mySongs = new Set()
let userData = {}
let deleteData = {}
let putData = {}
let isStorable = storageAvailable('localStorage')
if (storageAvailable) {
  getUserStorage()

}




let query1Tracks = []
let query2Albums = []
let query3Albums = []

//post method
var fetchOptions = {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
}

//delete method
var deleteOption = {
  method: "DELETE",
  headers: new Headers({
    "Authorization": "Bearer <your-auth-token>"
  }),
};

//put methdod
var putOptions = {
  method: "PUT",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};

function showQuery(index, data) {
  let view = document.getElementById(`queryResult${index}`)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
  let list = document.createElement("ul")
  data.forEach(n => {
    li = document.createElement("li")
    li.textContent = n
    list.appendChild(li)
  })
  view.appendChild(list)
}

// unused const url = "http://localhost:5000/";

/*
called from the html which then sends it to respective
function that handles the values within the e.target
*/
function formSubmitHandler(e) {
  e.preventDefault();
  if (e.target.id == "artist") {
    getArtist(e.target);
  }
  else if (e.target.id == "genre") {
    getGenre(e.target);
  }
  else if (e.target.id == "artists") {
    getArtists(e.target);
  }
  else if (e.target.id == "addSong") {
    putSong(e.target);
  }
  else if (e.target.id == "deleteSong") {
    deleteSong(e.target);
  }
}

//grab artist
/*
grabs the values of the text boxes, inserts %20 if there are space values and then makes 
a fetch request to grab songs from an artist
*/
function getArtist(form) {
  console.log("getArtist Function")
  console.log(form.part_1.value)
  if (form.part_1.value != "") {
    userData.artist = form.part_1.value;
    let temp = form.part_1.value;
    let tempCleaned = temp.replace(/\s/g, '%20')
    fetchOptions.body = JSON.stringify(userData);
    console.log("http://localhost:5000/query1?artist=" + tempCleaned);
    fetch("http://localhost:5000/query1?artist=" + tempCleaned, fetchOptions)
      .then((result) => {
        return result.json();
      }).then((data) => {
        listElements = new Set()
        data.body.forEach(n => listElements.add(n[0]))
        console.log(listElements)
        showQuery("1", listElements)
      });
  }
  else {
    alert("Error: Please check that you've entries in all text boxes");
  }
}

//get Genre
/*
grabs the values of the text boxes, inserts %20 if there are space values and then makes 
a fetch request to grab songs based on Genre
*/
function getGenre(form) {
  console.log("getGenre Function")
  console.log(form.part_1.value)
  if (form.part_1.value != "") {
    userData.genre = form.part_1.value;
    let temp = form.part_1.value;
    let tempCleaned = temp.replace(/\s/g, '%20');
    fetchOptions.body = JSON.stringify(userData);
    console.log("http://localhost:5000/query2?genre=" + tempCleaned);
    fetch("http://localhost:5000/query2?genre=" + tempCleaned, fetchOptions)
      .then((result) => {
        return result.json();
      }).then((data) => {
        listElements = new Set()
        data.body.forEach(n => listElements.add(n[0]))
        console.log(listElements)
        showQuery("2", listElements)
      });
  }
  else {
    alert("Error: Please check that you've entries in all text boxes");
  }
}

//get artists
/*
grabs the values of the text boxes, inserts %20 if there are space values and then makes 
a fetch request to grab songs based on both artist criteria
*/
function getArtists(form) {
  console.log("getArtists Function");
  console.log(form.part_1.value);
  console.log(form.part_2.value);
  if (form.part_1.value != "" && form.part_2.value != "") {
    userData.artist1 = form.part_1.value;
    userData.artist2 = form.part_2.value;
    let temp1 = form.part_1.value;
    let temp1Cleaned = temp1.replace(/\s/g, '%20');
    let temp2 = form.part_2.value;
    let temp2Cleaned = temp2.replace(/\s/g, '%20');
    fetchOptions.body = JSON.stringify(userData);
    console.log("http://localhost:5000/query3?artist1=" + temp1Cleaned + "&artist2=" + temp2Cleaned);
    fetch("http://localhost:5000/query3?artist1=" + temp1Cleaned + "&artist2=" + temp2Cleaned, fetchOptions)
      .then((result) => {
        return result.json();
      }).then((data) => {
        listElements = new Set()
        data.body.forEach(n => listElements.add(n[0]))
        console.log(listElements)
        showQuery("3", listElements)
      });
  }
  else {
    alert("Error: Please check that you've entries in all text boxes");
  }
}

//place a song
/*
grabs the values of the text boxes, inserts %20 if there are space values and then makes 
a fetch request to place songs into the database
*/
function putSong(form) {
  console.log("putSong Function")
  console.log(form.part_1.value)
  console.log(form.part_2.value)
  console.log(form.part_3.value)
  if (form.part_1.value != "" && form.part_2.value != "" && form.part_3.value != "") {
    if (isStorable) {
      addStoredSong(form.part_1.value)
      console.log("song added to localstorage")
    }
    putData.track = form.part_1.value;
    putData.artist = form.part_2.value;
    putData.album = form.part_2.value;
    let temp1 = form.part_1.value;
    let temp1Cleaned = temp1.replace(/\s/g, '%20');
    let temp2 = form.part_2.value;
    let temp2Cleaned = temp2.replace(/\s/g, '%20');
    let temp3 = form.part_3.value;
    let temp3Cleaned = temp3.replace(/\s/g, '%20');
    putOptions.body = JSON.stringify(putData);
    console.log("http://localhost:5000/query4?track=" + temp1Cleaned + "&artist=" + temp2Cleaned + "&album=" + temp3Cleaned);
    fetch("http://localhost:5000/query4?track=" + temp1Cleaned + "&artist=" + temp2Cleaned + "&album=" + temp3Cleaned, putOptions)
      .then((result) => {
        return result.json();
      }).then((data) => {
        let result = data.body
        let view = document.getElementById(`queryResult4`)
        if (view.firstChild) {
          view.removeChild(view.firstChild)
        }
        view.textContent = result
        console.log(data)
      });
  }
  else {
    alert("Error: Please check that you've entries in all text boxes");
  }
}



//delete a song
/*
grabs the values of the text boxes, inserts %20 if there are space values and then makes 
a fetch request to delete song in the database
*/
function deleteSong(form) {
  console.log("deleteSong Function")
  console.log(form.part_1.value)
  if (form.part_1.value != "") {
    if (isStorable ) {
      if (!mySongs.has(form.part_1.value)) {
        alert("Error: Permission Denied, Not Song User Added")
        return;
      } 
      deleteStoredSong(form.part_1.value)
      showStoredSongs()
    }

    
    deleteData.deletion = form.part_1.value
    deleteOption.body = JSON.stringify(deleteData);
    let temp = form.part_1.value;
    let tempCleaned = temp.replace(/\s/g, '%20');
    console.log("http://localhost:5000/query5?deletion=" + tempCleaned)
    fetch("http://localhost:5000/query5?deletion=" + tempCleaned, deleteOption)
      .then((result) => {
        return result.json();
      }).then((data) => {
        let result = data.body
        let view = document.getElementById(`queryResult5`)
        if (view.firstChild) {
          view.removeChild(view.firstChild)
        }
        view.textContent = result
        console.log(data)
      });
  }
  else {
    alert("Error: Please check that you've entries in all text boxes");
  }
}

/*

functions below just determine which div block is displayed based on the choice of the user

*/
function choice1() {
  inputElements = document.querySelectorAll("input")
  inputElements.forEach(inputElement => inputElement.value="")
  document.getElementById('firstChoice').style.display = "block";
  document.getElementById('secondChoice').style.display = "none";
  document.getElementById('thirdChoice').style.display = "none";
  document.getElementById('fourthChoice').style.display = "none";
  document.getElementById('fifthChoice').style.display = "none";
  let view = document.getElementById(`queryResult1`)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
}

function choice2() {
  inputElements = document.querySelectorAll("input")
  inputElements.forEach(inputElement => inputElement.value="")
  document.getElementById('firstChoice').style.display = "none";
  document.getElementById('secondChoice').style.display = "block";
  document.getElementById('thirdChoice').style.display = "none";
  document.getElementById('fourthChoice').style.display = "none";
  document.getElementById('fifthChoice').style.display = "none";
  let view = document.getElementById(`queryResult2`)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
}

function choice3() {
  inputElements = document.querySelectorAll("input")
  inputElements.forEach(inputElement => inputElement.value="")
  document.getElementById('firstChoice').style.display = "none";
  document.getElementById('secondChoice').style.display = "none";
  document.getElementById('thirdChoice').style.display = "block";
  document.getElementById('fourthChoice').style.display = "none";
  document.getElementById('fifthChoice').style.display = "none";
  let view = document.getElementById(`queryResult3`)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
}

function choice4() {
  inputElements = document.querySelectorAll("input")
  inputElements.forEach(inputElement => inputElement.value="")
  document.getElementById('firstChoice').style.display = "none";
  document.getElementById('secondChoice').style.display = "none";
  document.getElementById('thirdChoice').style.display = "none";
  document.getElementById('fourthChoice').style.display = "block";
  document.getElementById('fifthChoice').style.display = "none";
  let view = document.getElementById(`queryResult4`)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
}

function choice5() {
  inputElements = document.querySelectorAll("input")
  inputElements.forEach(inputElement => inputElement.value="")
  document.getElementById('firstChoice').style.display = "none";
  document.getElementById('secondChoice').style.display = "none";
  document.getElementById('thirdChoice').style.display = "none";
  document.getElementById('fourthChoice').style.display = "none";
  document.getElementById('fifthChoice').style.display = "block";

  if (isStorable) {
    console.log('djlkdjss')
    showStoredSongs()
  }
}

// Session

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

function getUserStorage() {
  var currentStorage = JSON.parse(localStorage.getItem("mySongs"));
  let tempSet = new Set()
  for (let i in currentStorage)
    tempSet.add(currentStorage[i])
  mySongs = tempSet
}

function addStoredSong(song) {
  mySongs.add(song)
  localStorage.setItem("mySongs", JSON.stringify([...mySongs]))
}

function showStoredSongs() {
  let view = document.getElementById(`queryResult5`)
  console.log(view)
  while (view.firstChild) {
    view.removeChild(view.firstChild)
  }
  let list = document.createElement("ul")
  let iterStorage = [...mySongs]
  iterStorage.forEach(song => {
    li = document.createElement("li")
    li.textContent = song
    list.appendChild(li)
  })
  view.appendChild(list)
  console.log(view)
}

function deleteStoredSong(song) {
  mySongs.delete(song)
  localStorage.setItem("mySongs", JSON.stringify([...mySongs]))
}