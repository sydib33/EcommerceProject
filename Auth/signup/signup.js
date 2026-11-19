let warningDiv = document.getElementById("error-warnings")

const errorBox = document.getElementById("error-warnings");


let arr = [
{
    id: "phone",
    event: "input",
    express: /^\d{10}$/,
    message: "Phone number must contain exactly 10 digits"
},
{
    id: "password",
    event: "input",
    express: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%#*^&])[A-Za-z\d@!$%#*^&]{8,}$/,
    message: "Password must contain uppercase, lowercase, number and special character with minimum length 8"
},
{
    id: "confirm-password",
    event: "input",
    message: "Password and Confirm Password must match"
}
];




let verified = false

arr.forEach((v)=>{
    let element  = document.getElementById(v.id)
    element.addEventListener("input",(e)=>{
    let regex = v.express
    const condition =
    v.express !== undefined
        ? v.express.test(e.target.value)
        : document.getElementById("password").value === e.target.value;

    verified  = condition
    if(!condition){
        errorBox.classList.add("show");
        warningDiv.innerText = v.message
    }
    else{
        errorBox.classList.remove("show");
        warningDiv.innerText = ""
    }

})
})


let form = document.getElementById("submitForm")

form.onsubmit = (e)=>{
    e.preventDefault();
    console.dir(e.target);

    let [username,phone,email,password] = [e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value]
    let target = {username,email,phone,password}
    console.log(verified);

    if(verified){
        response = fetch("http://localhost:3000/users",{

            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(target)
        })
    }

}


