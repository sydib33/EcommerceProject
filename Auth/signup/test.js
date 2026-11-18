const warningDiv = document.getElementById("error-warnings");
const errorBox = document.getElementById("error-warnings");

const arr = [
    {
        id: "phone",
        express: /^\d{10}$/,
        message: "Phone number must contain exactly 10 digits"
    },
    {
        id: "password",
        express: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%#*^&])[A-Za-z\d@!$%#*^&]{8,}$/,
        message: "Password must contain uppercase, lowercase, number and special character with minimum length 8"
    },
    {
        id: "confirm-password",
        message: "Password and Confirm Password must match"
    }
];

const validationState = {
    phone: false,
    password: false,
    "confirm-password": false
};

arr.forEach((field) => {
    const element = document.getElementById(field.id);

    element.addEventListener("input", (e) => {

        const condition =
            field.express !== undefined
                ? field.express.test(e.target.value)
                : document.getElementById("password").value === e.target.value;

        validationState[field.id] = condition;

        if (!condition) {
            errorBox.classList.add("show");
            warningDiv.innerText = field.message;
        } else {
            const invalidField = arr.find(
                (item) => !validationState[item.id]
            );

            if (invalidField) {
                errorBox.classList.add("show");
                warningDiv.innerText = invalidField.message;
            } else {
                errorBox.classList.remove("show");
                warningDiv.innerText = "";
            }
        }
    });
});

const form = document.getElementById("submitForm");




form.onsubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirm-password").value;


        console.log(document.getElementById("name"));
        console.log(document.getElementById("phone"));
        console.log(document.getElementById("email"));
        console.log(document.getElementById("password"));
        console.log(document.getElementById("confirm-password"));

    const phoneValid = /^\d{10}$/.test(phone);

    const passwordValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%#*^&])[A-Za-z\d@!$%#*^&]{8,}$/
        .test(password);

    const confirmValid = password === confirmPassword;

    if (!phoneValid) {
        errorBox.classList.add("show");
        warningDiv.innerText =
            "Phone number must contain exactly 10 digits";
        return;
    }

    if (!passwordValid) {
        errorBox.classList.add("show");
        warningDiv.innerText =
            "Password must contain uppercase, lowercase, number and special character with minimum length 8";
        return;
    }

    if (!confirmValid) {
        errorBox.classList.add("show");
        warningDiv.innerText =
            "Password and Confirm Password must match";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                phone,
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();

        errorBox.classList.remove("show");
        warningDiv.innerText = "";

        console.log("User Created:", data);

        form.reset();

        Object.keys(validationState).forEach((key) => {
            validationState[key] = false;
        });

    } catch (err) {
        errorBox.classList.add("show");
        warningDiv.innerText = err.message;
        console.error(err);
    }
};