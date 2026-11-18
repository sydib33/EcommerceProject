let password  = document.getElementById("password")
let warningDiv = document.getElementById("error-warnings")
let form  = document.getElementById("formId")
const errorBox = document.getElementById("error-warnings");

// errorBox.innerHTML = "Password and Confirm Password do not match!";
// errorBox.classList.add("show");
// errorBox.classList.remove("show");

password.addEventListener("input",(e)=>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%#*^?&])[A-Za-z\d@!$%#*^?&]{8,}$/
    const condition = regex.test(e.target.value)

    if(!condition){
        errorBox.classList.add("show");
        warningDiv.innerText = "Password must contain uppercase, lowercase, number and special character with minimum length 8"
    }
    else{
        errorBox.classList.remove("show");
        warningDiv.innerText = ""

    }
})


form.onsubmit = ((e)=>{
    e.preventDefault();
    let [email,password]  = [e.target[0].value,e.target[1].value]

    let response  = fetch("http://localhost:3000/users?email="+email)
    response.then((v)=>{
        return v.json()
    })
    .then((v2)=>{
        console.log(v2);
        let [data] = v2
        data.password == password ? localStorage.setItem("authorized","true"):alert("Wrong Credential")
    })
    .catch((e)=>{
        console.log(e);
    })
})

