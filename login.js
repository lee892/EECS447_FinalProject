let loginData = {}
let createData = {}

var fetchOptions = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }

var putOptions = {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };

function formSubmitHandler(e){
  e.preventDefault();
  if (e.target.id == "login-form") {
    login(e.target);
  }
  if (e.target.id == "create-form") {
    create(e.target);
  }
}

function login(form){
    if (form.username.value != "" && form.pass.value != "")
    {
        loginData.username = form.username.value;
        let temp1 = form.username.value;
        loginData.password = form.pass.value;
        let temp2 = form.pass.value;
        let temp2Cleaned = temp2.replace(/\s/g, '%20');
        fetchOptions.body = JSON.stringify(loginData);
        fetch("http://localhost:5000/login?username=" + temp1 + "&password=" + temp2Cleaned, fetchOptions)
        .then((result) => {
        return result.json();
        }).then((data) => {

        });
    }
}

function create(form){
    if (form.username.value != "" && form.pass.value != "" && form.email.value != "")
    {
        formData.email = form.email.value;
        let temp0 = form.username.value;
        formData.username = form.username.value;
        let temp1 = form.username.value;
        formData.password = form.pass.value;
        let temp2 = form.pass.value;
        let temp2Cleaned = temp2.replace(/\s/g, '%20');
        putOptions.body = JSON.stringify(formData);
        fetch("http://localhost:5000/create?email=" + temp0 + "&username=" + temp1 +"&password=" + temp2Cleaned, fetchOptions)
        .then((result) => {
        return result.json();
        }).then((data) => {

        });
    }
}

function createAccount(){
    document.getElementById('login-form-wrap').style.display = "none";
    document.getElementById('create-form-wrap').style.display ="block";
}