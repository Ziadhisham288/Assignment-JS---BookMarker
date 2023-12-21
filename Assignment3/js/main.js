let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");
let websiteList;
let errorBox = document.querySelector("#errorBox");
let closeBtn = document.querySelector("#closeBtn");
const submitBtn = document.getElementById("submitBtn");

if (localStorage.getItem("websiteList") == null) {
    websiteList = [];
} else {
    websiteList = JSON.parse(localStorage.getItem("websiteList"));
    displayWebsite(websiteList);
}


function addWebsite() {
    if (siteName.value && siteURL.value) {
        if (validateUrl() == true && validateName() == true) {
            let website = {
                name: siteName.value,
                url: siteURL.value
            }
            websiteList.push(website);
            displayWebsite(websiteList);
            localStorage.setItem("websiteList", JSON.stringify(websiteList));
            clearAll();
        } else {
            errorBox.classList.replace("d-none", "d-flex");
        }
    } else {
        errorBox.classList.replace("d-none", "d-flex");
    }
}

function displayWebsite(list) {
    let cartona = ``;
    for (let i = 0; i < list.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>
                <button class="btn px-4 py-2 btn-success">
                <i class="fa-solid fa-eye"></i>
                <a href="https://www.${list[i].url}" target="blank" class="text-decoration-none text-white">
                        <i></i>
                        Visit
                    </a>
                </button>
            </td>
            <td>
                <button onclick="deleteWebsite(${i})"class="btn px-4 py-2 btn-danger">
                <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }
    document.getElementById("websiteTable").innerHTML = cartona;
}

function clearAll() {
    siteName.value = '';
    siteURL.value = '';
}

function deleteWebsite(index) {
    websiteList.splice(index, 1);
    localStorage.setItem("websiteList", JSON.stringify(websiteList));
    displayWebsite(websiteList);
}

function validateUrl() {
    let regex = /(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)./
    return regex.test(siteURL.value);
}

function validateName() {
    let regex = /^[a-zA-Z0-9]{3,}$/
    if (regex.test(siteName.value)) {
        return true;
    } else {
        siteName.style.border = "5px solid red";
        return false;
    }
}


function errorBoxClose() {
    errorBox.classList.replace("d-flex","d-none");
}


closeBtn.addEventListener("click", errorBoxClose);

submitBtn.addEventListener("click", addWebsite);