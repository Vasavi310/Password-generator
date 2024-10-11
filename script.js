function generate() {
    let dictionary = "";
    if (document.getElementById("lowercaseCb").checked) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }
    if (document.getElementById("uppercaseCb").checked) {
        dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    if (document.getElementById("digitsCb").checked) {
        dictionary += "1234567890";
    }
    if (document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }
    const maxLength = 18;
    let length = parseInt(document.querySelector("#length").value);

    if (length==null) {
        document.querySelector('input[type="text"]').value = "Please enter length";
        return;
    }

    if (length < 4 || length > maxLength || dictionary.length === 0) {
        document.querySelector('input[type="text"]').value = "Cannot generate password";
        return;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    document.querySelector('input[type="text"]').value = password;
}

[
    ...document.querySelectorAll('input[type="checkbox"], button.generate'),
].forEach((elem) => {
    elem.addEventListener("click", generate);
});

document.getElementById("length").addEventListener("input", (e) => {
    document.querySelector("div.range span").innerHTML = e.target.value;
    generate();
});

document.querySelector("div.password button").addEventListener(
    "click", () => {
        const pass = document.querySelector('input[type="text"]').value;
        navigator.clipboard.writeText(pass).then(() => {
            document.querySelector(
                "div.password button").innerHTML = "COPIED!";
            setTimeout(() => {
                document.querySelector(
                    "div.password button").innerHTML = "COPY";
            }, 1000);
        });
    });

generate();