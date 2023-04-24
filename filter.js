 let userData = {}
 let deleteData = {}
 let putData = {}

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
    
      var putOptions = {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      const url = "http://localhost:5000/";


      function formSubmitHandler(e) {
        e.preventDefault();
        if (e.target.id == "artist"){
        getArtist(e.target);
        }
        else if (e.target.id == "genre"){
        getGenre(e.target);
        }
        else if (e.target.id == "artists"){
        getArtists(e.target);
        }
        else if (e.target.id =="addSong"){
        putSong(e.target);
        }
        else if (e.target.id == "deleteSong"){
        deleteSong(e.target);
        }
      }

      //grab artist
      /*
      grabs the values of the text boxes, inserts %20 if there are space values and then makes 
      a fetch request to grab songs from an artist
      */
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
      /*
      grabs the values of the text boxes, inserts %20 if there are space values and then makes 
      a fetch request to grab songs based on Genre
      */
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
      /*
      grabs the values of the text boxes, inserts %20 if there are space values and then makes 
      a fetch request to grab songs based on both artist criteria
      */
      function getArtists(form)
      {
        console.log("getArtists Function");
        console.log(form.part_1.value);
        console.log(form.part_2.value);
          if(form.part_1.value != ""&&form.part_2.value != "") {
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
    
      //place a song
      /*
      grabs the values of the text boxes, inserts %20 if there are space values and then makes 
      a fetch request to place songs into the database
      */
      function putSong(form)
      {
        console.log("putSong Function")
        console.log(form.part_1.value)
        console.log(form.part_2.value)
        console.log(form.part_3.value)
          if(form.part_1.value != ""&&form.part_2.value != ""&&form.part_3.value != "") {
              putData.song1 = form.part_1.value;
              putData.song2 = form.part_2.value;
              putData.song3 = form.part_2.value;
              let temp1 = form.part_1.value;
              let temp1Cleaned = temp1.replace(/\s/g, '%20');
              let temp2 = form.part_2.value;
              let temp2Cleaned = temp2.replace(/\s/g, '%20');   
              let temp3 = form.part_3.value;
              let temp3Cleaned = temp3.replace(/\s/g, '%20');              
              putOptions.body = JSON.stringify(putData);
              console.log("http://localhost:5000/query4?song1="+temp1Cleaned+"&song2="+temp2Cleaned+"&song3="+temp3Cleaned);
              fetch("http://localhost:5000/query4?song1="+temp1Cleaned+"&song2="+temp2Cleaned+"&song3="+temp3Cleaned, fetchOptions)
              .then((result)=>{
                  return result.json();
                }).then((data)=>{
              });}
              else {
                  alert("Error: Please check that you've entries in all text boxes");
              }
      }
    


      //delete a song
      /*
      grabs the values of the text boxes, inserts %20 if there are space values and then makes 
      a fetch request to delete song in the database
      */
      function deleteSong(form)
      {
        console.log("deleteSong Function")
        console.log(form.part_1.value)
          if(form.part_1.value != "") {
              deleteData.deletion = form.part_1.value
              deleteOption.body = JSON.stringify(deleteData);
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
    
/*

functions below just determine which div block is displayed based on the choice of the user

*/
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
