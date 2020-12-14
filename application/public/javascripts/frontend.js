

let homePics = document.getElementById("grid-container");
let searchBtn = document.getElementById("searchBtn");
let searchText = document.getElementById("searchText");
let imagesContent = document.getElementById("grid-container");
let flashMessage = document.getElementById("flashMessage");
let logo = document.getElementById("logo");

function setFlashMessageFadeOut(flashMessageElement){
    setTimeout(()=>{
        let currentOpacity = 1.0;
        let timer = setInterval(()=>{
            if(currentOpacity < 0.05){
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
};

logo.addEventListener("click",()=>{
    location.replace("/homeGallery");
})

function createCard(row){
return `<div class = "card">
<img src="${row.thumbnail}" alt="Missing Image">
<div>
    <h3>${row.title}</h3>
    <p>${row.description}</p>
    <a href="/getPost/${row.id}">POST DETAILS</a>
</div>
</div>`
}

function addFlashFromFrontEnd(message){
    let flashMessageDiv = document.createElement("div");
    let innerFlashDiv = document.createElement("div");
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    innerFlashDiv.setAttribute("class","flashMsg");
    innerFlashDiv.setAttribute("id", "successMessage");
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute("id", "flashMessage");
    document.getElementsByTagName("body")[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}
if(searchText){
    searchBtn.addEventListener("click",()=>{
        if(!searchText.value){
            location.replace("/homeGallery");
        }
        else{
            fetch(`/posts/search?search=${searchText.value}`)
            .then(data => data.json())
            .then((data)=>{
                let newImageContent = "";
                data.results.forEach((row)=>{
                    newImageContent += createCard(row);
                })
                imagesContent.innerHTML = newImageContent;
                if(data.message){
                    addFlashFromFrontEnd(data.message);
                }
            })
        }
    })
}
if(flashMessage){
    setFlashMessageFadeOut(flashMessage);
}