 let userData = {}

    var fetchOptions = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
      }

      var deleteOption = {
        method: "DELETE",
        headers: new Headers({
          "Authorization": "Bearer <your-auth-token>"
        }),
      };
    

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
        if (e.target.id == "deleteSong"){
          deleteSong(e.target);
          }
      }

      //grab artist
      function getArtist(form)
      {
        console.log("getArtist Function")
        console.log(form.part_1.value)
          if(form.part_1.value != "") {
              userData.artist = form.part_1.value;
              let temp = form.part_1.value;
              let tempCleaned = temp.replace(/\s/g, '%20')
              fetchOptions.body = JSON.stringify(userData);
              console.log("http://localhost:5000/query1?artist=" + tempCleaned);
              fetch("http://localhost:5000/query1?artist=" + tempCleaned, fetchOptions)
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
              userData.genre = form.part_1.value;
              let temp = form.part_1.value;
              let tempCleaned = temp.replace(/\s/g, '%20');
              fetchOptions.body = JSON.stringify(userData);
              console.log("http://localhost:5000/query2?genre="+tempCleaned);
              fetch("http://localhost:5000/path?query2="+tempCleaned, fetchOptions)
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
              userData.artist1 = form.part_1.value;
              userData.artist2 = form.part_2.value;
              let temp1 = form.part_1.value;
              let temp1Cleaned = temp1.replace(/\s/g, '%20');
              let temp2 = form.part_2.value;
              let temp2Cleaned = temp2.replace(/\s/g, '%20');              
              fetchOptions.body = JSON.stringify(userData);
              console.log("http://localhost:5000/query3?artist1="+temp1Cleaned+"&artist2="+temp2Cleaned);
              fetch("http://localhost:5000/query3?artist1="+temp1Cleaned+"&artist2="+temp2Cleaned, fetchOptions)
              .then((result)=>{
                  return result.json();
                }).then((data)=>{
              });}
              else {
                  alert("Error: Please check that you've entries in all text boxes");
              }
      }
    

      //delete a song
      function deleteSong(form)
      {
        console.log("deleteSong Function")
        console.log(form.part_1.value)
          if(form.part_1.value != "") {
              userData.deletion = form.part_1.value
              deleteOption.body = JSON.stringify(userData);
              let temp = form.part_1.value;
              let tempCleaned = temp.replace(/\s/g, '%20');  
              console.log("http://localhost:5000/query5?deletion="+tempCleaned)            
              fetch("http://localhost:5000/query5?deletion="+tempCleaned, deleteOption)
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
