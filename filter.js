 let userData = {}

    var fetchOptions = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
      }

      const url = "http://localhost:5000/";


      function formSubmitHandler(e) {
        e.preventDefault();
        if (e.target.id == "artist"){
        getArtist(e.target);
        }
        if (e.target.id == "genre"){
        getGenre(e.target);
        }
        if (e.target.id == "artists"){
        getArtists(e.target);
        }
      }

      //grab artist
      function getArtist(form)
      {
        console.log("getArtist Function")
        console.log(form.part_1.value)
          if(form.part_1.value != "") {
              userData.artist = form.part_1.value
              fetchOptions.body = JSON.stringify(userData);
              fetch("http://localhost:5000/path?artist=" + form.part_1.value, fetchOptions)
              .then((result)=>{
                  return result.json();
                }).then((data)=>{
              });}
              else {
                  alert("Error: Please check that you've entries in all text boxes");
              }
      }

      //get Genre
      function getGenre(form)
      {
        console.log("getGenre Function")
        console.log(form.part_1.value)
          if(form.part_1.value != "") {
              userData.genre = form.part_1.value
              fetchOptions.body = JSON.stringify(userData);
              fetch("http://localhost:5000/path?genre="+form.part_1.value, fetchOptions)
              .then((result)=>{
                  return result.json();
                }).then((data)=>{
              });}
              else {
                  alert("Error: Please check that you've entries in all text boxes");
              }
      }

      //get artists
      function getArtists(form)
      {
        console.log("getArtists Function")
        console.log(form.part_1.value)
        console.log(form.part_2.value)
          if(form.part_1.value != "") {
              userData.artist1 = form.part_1.value
              userData.artist2 = form.part_2.value
              fetchOptions.body = JSON.stringify(userData);
              fetch("http://localhost:5000/path?artist1="+form.part_1.value+"&&artist2="+form.part_2.value, fetchOptions)
              .then((result)=>{
                  return result.json();
                }).then((data)=>{
              });}
              else {
                  alert("Error: Please check that you've entries in all text boxes");
              }
      }
    


    
    function choice1(){
        document.getElementById('firstChoice').style.display = "block";
        document.getElementById('secondChoice').style.display = "none";
        document.getElementById('thirdChoice').style.display = "none";
        document.getElementById('fourthChoice').style.display = "none";
        document.getElementById('fifthChoice').style.display = "none";
    }

    function choice2(){
        document.getElementById('firstChoice').style.display = "none";
        document.getElementById('secondChoice').style.display = "block";
        document.getElementById('thirdChoice').style.display = "none";
        document.getElementById('fourthChoice').style.display = "none";
        document.getElementById('fifthChoice').style.display = "none";
    }

    function choice3(){
        document.getElementById('firstChoice').style.display = "none";
        document.getElementById('secondChoice').style.display = "none";
        document.getElementById('thirdChoice').style.display = "block";
        document.getElementById('fourthChoice').style.display = "none";
        document.getElementById('fifthChoice').style.display = "none";
    }

    function choice4(){
        document.getElementById('firstChoice').style.display = "none";
        document.getElementById('secondChoice').style.display = "none";
        document.getElementById('thirdChoice').style.display = "none";
        document.getElementById('fourthChoice').style.display = "block";
        document.getElementById('fifthChoice').style.display = "none";
    }

    function choice5(){
        document.getElementById('firstChoice').style.display = "none";
        document.getElementById('secondChoice').style.display = "none";
        document.getElementById('thirdChoice').style.display = "none";
        document.getElementById('fourthChoice').style.display = "none";
        document.getElementById('fifthChoice').style.display = "block";
    }
